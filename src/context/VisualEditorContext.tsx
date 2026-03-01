import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCmsContent } from "@/context/CmsContentContext";
import {
  appendToArrayByPath,
  removeArrayItemByPath,
  setByPath,
} from "@/lib/objectPath";

type VisualEditorContextValue = {
  isEnabled: boolean;
  adminToken: string;
  isSaving: boolean;
  setAdminToken: (token: string) => void;
  updateField: (path: string, value: unknown) => void;
  clearField: (path: string) => void;
  appendArrayItem: (path: string, value: unknown) => void;
  removeArrayItem: (path: string, index: number) => void;
  saveContent: () => Promise<void>;
  exitEditMode: () => void;
};

const VISUAL_EDITOR_TOKEN_KEY = "akconseil_visual_editor_token";
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

  const [adminToken, setAdminTokenState] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem(VISUAL_EDITOR_TOKEN_KEY);
    if (savedToken) {
      setAdminTokenState(savedToken);
    }
  }, []);

  const setAdminToken = (token: string) => {
    setAdminTokenState(token);
    localStorage.setItem(VISUAL_EDITOR_TOKEN_KEY, token);
  };

  const searchParams = new URLSearchParams(location.search);
  const isEnabled = searchParams.get(VISUAL_EDITOR_QUERY_KEY) === "1";

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
    if (!adminToken.trim()) {
      throw new Error("Token backoffice requis pour publier les changements.");
    }

    setIsSaving(true);
    try {
      const response = await fetch("/api/cms-content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-cms-token": adminToken.trim(),
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
    isEnabled,
    adminToken,
    isSaving,
    setAdminToken,
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
