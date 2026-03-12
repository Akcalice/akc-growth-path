import {
  ApiRequest,
  ApiResponse,
  buildLogoutCookie,
} from "../_adminAuth";

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Méthode non autorisée." });
  }

  res.setHeader("Set-Cookie", buildLogoutCookie());
  return res.status(200).json({ success: true });
}
