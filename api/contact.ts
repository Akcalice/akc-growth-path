import { Resend } from "resend";
import nodemailer from "nodemailer";
import { MongoClient } from "mongodb";

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

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Methode non autorisee." });
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

    const smtpHost = process.env.SMTP_HOST?.trim();
    const smtpUser = process.env.SMTP_USER?.trim();
    const smtpPassword = process.env.SMTP_PASSWORD;
    const smtpFrom =
      process.env.SMTP_FROM?.trim() ||
      process.env.RESEND_FROM_EMAIL?.trim() ||
      "AKConseil <onboarding@resend.dev>";
    const notificationEmail =
      process.env.NOTIFICATION_EMAIL?.trim() ||
      process.env.CONTACT_TO_EMAIL?.trim() ||
      "contact@akconseil.fr";

    if (smtpHost && smtpUser && smtpPassword) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(process.env.SMTP_PORT || 587),
        secure: false,
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

      return res.status(200).json({ success: true, id: dbId });
    }

    const resendApiKey = process.env.RESEND_API_KEY?.trim();
    if (!resendApiKey) {
      const queueId = queueSubmission(submission as unknown as Record<string, unknown>);
      return res.status(200).json({
        success: true,
        queued: true,
        id: queueId,
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
        warning: normalizedMessage,
      });
    }

    return res.status(200).json({
      success: true,
      id: notification.data?.id ?? dbId,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erreur inconnue lors de l'envoi.";
    return res.status(500).json({ error: message });
  }
}
