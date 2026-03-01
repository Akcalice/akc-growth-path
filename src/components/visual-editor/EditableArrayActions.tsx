import { useVisualEditor } from "@/context/VisualEditorContext";

type EditableArrayActionsProps = {
  arrayPath: string;
  index?: number;
  createItem?: () => unknown;
  className?: string;
};

const EditableArrayActions = ({
  arrayPath,
  index,
  createItem,
  className,
}: EditableArrayActionsProps) => {
  const { isEnabled, appendArrayItem, removeArrayItem } = useVisualEditor();

  if (!isEnabled) {
    return null;
  }

  return (
    <div className={className}>
      <div className="flex gap-1">
        {createItem && (
          <button
            type="button"
            onClick={() => appendArrayItem(arrayPath, createItem())}
            className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-[12px] leading-none"
            aria-label={`Ajouter dans ${arrayPath}`}
            title="Ajouter"
          >
            +
          </button>
        )}
        {typeof index === "number" && (
          <button
            type="button"
            onClick={() => removeArrayItem(arrayPath, index)}
            className="w-6 h-6 rounded-full bg-destructive text-destructive-foreground text-[12px] leading-none"
            aria-label={`Supprimer element ${index} de ${arrayPath}`}
            title="Supprimer"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default EditableArrayActions;
