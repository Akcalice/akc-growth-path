import crypto from "crypto";

export const ADMIN_SESSION_COOKIE = "ak_admin_session";

type TokenPayload = {
  type: "verify" | "session";
  email: string;
  exp: number;
};

export type ApiRequest = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string | string[] | undefined>;
  query?: Record<string, string | string[] | undefined>;
};

export type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (payload: unknown) => ApiResponse | void;
  setHeader: (name: string, value: string | string[]) => void;
  end: (body?: string) => void;
};

const normalizeHeaderValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

const base64UrlEncode = (raw: string) =>
  Buffer.from(raw, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

const base64UrlDecode = (raw: string) => {
  const normalized = raw.replace(/-/g, "+").replace(/_/g, "/");
  const padLength = normalized.length % 4 === 0 ? 0 : 4 - (normalized.length % 4);
  const padded = `${normalized}${"=".repeat(padLength)}`;
  return Buffer.from(padded, "base64").toString("utf8");
};

const sign = (value: string, secret: string) =>
  crypto.createHmac("sha256", secret).update(value).digest("base64url");

const createSignedToken = (payload: TokenPayload, secret: string) => {
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = sign(encodedPayload, secret);
  return `${encodedPayload}.${signature}`;
};

const verifySignedToken = (token: string, secret: string): TokenPayload | null => {
  const [payloadPart, signaturePart] = token.split(".");
  if (!payloadPart || !signaturePart) {
    return null;
  }

  const expectedSignature = sign(payloadPart, secret);
  const signatureBuffer = Buffer.from(signaturePart);
  const expectedBuffer = Buffer.from(expectedSignature);
  if (signatureBuffer.length !== expectedBuffer.length) {
    return null;
  }
  if (!crypto.timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return null;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(payloadPart)) as TokenPayload;
    if (!payload.exp || Date.now() > payload.exp) {
      return null;
    }
    if (!payload.email || !payload.type) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
};

export const parseJsonBody = (body: unknown) => {
  if (typeof body === "string" && body.trim().length > 0) {
    return JSON.parse(body) as Record<string, unknown>;
  }
  if (typeof body === "object" && body !== null) {
    return body as Record<string, unknown>;
  }
  return {};
};

export const parseCookies = (req: ApiRequest) => {
  const headers = req.headers || {};
  const cookieHeader = normalizeHeaderValue(headers.cookie);
  const cookieMap: Record<string, string> = {};
  if (!cookieHeader) {
    return cookieMap;
  }

  cookieHeader.split(";").forEach((cookiePart) => {
    const [rawName, ...rawValueParts] = cookiePart.split("=");
    if (!rawName || rawValueParts.length === 0) {
      return;
    }
    const name = rawName.trim();
    const value = rawValueParts.join("=").trim();
    try {
      cookieMap[name] = decodeURIComponent(value);
    } catch {
      cookieMap[name] = value;
    }
  });

  return cookieMap;
};

export const buildBaseUrl = (req: ApiRequest) => {
  const headers = req.headers || {};
  const host = normalizeHeaderValue(headers["x-forwarded-host"]) ||
    normalizeHeaderValue(headers.host);
  const protocol =
    normalizeHeaderValue(headers["x-forwarded-proto"]) || "https";
  if (!host) {
    return "https://www.akconseil.fr";
  }
  return `${protocol}://${host}`;
};

export const getAdminAuthConfig = () => {
  const adminEmail = process.env.ADMIN_LOGIN_EMAIL?.trim();
  const adminPassword = process.env.ADMIN_LOGIN_PASSWORD;
  const secret = process.env.ADMIN_AUTH_SECRET?.trim();
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const resendFromEmail = process.env.RESEND_FROM_EMAIL?.trim();

  return {
    adminEmail,
    adminPassword,
    secret,
    resendApiKey,
    resendFromEmail,
  };
};

export const areCredentialsValid = (email: string, password: string) => {
  const { adminEmail, adminPassword } = getAdminAuthConfig();
  if (!adminEmail || !adminPassword) {
    return false;
  }
  return (
    email.trim().toLowerCase() === adminEmail.trim().toLowerCase() &&
    password === adminPassword
  );
};

export const createVerificationToken = (email: string) => {
  const { secret } = getAdminAuthConfig();
  if (!secret) {
    throw new Error("ADMIN_AUTH_SECRET manquant.");
  }
  return createSignedToken(
    {
      type: "verify",
      email,
      exp: Date.now() + 15 * 60 * 1000,
    },
    secret,
  );
};

export const createSessionToken = (email: string) => {
  const { secret } = getAdminAuthConfig();
  if (!secret) {
    throw new Error("ADMIN_AUTH_SECRET manquant.");
  }
  return createSignedToken(
    {
      type: "session",
      email,
      exp: Date.now() + 12 * 60 * 60 * 1000,
    },
    secret,
  );
};

export const verifyToken = (token: string) => {
  const { secret } = getAdminAuthConfig();
  if (!secret) {
    return null;
  }
  return verifySignedToken(token, secret);
};

export const buildSessionCookie = (sessionToken: string) =>
  `${ADMIN_SESSION_COOKIE}=${encodeURIComponent(
    sessionToken,
  )}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=43200`;

export const buildLogoutCookie = () =>
  `${ADMIN_SESSION_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;

export const getSessionFromRequest = (req: ApiRequest) => {
  const cookies = parseCookies(req);
  const sessionToken = cookies[ADMIN_SESSION_COOKIE];
  if (!sessionToken) {
    return null;
  }
  const payload = verifyToken(sessionToken);
  if (!payload || payload.type !== "session") {
    return null;
  }
  return payload;
};
