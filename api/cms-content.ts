import { getSessionFromRequest } from "./_adminAuth";

const DEFAULT_OWNER = "Akcalice";
const DEFAULT_REPO = "akcsite";
const DEFAULT_BRANCH = "main";
const DEFAULT_FILE_PATH = "cms-content.json";

const resolveConfig = () => ({
  owner: process.env.CMS_GITHUB_OWNER || DEFAULT_OWNER,
  repo: process.env.CMS_GITHUB_REPO || DEFAULT_REPO,
  branch: process.env.CMS_GITHUB_BRANCH || DEFAULT_BRANCH,
  filePath: process.env.CMS_CONTENT_FILE_PATH || DEFAULT_FILE_PATH,
});

const buildRawContentUrl = () => {
  const { owner, repo, branch, filePath } = resolveConfig();
  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath}`;
};

const buildGithubContentsApiUrl = () => {
  const { owner, repo, filePath } = resolveConfig();
  const encodedPath = filePath.split("/").map(encodeURIComponent).join("/");
  return `https://api.github.com/repos/${owner}/${repo}/contents/${encodedPath}`;
};

const parseJsonBody = (body: unknown) => {
  if (typeof body === "string" && body.length > 0) {
    return JSON.parse(body) as Record<string, unknown>;
  }
  if (typeof body === "object" && body !== null) {
    return body as Record<string, unknown>;
  }
  return {};
};

const normalizeHeaderValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

type ApiRequest = {
  method?: string;
  headers?: Record<string, string | string[] | undefined>;
  body?: unknown;
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (payload: unknown) => ApiResponse | void;
  setHeader: (name: string, value: string) => void;
};

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method === "GET") {
    try {
      const response = await fetch(buildRawContentUrl(), { cache: "no-store" });
      if (!response.ok) {
        return res.status(200).json({});
      }
      const text = await response.text();
      if (!text.trim()) {
        return res.status(200).json({});
      }
      return res.status(200).json(JSON.parse(text));
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erreur de lecture du contenu CMS";
      return res.status(200).json({ _warning: message });
    }
  }

  if (req.method === "PUT") {
    const headers = req.headers || {};
    let session = null;
    try {
      session = getSessionFromRequest(req);
    } catch {
      session = null;
    }

    const providedPassword = normalizeHeaderValue(headers["x-admin-password"])?.trim();
    const expectedPassword = process.env.ADMIN_LOGIN_PASSWORD?.trim();
    const isPasswordAuthorized =
      Boolean(expectedPassword) && Boolean(providedPassword) && providedPassword === expectedPassword;

    if (!session && !isPasswordAuthorized) {
      return res.status(401).json({
        error:
          "Acces refuse. Connectez-vous au backoffice et renseignez le mot de passe admin dans l'editeur.",
      });
    }

    const githubToken =
      process.env.CMS_GITHUB_TOKEN?.trim() ||
      process.env.GITHUB_TOKEN?.trim() ||
      process.env.GH_TOKEN?.trim();
    if (!githubToken) {
      return res.status(500).json({
        error:
          "Token GitHub manquant. Ajoutez CMS_GITHUB_TOKEN (ou GITHUB_TOKEN) sur Vercel pour publier.",
      });
    }

    try {
      let payload: Record<string, unknown>;
      try {
        payload = parseJsonBody(req.body);
      } catch {
        return res.status(400).json({ error: "Le corps de la requete doit etre un JSON valide." });
      }
      const content = payload.content;

      if (!content || typeof content !== "object") {
        return res.status(400).json({ error: "Le JSON du contenu est invalide." });
      }

      const { branch, filePath } = resolveConfig();
      const apiUrl = `${buildGithubContentsApiUrl()}?ref=${encodeURIComponent(branch)}`;

      let existingSha: string | undefined;
      const existingResponse = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: "application/vnd.github+json",
        },
      });

      if (existingResponse.ok) {
        const existingFilePayload = (await existingResponse.json()) as { sha?: string };
        existingSha = existingFilePayload.sha;
      } else if (existingResponse.status !== 404) {
        const errorBody = await existingResponse.text();
        return res.status(502).json({
          error: `Impossible de lire le fichier CMS sur GitHub (${existingResponse.status}).`,
          details: errorBody,
        });
      }

      const updatedFileContent = `${JSON.stringify(content, null, 2)}\n`;
      const updateResponse = await fetch(buildGithubContentsApiUrl(), {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "chore(cms): update site content from backoffice",
          content: Buffer.from(updatedFileContent, "utf8").toString("base64"),
          branch,
          sha: existingSha,
        }),
      });

      if (!updateResponse.ok) {
        const errorBody = await updateResponse.text();
        return res.status(502).json({
          error: `Echec de publication GitHub (${updateResponse.status}).`,
          details: errorBody,
        });
      }

      const updatePayload = await updateResponse.json();
      return res.status(200).json({
        success: true,
        filePath,
        branch,
        commitSha: updatePayload?.commit?.sha ?? null,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erreur inconnue lors de la publication CMS";
      return res.status(500).json({ error: message });
    }
  }

  res.setHeader("Allow", "GET, PUT");
  return res.status(405).json({ error: "Methode non autorisee." });
}
