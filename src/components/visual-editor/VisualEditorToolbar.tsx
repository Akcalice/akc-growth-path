import { useVisualEditor } from "@/context/VisualEditorContext";
import { useToast } from "@/hooks/use-toast";

const VisualEditorToolbar = () => {
  const { toast } = useToast();
  const {
    isEnabled,
    adminToken,
    isSaving,
    setAdminToken,
    saveContent,
    exitEditMode,
  } = useVisualEditor();

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
          value={adminToken}
          onChange={(event) => setAdminToken(event.target.value)}
          placeholder="Token CMS_ADMIN_TOKEN"
          className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <div className="flex items-center gap-2">
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
        </div>
      </div>
    </div>
  );
};

export default VisualEditorToolbar;
