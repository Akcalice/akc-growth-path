import { getSessionFromRequest } from "./_adminAuth";

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
  headers: Record<string, string | string[] | undefined>;
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (payload: unknown) => ApiResponse | void;
  setHeader: (name: string, value: string) => void;
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

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Méthode non autorisée." });
  }

  const session = getSessionFromRequest(req);
  if (!session) {
    return res.status(401).json({ error: "Accès refusé. Connectez-vous au backoffice." });
  }

  const githubToken = process.env.CONTACT_SUBMISSIONS_GITHUB_TOKEN || process.env.CMS_GITHUB_TOKEN;
  if (!githubToken) {
    return res.status(500).json({
      error: "Token GitHub manquant (CMS_GITHUB_TOKEN ou CONTACT_SUBMISSIONS_GITHUB_TOKEN).",
    });
  }

  const { branch } = resolveGithubConfig();
  const apiUrl = `${buildGithubContentsApiUrl()}?ref=${encodeURIComponent(branch)}`;

  const response = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${githubToken}`,
      Accept: "application/vnd.github+json",
    },
  });

  if (response.status === 404) {
    return res.status(200).json({ items: [] });
  }

  if (!response.ok) {
    const errorBody = await response.text();
    return res.status(502).json({
      error: `Impossible de lire les messages sur GitHub (${response.status}).`,
      details: errorBody,
    });
  }

  const payload = (await response.json()) as {
    content?: string;
    encoding?: string;
  };

  if (payload.encoding !== "base64" || typeof payload.content !== "string") {
    return res.status(200).json({ items: [] });
  }

  const decoded = Buffer.from(payload.content, "base64").toString("utf8");
  const items = safeJsonParseArray(decoded);
  return res.status(200).json({ items });
}

