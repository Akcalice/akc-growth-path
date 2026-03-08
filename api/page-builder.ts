type ApiRequest = {
  method?: string;
  body?: unknown;
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (payload: unknown) => ApiResponse | void;
  setHeader: (name: string, value: string) => void;
};

type BuilderSnapshot = {
  sections: unknown[];
  updatedAt: string;
};

declare global {
  // eslint-disable-next-line no-var
  var __AK_PAGE_BUILDER__: BuilderSnapshot | undefined;
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

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json(
      globalThis.__AK_PAGE_BUILDER__ || { sections: [], updatedAt: null },
    );
  }

  if (req.method === "PUT") {
    try {
      const payload = parseJsonBody(req.body);
      const sections = payload.sections;
      if (!Array.isArray(sections)) {
        return res.status(400).json({ error: "Le champ sections doit etre un tableau." });
      }

      globalThis.__AK_PAGE_BUILDER__ = {
        sections,
        updatedAt: new Date().toISOString(),
      };

      return res.status(200).json({
        success: true,
        updatedAt: globalThis.__AK_PAGE_BUILDER__.updatedAt,
      });
    } catch (error) {
      return res.status(500).json({
        error: error instanceof Error ? error.message : "Erreur de sauvegarde.",
      });
    }
  }

  res.setHeader("Allow", "GET, PUT");
  return res.status(405).json({ error: "Methode non autorisee." });
}
