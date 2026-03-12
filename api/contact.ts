import { Resend } from "resend";
import nodemailer from "nodemailer";
import { MongoClient } from "mongodb";

const DEFAULT_OWNER = "Akcalice";
const DEFAULT_REPO = "akcsite";
const DEFAULT_BRANCH = "main";
const DEFAULT_SUBMISSIONS_FILE_PATH = "contact-submissions.json";

const resolveGithubConfig = () => ({
  owner: process.env.CMS_GITHUB_OWNER || DEFAULT_OWNER,
  repo: process.env.CMS_GITHUB_REPO || DEFAULT_REPO,
  branch: process.env.CMS_GITHUB_BRANCH || DEFAULT_BRANCH,
  filePath: process.env.CONTACT_SUBMISSIONS_FILE_PATH || DEFAULT_SUBMISSIONS_FILE_PATH,
});

const buildGithubContentsApiUrl = () => {
  const { owner, repo, filePath } = resolveGithubConfig();
  const encodedPath = filePath.split("/").map(encodeURIComponent).join("/");
  return `https://api.github.com/repos/${owner}/${repo}/contents/${encodedPath}`;
};

type ApiRequest = {
  method?: string;
  body?: unknown;
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (payload: unknown) => ApiResponse | void;
  setHeader: (name: string, value: string) => void;
};

declare global {
  // eslint-disable-next-line no-var
  var __AK_CONTACT_QUEUE__: Array<Record<string, unknown>> | undefined;
}

const parseJsonBody = (body: unknown) => {
  if (typeof body === "string" && body.trim().length > 0) {
    return JSON.parse(body) as Record<string, unknown>;
  }
  if (typeof body === "object" && body !== null) {
    return body as Record<string, unknown>;
  }
  return {};
};

const sanitize = (value: unknown) =>
  typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";

const getFirstEnv = (keys: string[]) => {
  for (const key of keys) {
    const value = process.env[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return "";
};

const queueSubmission = (submission: Record<string, unknown>) => {
  if (!globalThis.__AK_CONTACT_QUEUE__) {
    globalThis.__AK_CONTACT_QUEUE__ = [];
  }
  const queued = {
    ...submission,
    queuedAt: new Date().toISOString(),
    queueId: `queued-${Date.now()}`,
  };
  globalThis.__AK_CONTACT_QUEUE__.push(queued);
  return queued.queueId as string;
};

type ContactSubmission = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone?: string | null;
  service?: string | null;
  subject: string;
  message: string;
};

const safeJsonParseArray = (value: string): ContactSubmission[] => {
  try {
    const parsed = JSON.parse(value) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter(Boolean) as ContactSubmission[];
  } catch {
    return [];
  }
};

const appendContactSubmission = async (submission: ContactSubmission) => {
  const githubToken = process.env.CONTACT_SUBMISSIONS_GITHUB_TOKEN || process.env.CMS_GITHUB_TOKEN;
  if (!githubToken) {
    // On n’empêche pas l’envoi d’email si le stockage backoffice est indisponible.
    return;
  }

  const { branch } = resolveGithubConfig();
  const apiUrl = `${buildGithubContentsApiUrl()}?ref=${encodeURIComponent(branch)}`;

  let existingSha: string | undefined;
  let existingItems: ContactSubmission[] = [];

  const existingResponse = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${githubToken}`,
      Accept: "application/vnd.github+json",
    },
  });

  if (existingResponse.ok) {
    const payload = (await existingResponse.json()) as {
      sha?: string;
      content?: string;
      encoding?: string;
    };
    existingSha = payload.sha;
    if (payload.encoding === "base64" && typeof payload.content === "string") {
      const decoded = Buffer.from(payload.content, "base64").toString("utf8");
      existingItems = safeJsonParseArray(decoded);
    }
  } else if (existingResponse.status !== 404) {
    return;
  }

  const nextItems = [submission, ...existingItems].slice(0, 500);
  const updatedFileContent = `${JSON.stringify(nextItems, null, 2)}\n`;

  await fetch(buildGithubContentsApiUrl(), {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${githubToken}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "chore(contact): store contact form submission",
      content: Buffer.from(updatedFileContent, "utf8").toString("base64"),
      branch,
      sha: existingSha,
    }),
  }).catch(() => undefined);
};

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Méthode non autorisée." });
  }

  try {
    const payload = parseJsonBody(req.body);
    const name = sanitize(payload.name);
    const email = sanitize(payload.email);
    const phone = sanitize(payload.phone);
    const service = sanitize(payload.service);
    const subject = sanitize(payload.subject || service || "Demande de contact");
    const message =
      typeof payload.message === "string" ? payload.message.trim() : "";

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Tous les champs sont obligatoires." });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ error: "Adresse email invalide." });
    }

    const submittedAt = new Date();
    const submission = {
      name,
      email,
      phone: phone || null,
      service: service || null,
      subject,
      message,
      submittedAt,
      status: "new",
    };

    void appendContactSubmission({
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      createdAt: submittedAt.toISOString(),
      name,
      email,
      phone: phone || null,
      service: service || null,
      subject,
      message,
    });

    let dbId: string | null = null;
    const mongoUri = process.env.MONGODB_URI?.trim();
    if (mongoUri) {
      const client = await MongoClient.connect(mongoUri);
      try {
        const dbName = process.env.MONGODB_DB?.trim() || "akconseil";
        const collection = process.env.MONGODB_COLLECTION?.trim() || "contact_submissions";
        const db = client.db(dbName);
        const result = await db.collection(collection).insertOne(submission);
        dbId = result.insertedId.toString();
      } finally {
        await client.close();
      }
    }

    const notificationHtml = `
      <h2>Nouvelle demande de contact</h2>
      <p><strong>Nom :</strong> ${name}</p>
      <p><strong>Email :</strong> ${email}</p>
      <p><strong>Telephone :</strong> ${phone || "Non renseigne"}</p>
      <p><strong>Service :</strong> ${service || "Non specifie"}</p>
      <p><strong>Sujet :</strong> ${subject}</p>
      <p><strong>Message :</strong></p>
      <p>${message.replace(/\n/g, "<br/>")}</p>
      <hr />
      <p><small>Recu le ${submittedAt.toLocaleString("fr-FR")}</small></p>
    `;

    const clientHtml = `
      <h2>Merci pour votre message, ${name}</h2>
      <p>Nous avons bien recu votre demande concernant : <strong>${service || subject}</strong></p>
      <p>Nous vous repondrons dans les plus brefs delais.</p>
      <p>Cordialement,<br/>AKConseil</p>
    `;

    const smtpHost = getFirstEnv(["SMTP_HOST", "MAIL_HOST"]);
    const smtpUser = getFirstEnv(["SMTP_USER", "SMTP_USERNAME", "MAIL_USER", "MAIL_USERNAME"]);
    const smtpPassword =
      process.env.SMTP_PASSWORD ||
      process.env.SMTP_PASS ||
      process.env.MAIL_PASSWORD ||
      process.env.MAIL_PASS ||
      "";
    const smtpPort = Number(getFirstEnv(["SMTP_PORT", "MAIL_PORT"]) || "587");
    const smtpSecure = getFirstEnv(["SMTP_SECURE", "MAIL_SECURE"]) === "true" || smtpPort === 465;
    const smtpFrom =
      getFirstEnv(["SMTP_FROM", "MAIL_FROM", "RESEND_FROM_EMAIL"]) ||
      "AKConseil <onboarding@resend.dev>";
    const notificationEmail =
      getFirstEnv(["NOTIFICATION_EMAIL", "CONTACT_TO_EMAIL", "CONTACT_EMAIL", "ADMIN_LOGIN_EMAIL"]) ||
      "contact@akconseil.fr";

    if (smtpHost && smtpUser && smtpPassword) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpSecure,
          auth: {
            user: smtpUser,
            pass: smtpPassword,
          },
        });

        await transporter.sendMail({
          from: smtpFrom,
          to: notificationEmail,
          replyTo: email,
          subject: `Nouvelle demande de contact - ${service || "Non specifie"}`,
          html: notificationHtml,
        });

        await transporter.sendMail({
          from: smtpFrom,
          to: email,
          subject: "Confirmation de votre demande - AKConseil",
          html: clientHtml,
        });

        return res.status(200).json({ success: true, id: dbId, provider: "smtp" });
      } catch {
        // Fallback vers Resend / file locale si SMTP echoue
      }
    }

    const resendApiKey = getFirstEnv(["RESEND_API_KEY", "RESEND_KEY"]);
    if (!resendApiKey) {
      const queueId = queueSubmission(submission as unknown as Record<string, unknown>);
      return res.status(200).json({
        success: true,
        queued: true,
        id: queueId,
        provider: "queue",
        warning:
          "Configuration email manquante: message mis en file locale (pas d'envoi email).",
      });
    }

    const resend = new Resend(resendApiKey);
    const notification = await resend.emails.send({
      from: smtpFrom,
      to: [notificationEmail],
      replyTo: email,
      subject: `Nouvelle demande de contact - ${service || "Non specifie"}`,
      html: notificationHtml,
      text: `Nom: ${name}\nEmail: ${email}\nTelephone: ${phone || "Non renseigne"}\nService: ${service || "Non specifie"}\nSujet: ${subject}\n\n${message}`,
    });

    if (notification.error) {
      const message =
        notification.error.message || "Echec d'envoi de l'email de notification.";
      const lower = message.toLowerCase();
      const normalizedMessage = lower.includes("api key")
        ? "RESEND_API_KEY invalide ou mal copiee. Verifiez la variable Vercel (sans espace, scope Production)."
        : message;
      const queueId = queueSubmission(submission as unknown as Record<string, unknown>);
      return res.status(200).json({
        success: true,
        queued: true,
        id: queueId,
        provider: "queue",
        warning: normalizedMessage,
      });
    }

    const confirmation = await resend.emails.send({
      from: smtpFrom,
      to: [email],
      subject: "Confirmation de votre demande - AKConseil",
      html: clientHtml,
      text: `Merci pour votre message ${name}. Nous vous repondrons rapidement.`,
    });

    if (confirmation.error) {
      const message =
        confirmation.error.message || "Echec d'envoi de l'email de confirmation.";
      const lower = message.toLowerCase();
      const normalizedMessage = lower.includes("api key")
        ? "RESEND_API_KEY invalide ou mal copiee. Verifiez la variable Vercel (sans espace, scope Production)."
        : message;
      const queueId = queueSubmission(submission as unknown as Record<string, unknown>);
      return res.status(200).json({
        success: true,
        queued: true,
        id: queueId,
        provider: "queue",
        warning: normalizedMessage,
      });
    }

    return res.status(200).json({
      success: true,
      id: notification.data?.id ?? dbId,
      provider: "resend",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erreur inconnue lors de l'envoi.";
    return res.status(500).json({ error: message });
  }
}
