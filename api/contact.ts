import { Resend } from "resend";

const parseJsonBody = (body: unknown) => {
  if (typeof body === "string" && body.length > 0) {
    return JSON.parse(body) as Record<string, unknown>;
  }
  if (typeof body === "object" && body !== null) {
    return body as Record<string, unknown>;
  }
  return {};
};

const sanitize = (value: unknown) =>
  typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";

type ApiRequest = {
  method?: string;
  body?: unknown;
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (payload: unknown) => ApiResponse | void;
  setHeader: (name: string, value: string) => void;
};

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Methode non autorisee." });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "AKConseil <onboarding@resend.dev>";
  const toEmail = process.env.CONTACT_TO_EMAIL || "contact@akconseil.fr";

  if (!resendApiKey) {
    return res.status(200).json({
      success: false,
      fallback: true,
      error:
        "Configuration email incomplete. Definir au minimum RESEND_API_KEY dans Vercel.",
    });
  }

  try {
    const payload = parseJsonBody(req.body);
    const name = sanitize(payload.name);
    const email = sanitize(payload.email);
    const subject = sanitize(payload.subject);
    const message = typeof payload.message === "string" ? payload.message.trim() : "";

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Tous les champs sont obligatoires." });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ error: "Adresse email invalide." });
    }

    const resend = new Resend(resendApiKey);
    const formattedSubject = `[AKC Contact] ${subject}`;
    const plainText = [
      "Nouveau message depuis le formulaire de contact",
      "",
      `Nom : ${name}`,
      `Email : ${email}`,
      `Sujet : ${subject}`,
      "",
      "Message :",
      message,
    ].join("\n");

    const html = `
      <h2>Nouveau message depuis le formulaire de contact</h2>
      <p><strong>Nom :</strong> ${name}</p>
      <p><strong>Email :</strong> ${email}</p>
      <p><strong>Sujet :</strong> ${subject}</p>
      <p><strong>Message :</strong></p>
      <p>${message.replace(/\n/g, "<br/>")}</p>
    `;

    const response = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: formattedSubject,
      text: plainText,
      html,
    });

    if (response.error) {
      return res.status(502).json({ error: response.error.message });
    }

    return res.status(200).json({ success: true, id: response.data?.id ?? null });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erreur inconnue lors de l'envoi du message.";
    return res.status(500).json({ error: message });
  }
}
