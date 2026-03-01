import { useVisualEditor } from "@/context/VisualEditorContext";
import { cn } from "@/lib/utils";

type EditableImageProps = {
  path: string;
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  loading?: "lazy" | "eager";
};

const EditableImage = ({
  path,
  src,
  alt,
  className,
  imgClassName,
  loading = "lazy",
}: EditableImageProps) => {
  const { isEnabled, updateField, clearField } = useVisualEditor();

  if (!isEnabled) {
    return <img src={src} alt={alt} className={imgClassName} loading={loading} />;
  }

  const onEdit = () => {
    const updated = window.prompt(
      "Modifier l'image (URL ou chemin /public)",
      src,
    );
    if (updated !== null && updated.trim()) {
      updateField(path, updated.trim());
    }
  };

  return (
    <div
      className={cn(
        "relative rounded outline outline-1 outline-dashed outline-primary/50 hover:outline-primary transition-colors",
        className,
      )}
      title={`Image editable: ${path}`}
    >
      {src ? (
        <img src={src} alt={alt} className={imgClassName} loading={loading} />
      ) : (
        <div className="w-full min-h-20 grid place-items-center text-xs text-muted-foreground">
          Image vide
        </div>
      )}
      <div className="absolute top-2 right-2 flex gap-1">
        <button
          type="button"
          onClick={onEdit}
          className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-[11px] leading-none"
          aria-label={`Modifier image ${path}`}
        >
          ✎
        </button>
        <button
          type="button"
          onClick={() => clearField(path)}
          className="w-6 h-6 rounded-full bg-destructive text-destructive-foreground text-[11px] leading-none"
          aria-label={`Supprimer image ${path}`}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default EditableImage;
