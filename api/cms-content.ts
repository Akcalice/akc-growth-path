const DEFAULT_OWNER = "Akcalice";
const DEFAULT_REPO = "akc-growth-path";
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

type ApiRequest = {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
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
    const rawToken = req.headers["x-cms-token"];
    const providedToken = Array.isArray(rawToken) ? rawToken[0] : rawToken;
    const expectedToken = process.env.CMS_ADMIN_TOKEN;

    if (!expectedToken || providedToken !== expectedToken) {
      return res.status(401).json({ error: "Token backoffice invalide." });
    }

    const githubToken = process.env.CMS_GITHUB_TOKEN;
    if (!githubToken) {
      return res.status(500).json({
        error: "La variable CMS_GITHUB_TOKEN est manquante sur Vercel.",
      });
    }

    try {
      const payload = parseJsonBody(req.body);
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
