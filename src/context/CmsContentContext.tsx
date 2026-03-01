import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { CmsContent, defaultCmsContent } from "@/content/defaultCmsContent";

type CmsContentContextValue = {
  content: CmsContent;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  setContentLocally: (nextContent: CmsContent) => void;
};

const CmsContentContext = createContext<CmsContentContextValue | undefined>(undefined);

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const deepMerge = <T,>(base: T, override: unknown): T => {
  if (Array.isArray(base)) {
    return (Array.isArray(override) ? override : base) as T;
  }

  if (isObject(base)) {
    const result: Record<string, unknown> = { ...base };
    if (isObject(override)) {
      Object.keys(override).forEach((key) => {
        const currentBase = (base as Record<string, unknown>)[key];
        const currentOverride = override[key];

        if (Array.isArray(currentBase)) {
          result[key] = Array.isArray(currentOverride) ? currentOverride : currentBase;
          return;
        }

        if (isObject(currentBase)) {
          result[key] = deepMerge(currentBase, currentOverride);
          return;
        }

        result[key] = currentOverride;
      });
    }
    return result as T;
  }

  return (override ?? base) as T;
};

const mergeWithDefaults = (remoteContent: unknown) =>
  deepMerge(defaultCmsContent, remoteContent) as CmsContent;

export const CmsContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<CmsContent>(defaultCmsContent);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch("/api/cms-content", { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`Erreur API CMS (${response.status})`);
      }
      const payload = await response.json();
      setContent(mergeWithDefaults(payload));
    } catch (err) {
      setContent(defaultCmsContent);
      setError(err instanceof Error ? err.message : "Erreur CMS inconnue");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  const value = useMemo(
    () => ({
      content,
      isLoading,
      error,
      refresh,
      setContentLocally: setContent,
    }),
    [content, isLoading, error],
  );

  return <CmsContentContext.Provider value={value}>{children}</CmsContentContext.Provider>;
};

export const useCmsContent = () => {
  const context = useContext(CmsContentContext);
  if (!context) {
    throw new Error("useCmsContent doit etre utilise dans CmsContentProvider");
  }
  return context;
};
