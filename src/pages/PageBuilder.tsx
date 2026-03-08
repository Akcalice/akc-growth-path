import { useEffect, useMemo, useState } from "react";
import Layout from "@/components/Layout";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  closestCenter,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import InlineRichText from "@/components/page-builder/InlineRichText";
import { createSectionFromType } from "@/lib/pageBuilderTemplates";
import { usePageBuilderStore } from "@/store/usePageBuilderStore";
import {
  BuilderSection,
  BuilderSectionType,
  BuilderSidebarTab,
  BuilderViewport,
} from "@/types/pageBuilder";

const sectionTypes: BuilderSectionType[] = [
  "hero",
  "features",
  "testimonials",
  "blog",
  "contact",
  "custom",
];

const sectionTypeLabel: Record<BuilderSectionType, string> = {
  hero: "Hero",
  features: "Features",
  testimonials: "Testimonials",
  blog: "Blog",
  contact: "Contact",
  custom: "Custom",
};

const viewportClass: Record<BuilderViewport, string> = {
  desktop: "max-w-[1200px]",
  tablet: "max-w-[860px]",
  mobile: "max-w-[430px]",
};

const saveStatusLabel = {
  idle: "Aucune modification",
  saving: "Sauvegarde...",
  saved: "Sauvegarde",
  error: "Erreur",
};

const AddSectionCard = ({ type }: { type: BuilderSectionType }) => {
  const { addSection } = usePageBuilderStore();
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `template-${type}`,
    data: { kind: "template", type },
  });

  return (
    <button
      ref={setNodeRef}
      type="button"
      onClick={() => addSection(type)}
      {...listeners}
      {...attributes}
      className={`w-full rounded-xl border border-border bg-background px-4 py-3 text-left text-sm transition hover:border-primary ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      + Ajouter {sectionTypeLabel[type]}
    </button>
  );
};

const StructureItem = ({ section }: { section: BuilderSection }) => {
  const { selectSection, selectedSectionId } = usePageBuilderStore();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: section.id,
    data: { kind: "structure-item", sectionId: section.id },
  });

  return (
    <button
      ref={setNodeRef}
      type="button"
      onClick={() => selectSection(section.id)}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={`w-full rounded-lg border px-3 py-2 text-left text-xs transition ${
        selectedSectionId === section.id
          ? "border-primary bg-primary/5"
          : "border-border bg-background"
      } ${isDragging ? "opacity-50" : ""}`}
      {...attributes}
      {...listeners}
    >
      {sectionTypeLabel[section.type]} {section.visible ? "" : "(masquee)"}
    </button>
  );
};

const AddBetweenButton = ({ index }: { index: number }) => {
  const { isEditMode, addSection } = usePageBuilderStore();
  const [open, setOpen] = useState(false);

  if (!isEditMode) {
    return null;
  }

  return (
    <div className="relative flex justify-center py-2">
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        className="h-8 w-8 rounded-full bg-primary text-primary-foreground text-lg leading-none"
      >
        +
      </button>
      {open && (
        <div className="absolute top-10 z-40 grid grid-cols-2 gap-2 rounded-xl border border-border bg-background p-2 shadow-xl">
          {sectionTypes.map((type) => (
            <button
              key={`${type}-${index}`}
              type="button"
              onClick={() => {
                addSection(type, index + 1);
                setOpen(false);
              }}
              className="rounded-lg bg-accent px-2 py-1 text-[11px] hover:bg-accent/80"
            >
              {sectionTypeLabel[type]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const SectionCanvas = ({ section }: { section: BuilderSection }) => {
  const {
    isEditMode,
    selectSection,
    selectedSectionId,
    duplicateSection,
    deleteSection,
    setActiveTab,
    updateBlockContent,
    updateBlockImage,
  } = usePageBuilderStore();
  const [isHovered, setIsHovered] = useState(false);
  const { setNodeRef } = useDroppable({
    id: section.id,
    data: { kind: "section-drop", sectionId: section.id },
  });

  if (!section.visible) {
    return null;
  }

  return (
    <section
      ref={setNodeRef}
      className={`relative rounded-xl transition ${
        isEditMode && isHovered ? "border-2 border-blue-500" : "border-2 border-transparent"
      }`}
      style={{
        backgroundColor: section.settings.background,
        padding: `${section.settings.padding}px`,
        color: section.settings.textColor,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => selectSection(section.id)}
    >
      {isEditMode && (
        <>
          <span className="absolute left-2 top-2 rounded bg-blue-600 px-2 py-1 text-[10px] font-semibold text-white">
            {sectionTypeLabel[section.type]}
          </span>
          {(isHovered || selectedSectionId === section.id) && (
            <div className="absolute right-2 top-2 z-20 flex items-center gap-1 rounded-lg border border-border bg-background p-1 shadow-md">
              <button
                type="button"
                onClick={() => {
                  selectSection(section.id);
                  setActiveTab("settings");
                }}
                className="rounded px-2 py-1 text-[11px] hover:bg-accent"
              >
                Editer
              </button>
              <button
                type="button"
                onClick={() => {
                  selectSection(section.id);
                  setActiveTab("settings");
                }}
                className="rounded px-2 py-1 text-[11px] hover:bg-accent"
              >
                Parametres
              </button>
              <button
                type="button"
                onClick={() => duplicateSection(section.id)}
                className="rounded px-2 py-1 text-[11px] hover:bg-accent"
              >
                Dupliquer
              </button>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm("Supprimer cette section ?")) {
                    deleteSection(section.id);
                  }
                }}
                className="rounded px-2 py-1 text-[11px] text-destructive hover:bg-destructive/10"
              >
                Supprimer
              </button>
            </div>
          )}
        </>
      )}

      <div className="space-y-4">
        {section.blocks.map((block) => {
          if (block.type === "heading" || block.type === "paragraph") {
            return (
              <InlineRichText
                key={block.id}
                html={block.content || "<p>Texte</p>"}
                editable={isEditMode}
                className={block.type === "heading" ? "text-3xl font-bold" : "text-base"}
                onChange={(nextValue) => updateBlockContent(section.id, block.id, nextValue)}
              />
            );
          }

          if (block.type === "button") {
            return (
              <button
                key={block.id}
                type="button"
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                {block.content || "Button"}
              </button>
            );
          }

          if (block.type === "image") {
            return (
              <div key={block.id} className="space-y-2">
                <img
                  src={block.src || "/placeholder.svg"}
                  alt={block.alt || "Image section"}
                  className="w-full rounded-xl object-cover"
                />
                {isEditMode && (
                  <label className="inline-flex cursor-pointer items-center rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium">
                    Upload image
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (!file) {
                          return;
                        }
                        const reader = new FileReader();
                        reader.onload = () => {
                          const result = reader.result;
                          if (typeof result === "string") {
                            updateBlockImage(section.id, block.id, result, file.name);
                          }
                        };
                        reader.readAsDataURL(file);
                      }}
                    />
                  </label>
                )}
              </div>
            );
          }

          if (block.type === "list") {
            return (
              <ul key={block.id} className="list-disc space-y-2 pl-6">
                {(block.items || []).map((item, index) => (
                  <li key={`${block.id}-${index}`}>{item}</li>
                ))}
              </ul>
            );
          }

          return null;
        })}
      </div>
    </section>
  );
};

const exportToHtml = (sections: BuilderSection[]) => {
  const visibleSections = sections.filter((section) => section.visible);
  const htmlSections = visibleSections
    .map((section) => {
      const blocks = section.blocks
        .map((block) => {
          if (block.type === "heading" || block.type === "paragraph") {
            return block.content || "";
          }
          if (block.type === "button") {
            return `<a href="${block.href || "#"}" style="display:inline-block;padding:10px 20px;background:#0f172a;color:white;border-radius:999px;text-decoration:none;">${block.content || "Bouton"}</a>`;
          }
          if (block.type === "image") {
            return `<img src="${block.src || ""}" alt="${block.alt || ""}" style="width:100%;border-radius:16px;" />`;
          }
          if (block.type === "list") {
            const items = (block.items || []).map((item) => `<li>${item}</li>`).join("");
            return `<ul>${items}</ul>`;
          }
          return "";
        })
        .join("\n");

      return `<section style="background:${section.settings.background};padding:${section.settings.padding}px;color:${section.settings.textColor};">${blocks}</section>`;
    })
    .join("\n");

  return `<!doctype html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Export AKConseil</title></head><body style="margin:0;font-family:Inter,Arial,sans-serif;">${htmlSections}</body></html>`;
};

const SidebarTabs = ({
  activeTab,
  onChange,
}: {
  activeTab: BuilderSidebarTab;
  onChange: (tab: BuilderSidebarTab) => void;
}) => (
  <div className="grid grid-cols-3 gap-2">
    {[
      { key: "add", label: "Ajouter" },
      { key: "structure", label: "Structure" },
      { key: "settings", label: "Parametres" },
    ].map((tab) => (
      <button
        key={tab.key}
        type="button"
        onClick={() => onChange(tab.key as BuilderSidebarTab)}
        className={`rounded-lg px-3 py-2 text-xs font-semibold ${
          activeTab === tab.key
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground"
        }`}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

const CanvasEndDrop = () => {
  const { setNodeRef, isOver } = useDroppable({ id: "canvas-end" });
  return (
    <div
      className={`rounded-xl border border-dashed p-6 text-center text-xs ${
        isOver ? "border-primary bg-primary/5" : "border-border text-muted-foreground"
      }`}
      ref={setNodeRef}
    >
      Glissez ici pour ajouter une section
    </div>
  );
};

const PageBuilder = () => {
  const {
    sections,
    selectedSectionId,
    isEditMode,
    activeTab,
    viewport,
    saveStatus,
    history,
    setEditMode,
    setActiveTab,
    setViewport,
    setSaveStatus,
    loadSections,
    selectSection,
    addSection,
    moveSection,
    updateSectionSettings,
    toggleSectionVisibility,
    undo,
    redo,
  } = usePageBuilderStore();

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));
  const [isLoaded, setIsLoaded] = useState(false);
  const selectedSection = useMemo(
    () => sections.find((section) => section.id === selectedSectionId) || null,
    [sections, selectedSectionId],
  );

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const response = await fetch("/api/page-builder", { cache: "no-store" });
        if (!response.ok) {
          setIsLoaded(true);
          return;
        }
        const payload = (await response.json()) as { sections?: BuilderSection[] };
        if (Array.isArray(payload.sections) && payload.sections.length > 0) {
          loadSections(payload.sections);
        }
      } finally {
        setIsLoaded(true);
      }
    };
    void bootstrap();
  }, [loadSections]);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }
    setSaveStatus("saving");
    const timeout = window.setTimeout(async () => {
      try {
        const response = await fetch("/api/page-builder", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sections }),
        });
        if (!response.ok) {
          throw new Error("Echec de sauvegarde.");
        }
        setSaveStatus("saved");
      } catch {
        setSaveStatus("error");
      }
    }, 2000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [sections, isLoaded, setSaveStatus]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const modifier = event.ctrlKey || event.metaKey;
      if (!modifier) {
        return;
      }
      if (event.key.toLowerCase() === "z" && !event.shiftKey) {
        event.preventDefault();
        undo();
      }
      if (
        event.key.toLowerCase() === "y" ||
        (event.key.toLowerCase() === "z" && event.shiftKey)
      ) {
        event.preventDefault();
        redo();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [undo, redo]);

  const handleDragEnd = (event: DragEndEvent) => {
    const activeData = event.active.data.current as
      | { kind?: "template"; type?: BuilderSectionType }
      | { kind?: "structure-item"; sectionId?: string }
      | undefined;

    if (!event.over || !activeData) {
      return;
    }

    if (activeData.kind === "template" && activeData.type) {
      if (event.over.id === "canvas-end") {
        addSection(activeData.type, sections.length);
        return;
      }
      const overIndex = sections.findIndex((section) => section.id === String(event.over?.id));
      if (overIndex === -1) {
        addSection(activeData.type, sections.length);
      } else {
        addSection(activeData.type, overIndex);
      }
      return;
    }

    if (activeData.kind === "structure-item") {
      moveSection(String(event.active.id), String(event.over.id));
    }
  };

  return (
    <Layout>
      <div className="fixed right-4 top-20 z-[90] flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 shadow-lg">
        <span className="text-xs font-semibold">Mode edition</span>
        <button
          type="button"
          onClick={() => setEditMode(!isEditMode)}
          className={`h-7 w-14 rounded-full px-1 transition ${
            isEditMode ? "bg-primary" : "bg-secondary"
          }`}
        >
          <span
            className={`block h-5 w-5 rounded-full bg-white transition ${
              isEditMode ? "translate-x-7" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      <section className="py-12">
        <div className="container">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card px-4 py-3">
            <div className="flex items-center gap-2">
              <h1 className="font-display text-2xl font-bold">Page Builder visuel</h1>
              <span className="rounded-full bg-accent px-3 py-1 text-xs">
                {saveStatusLabel[saveStatus]}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {(["desktop", "tablet", "mobile"] as BuilderViewport[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setViewport(mode)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    viewport === mode
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {mode}
                </button>
              ))}
              <button
                type="button"
                onClick={undo}
                className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold"
              >
                Undo (Ctrl+Z)
              </button>
              <button
                type="button"
                onClick={redo}
                className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold"
              >
                Redo (Ctrl+Y)
              </button>
              <button
                type="button"
                onClick={() => {
                  const html = exportToHtml(sections);
                  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement("a");
                  link.href = url;
                  link.download = "akconseil-export.html";
                  link.click();
                  URL.revokeObjectURL(url);
                }}
                className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold"
              >
                Export HTML
              </button>
              <span className="text-xs text-muted-foreground">
                Historique: {history.past.length}
              </span>
            </div>
          </div>

          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
              <aside className="rounded-2xl border border-border bg-card p-4">
                <SidebarTabs activeTab={activeTab} onChange={setActiveTab} />

                <div className="mt-4 space-y-3">
                  {activeTab === "add" && (
                    <>
                      {sectionTypes.map((type) => (
                        <AddSectionCard key={type} type={type} />
                      ))}
                      <p className="text-xs text-muted-foreground">
                        Astuce : glissez une section sur la zone de preview.
                      </p>
                    </>
                  )}

                  {activeTab === "structure" && (
                    <SortableContext
                      items={sections.map((section) => section.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="space-y-2">
                        {sections.map((section) => (
                          <StructureItem key={section.id} section={section} />
                        ))}
                      </div>
                    </SortableContext>
                  )}

                  {activeTab === "settings" && selectedSection && (
                    <div className="space-y-4 rounded-xl border border-border bg-background p-3">
                      <h3 className="text-sm font-semibold">
                        Parametres - {sectionTypeLabel[selectedSection.type]}
                      </h3>

                      <label className="flex items-center justify-between text-xs">
                        Section visible
                        <input
                          type="checkbox"
                          checked={selectedSection.visible}
                          onChange={() => toggleSectionVisibility(selectedSection.id)}
                        />
                      </label>

                      <label className="block text-xs">
                        Couleur de fond
                        <input
                          type="color"
                          value={selectedSection.settings.background}
                          onChange={(event) =>
                            updateSectionSettings(selectedSection.id, {
                              background: event.target.value,
                            })
                          }
                          className="mt-1 h-9 w-full rounded border border-border"
                        />
                      </label>

                      <label className="block text-xs">
                        Couleur du texte
                        <input
                          type="color"
                          value={selectedSection.settings.textColor}
                          onChange={(event) =>
                            updateSectionSettings(selectedSection.id, {
                              textColor: event.target.value,
                            })
                          }
                          className="mt-1 h-9 w-full rounded border border-border"
                        />
                      </label>

                      <label className="block text-xs">
                        Padding ({selectedSection.settings.padding}px)
                        <input
                          type="range"
                          min={24}
                          max={140}
                          step={4}
                          value={selectedSection.settings.padding}
                          onChange={(event) =>
                            updateSectionSettings(selectedSection.id, {
                              padding: Number(event.target.value),
                            })
                          }
                          className="mt-2 w-full"
                        />
                      </label>
                    </div>
                  )}
                </div>
              </aside>

              <main className="rounded-2xl border border-border bg-card p-4">
                <div
                  className={`mx-auto w-full ${viewportClass[viewport]} min-h-[300px] space-y-4 transition-all`}
                >
                  {sections.map((section, index) => (
                    <div key={section.id} className="space-y-2">
                      <SectionCanvas section={section} />
                      <AddBetweenButton index={index} />
                    </div>
                  ))}
                  <CanvasEndDrop />
                </div>
              </main>
            </div>
          </DndContext>
        </div>
      </section>
    </Layout>
  );
};

export default PageBuilder;
