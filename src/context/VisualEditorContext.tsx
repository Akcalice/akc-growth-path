import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCmsContent } from "@/context/CmsContentContext";
import { useAdminAuth } from "@/context/AdminAuthContext";
import {
  appendToArrayByPath,
  removeArrayItemByPath,
  setByPath,
} from "@/lib/objectPath";

type VisualEditorContextValue = {
  isRequested: boolean;
  isEnabled: boolean;
  isAuthenticated: boolean;
  isSaving: boolean;
  updateField: (path: string, value: unknown) => void;
  clearField: (path: string) => void;
  appendArrayItem: (path: string, value: unknown) => void;
  removeArrayItem: (path: string, index: number) => void;
  saveContent: () => Promise<void>;
  exitEditMode: () => void;
};

const VISUAL_EDITOR_QUERY_KEY = "edit";

const cloneContent = <T,>(value: T): T => {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value)) as T;
};

const VisualEditorContext = createContext<VisualEditorContextValue | undefined>(undefined);

export const VisualEditorProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { content, setContentLocally, refresh } = useCmsContent();
  const { isAuthenticated } = useAdminAuth();

  const [isSaving, setIsSaving] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const isRequested = searchParams.get(VISUAL_EDITOR_QUERY_KEY) === "1";
  const isEnabled = isRequested && isAuthenticated;

  const updateField = (path: string, value: unknown) => {
    const draft = cloneContent(content);
    setByPath(draft, path, value);
    setContentLocally(draft);
  };

  const clearField = (path: string) => {
    updateField(path, "");
  };

  const appendArrayItem = (path: string, value: unknown) => {
    const draft = cloneContent(content);
    appendToArrayByPath(draft, path, value);
    setContentLocally(draft);
  };

  const removeArrayItem = (path: string, index: number) => {
    const draft = cloneContent(content);
    removeArrayItemByPath(draft, path, index);
    setContentLocally(draft);
  };

  const saveContent = async () => {
    if (!isAuthenticated) {
      throw new Error("Connexion admin requise pour publier les changements.");
    }

    setIsSaving(true);
    try {
      const response = await fetch("/api/cms-content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        const errorPayload = (await response.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(errorPayload.error || `Erreur API (${response.status})`);
      }

      await refresh();
    } finally {
      setIsSaving(false);
    }
  };

  const exitEditMode = () => {
    const nextParams = new URLSearchParams(location.search);
    nextParams.delete(VISUAL_EDITOR_QUERY_KEY);
    const nextSearch = nextParams.toString();
    navigate(
      {
        pathname: location.pathname,
        search: nextSearch ? `?${nextSearch}` : "",
      },
      { replace: true },
    );
  };

  const value = {
    isRequested,
    isEnabled,
    isAuthenticated,
    isSaving,
    updateField,
    clearField,
    appendArrayItem,
    removeArrayItem,
    saveContent,
    exitEditMode,
  };

  return <VisualEditorContext.Provider value={value}>{children}</VisualEditorContext.Provider>;
};

export const useVisualEditor = () => {
  const context = useContext(VisualEditorContext);
  if (!context) {
    throw new Error("useVisualEditor doit etre utilise dans VisualEditorProvider");
  }
  return context;
};
