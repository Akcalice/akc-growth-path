import { useVisualEditor } from "@/context/VisualEditorContext";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "react-router-dom";

const VisualEditorToolbar = () => {
  const { toast } = useToast();
  const location = useLocation();
  const {
    isRequested,
    isEnabled,
    adminPassword,
    isSaving,
    setAdminPassword,
    saveContent,
    exitEditMode,
  } = useVisualEditor();
  const { isAuthenticated, logout } = useAdminAuth();

  if (!isRequested) {
    return null;
  }

  const loginUrl = `/admin-login?next=${encodeURIComponent(
    `${location.pathname}${location.search}`,
  )}`;

  if (!isAuthenticated) {
    return (
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999] w-[min(96vw,820px)] bg-background border border-border shadow-xl rounded-2xl px-4 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-xs md:text-sm font-semibold">
            Mode edition protege : connectez-vous pour modifier le site.
          </p>
          <a
            href={loginUrl}
            className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs md:text-sm font-semibold hover:bg-navy-light transition-colors"
          >
            Se connecter
          </a>
        </div>
      </div>
    );
  }

  if (!isEnabled) {
    return null;
  }

  const onSave = async () => {
    try {
      await saveContent();
      toast({
        title: "Modifications publiees",
        description: "Les changements visuels ont ete sauvegardes dans le site.",
      });
    } catch (error) {
      toast({
        title: "Publication impossible",
        description:
          error instanceof Error ? error.message : "Erreur inconnue lors de la publication.",
      });
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999] w-[min(96vw,900px)] bg-background border border-border shadow-xl rounded-2xl px-3 py-3 md:px-4 md:py-3">
      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        <div className="text-xs md:text-sm font-semibold">Mode edition visuelle actif</div>
        <input
          type="password"
          value={adminPassword}
          onChange={(event) => setAdminPassword(event.target.value)}
          placeholder="Mot de passe admin pour publier"
          className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs md:text-sm font-semibold hover:bg-navy-light transition-colors disabled:opacity-60"
          >
            {isSaving ? "Publication..." : "Publier"}
          </button>
          <button
            type="button"
            onClick={exitEditMode}
            className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-xs md:text-sm font-semibold hover:bg-secondary/90 transition-colors"
          >
            Quitter
          </button>
          <button
            type="button"
            onClick={() => void logout()}
            className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-xs md:text-sm font-semibold hover:bg-secondary/90 transition-colors"
          >
            Deconnexion
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisualEditorToolbar;
