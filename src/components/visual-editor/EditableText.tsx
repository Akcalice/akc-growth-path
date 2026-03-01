import { useEffect, useState } from "react";
import { useVisualEditor } from "@/context/VisualEditorContext";
import { cn } from "@/lib/utils";

type EditableTextProps = {
  path: string;
  value: string;
  className?: string;
  multiline?: boolean;
};

const EditableText = ({ path, value, className, multiline = false }: EditableTextProps) => {
  const { isEnabled, updateField, clearField } = useVisualEditor();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    if (!isEditing) {
      setDraft(value);
    }
  }, [value, isEditing]);

  if (!isEnabled) {
    return <>{value}</>;
  }

  const onSave = () => {
    updateField(path, draft);
    setIsEditing(false);
  };

  return (
    <span
      className={cn(
        "group relative inline-block rounded px-1 py-0.5 outline outline-1 outline-dashed outline-primary/40 hover:outline-primary transition-colors",
        className,
      )}
      title={`Champ editable: ${path}`}
    >
      <span>{value || "Texte vide"}</span>

      <span className="absolute -top-2 -right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] leading-none"
          aria-label={`Modifier ${path}`}
        >
          ✎
        </button>
        <button
          type="button"
          onClick={() => clearField(path)}
          className="w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-[10px] leading-none"
          aria-label={`Supprimer ${path}`}
        >
          ×
        </button>
      </span>

      {isEditing && (
        <div className="absolute top-full left-0 mt-2 z-[60] w-[min(90vw,360px)] rounded-xl border border-border bg-background shadow-xl p-3 space-y-2">
          {multiline ? (
            <textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              rows={4}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y"
            />
          ) : (
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          )}
          <div className="flex items-center gap-2 justify-end">
            <button
              type="button"
              onClick={() => {
                setDraft(value);
                setIsEditing(false);
              }}
              className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold hover:bg-secondary/90 transition-colors"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={onSave}
              className="px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:bg-navy-light transition-colors"
            >
              Valider
            </button>
          </div>
        </div>
      )}
    </span>
  );
};

export default EditableText;
