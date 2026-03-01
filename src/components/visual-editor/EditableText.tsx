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

  if (!isEnabled) {
    return <>{value}</>;
  }

  const onEdit = () => {
    if (multiline) {
      const updated = window.prompt("Modifier le texte", value);
      if (updated !== null) {
        updateField(path, updated);
      }
      return;
    }

    const updated = window.prompt("Modifier le texte", value);
    if (updated !== null) {
      updateField(path, updated);
    }
  };

  return (
    <span
      className={cn(
        "relative inline-block rounded px-1 py-0.5 outline outline-1 outline-dashed outline-primary/40 hover:outline-primary transition-colors",
        className,
      )}
      title={`Champ editable: ${path}`}
    >
      <span>{value || "Texte vide"}</span>
      <span className="absolute -top-2 -right-2 flex gap-1">
        <button
          type="button"
          onClick={onEdit}
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
    </span>
  );
};

export default EditableText;
