import { useEffect, useState } from "react";
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
  const [isEditing, setIsEditing] = useState(false);
  const [draftSrc, setDraftSrc] = useState(src);

  useEffect(() => {
    if (!isEditing) {
      setDraftSrc(src);
    }
  }, [src, isEditing]);

  if (!isEnabled) {
    return <img src={src} alt={alt} className={imgClassName} loading={loading} />;
  }

  const onSave = () => {
    if (!draftSrc.trim()) {
      return;
    }
    updateField(path, draftSrc.trim());
    setIsEditing(false);
  };

  return (
    <div
      className={cn(
        "group relative rounded outline outline-1 outline-dashed outline-primary/50 hover:outline-primary transition-colors",
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
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          type="button"
          onClick={() => setIsEditing(true)}
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

      {isEditing && (
        <div className="absolute top-full left-0 mt-2 z-[60] w-[min(92vw,430px)] rounded-xl border border-border bg-background shadow-xl p-3 space-y-2">
          <p className="text-xs text-muted-foreground">
            Entrez une URL complete ou un chemin local (ex: /logo-akc.svg).
          </p>
          <input
            value={draftSrc}
            onChange={(event) => setDraftSrc(event.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="/images/photo.jpg"
          />
          <div className="flex items-center gap-2 justify-end">
            <button
              type="button"
              onClick={() => {
                setDraftSrc(src);
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
    </div>
  );
};

export default EditableImage;
