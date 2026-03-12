import {
  ApiRequest,
  ApiResponse,
  buildLogoutCookie,
  buildSessionCookie,
  createSessionToken,
  verifyToken,
} from "../_adminAuth";

const normalizeQueryValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Méthode non autorisée." });
  }

  const token = normalizeQueryValue(req.query?.token);
  const next = normalizeQueryValue(req.query?.next);
  const nextPath = typeof next === "string" && next.startsWith("/") ? next : "/admin-dashboard";

  if (!token) {
    res.status(302);
    res.setHeader("Set-Cookie", buildLogoutCookie());
    res.setHeader("Location", "/admin-login?error=missing_token");
    return res.end();
  }

  const payload = verifyToken(token);
  if (!payload || payload.type !== "verify") {
    res.status(302);
    res.setHeader("Set-Cookie", buildLogoutCookie());
    res.setHeader("Location", "/admin-login?error=invalid_or_expired_token");
    return res.end();
  }

  const sessionToken = createSessionToken(payload.email);
  const separator = nextPath.includes("?") ? "&" : "?";
  res.status(302);
  res.setHeader("Set-Cookie", buildSessionCookie(sessionToken));
  res.setHeader("Location", `${nextPath}${separator}verified=1`);
  return res.end();
}
