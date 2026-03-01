import { Resend } from "resend";
import {
  ApiRequest,
  ApiResponse,
  areCredentialsValid,
  buildBaseUrl,
  createVerificationToken,
  getAdminAuthConfig,
  parseJsonBody,
} from "../_adminAuth";

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Methode non autorisee." });
  }

  const { resendApiKey, resendFromEmail } = getAdminAuthConfig();
  if (!resendApiKey || !resendFromEmail) {
    return res.status(500).json({
      error:
        "Configuration email admin incomplete. Definir RESEND_API_KEY et RESEND_FROM_EMAIL.",
    });
  }

  try {
    const payload = parseJsonBody(req.body);
    const email = typeof payload.email === "string" ? payload.email.trim() : "";
    const password =
      typeof payload.password === "string" ? payload.password : "";
    const next =
      typeof payload.next === "string" && payload.next.startsWith("/")
        ? payload.next
        : "/admin-dashboard";

    if (!email || !password) {
      return res.status(400).json({ error: "Email et mot de passe requis." });
    }

    if (!areCredentialsValid(email, password)) {
      return res.status(401).json({ error: "Identifiants invalides." });
    }

    const token = createVerificationToken(email);
    const baseUrl = buildBaseUrl(req);
    const verificationUrl = `${baseUrl}/api/admin-auth/verify?token=${encodeURIComponent(
      token,
    )}&next=${encodeURIComponent(next)}`;

    const resend = new Resend(resendApiKey);
    const html = `
      <h2>Validation de connexion AKConseil</h2>
      <p>Une tentative de connexion au backoffice vient d'etre effectuee.</p>
      <p>Cliquez sur ce lien pour valider votre acces :</p>
      <p><a href="${verificationUrl}">${verificationUrl}</a></p>
      <p>Ce lien expire dans 15 minutes.</p>
    `;

    const text = [
      "Validation de connexion AKConseil",
      "",
      "Une tentative de connexion au backoffice vient d'etre effectuee.",
      "Validez votre acces via ce lien :",
      verificationUrl,
      "",
      "Ce lien expire dans 15 minutes.",
    ].join("\n");

    const sendResult = await resend.emails.send({
      from: resendFromEmail,
      to: [email],
      subject: "Validation de connexion - AKConseil Backoffice",
      html,
      text,
    });

    if (sendResult.error) {
      return res.status(502).json({ error: sendResult.error.message });
    }

    return res.status(200).json({
      success: true,
      message:
        "Email de validation envoye. Cliquez sur le lien recu pour acceder au backoffice.",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erreur inconnue.";
    return res.status(500).json({ error: message });
  }
}
