import { create } from "zustand";
import { defaultBuilderSections, createSectionFromType } from "@/lib/pageBuilderTemplates";
import {
  BuilderSection,
  BuilderSectionType,
  BuilderSidebarTab,
  BuilderViewport,
  SaveStatus,
} from "@/types/pageBuilder";

type BuilderHistory = {
  past: BuilderSection[][];
  future: BuilderSection[][];
};

type PageBuilderState = {
  sections: BuilderSection[];
  selectedSectionId: string | null;
  isEditMode: boolean;
  activeTab: BuilderSidebarTab;
  viewport: BuilderViewport;
  saveStatus: SaveStatus;
  history: BuilderHistory;
  setEditMode: (enabled: boolean) => void;
  setActiveTab: (tab: BuilderSidebarTab) => void;
  setViewport: (viewport: BuilderViewport) => void;
  setSaveStatus: (status: SaveStatus) => void;
  loadSections: (sections: BuilderSection[]) => void;
  selectSection: (sectionId: string | null) => void;
  addSection: (type: BuilderSectionType, insertAt?: number) => void;
  moveSection: (activeId: string, overId: string) => void;
  deleteSection: (sectionId: string) => void;
  duplicateSection: (sectionId: string) => void;
  updateSectionSettings: (
    sectionId: string,
    updates: Partial<BuilderSection["settings"]>,
  ) => void;
  toggleSectionVisibility: (sectionId: string) => void;
  updateBlockContent: (sectionId: string, blockId: string, content: string) => void;
  updateBlockImage: (sectionId: string, blockId: string, src: string, alt?: string) => void;
  undo: () => void;
  redo: () => void;
};

const normalizeOrder = (sections: BuilderSection[]) =>
  sections.map((section, index) => ({ ...section, order: index }));

const cloneSections = (sections: BuilderSection[]) =>
  JSON.parse(JSON.stringify(sections)) as BuilderSection[];

const createId = () =>
  typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const pushHistory = (history: BuilderHistory, snapshot: BuilderSection[]): BuilderHistory => {
  const nextPast = [...history.past, cloneSections(snapshot)];
  if (nextPast.length > 50) {
    nextPast.shift();
  }
  return { past: nextPast, future: [] };
};

export const usePageBuilderStore = create<PageBuilderState>((set, get) => ({
  sections: defaultBuilderSections,
  selectedSectionId: defaultBuilderSections[0]?.id ?? null,
  isEditMode: false,
  activeTab: "add",
  viewport: "desktop",
  saveStatus: "idle",
  history: { past: [], future: [] },

  setEditMode: (enabled) => set({ isEditMode: enabled }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setViewport: (viewport) => set({ viewport }),
  setSaveStatus: (saveStatus) => set({ saveStatus }),

  loadSections: (sections) =>
    set({
      sections: normalizeOrder(sections),
      selectedSectionId: sections[0]?.id ?? null,
      history: { past: [], future: [] },
    }),

  selectSection: (selectedSectionId) => set({ selectedSectionId }),

  addSection: (type, insertAt) => {
    const { sections, history } = get();
    const position = typeof insertAt === "number" ? insertAt : sections.length;
    const section = createSectionFromType(type, position);
    const next = [...sections];
    next.splice(position, 0, section);
    const ordered = normalizeOrder(next);
    set({
      sections: ordered,
      selectedSectionId: section.id,
      history: pushHistory(history, sections),
      activeTab: "settings",
    });
  },

  moveSection: (activeId, overId) => {
    if (activeId === overId) {
      return;
    }
    const { sections, history } = get();
    const oldIndex = sections.findIndex((section) => section.id === activeId);
    const newIndex = sections.findIndex((section) => section.id === overId);
    if (oldIndex === -1 || newIndex === -1) {
      return;
    }
    const next = [...sections];
    const [moved] = next.splice(oldIndex, 1);
    next.splice(newIndex, 0, moved);
    set({
      sections: normalizeOrder(next),
      history: pushHistory(history, sections),
    });
  },

  deleteSection: (sectionId) => {
    const { sections, history, selectedSectionId } = get();
    const next = sections.filter((section) => section.id !== sectionId);
    const ordered = normalizeOrder(next);
    set({
      sections: ordered,
      selectedSectionId:
        selectedSectionId === sectionId ? ordered[0]?.id ?? null : selectedSectionId,
      history: pushHistory(history, sections),
    });
  },

  duplicateSection: (sectionId) => {
    const { sections, history } = get();
    const sourceIndex = sections.findIndex((section) => section.id === sectionId);
    if (sourceIndex === -1) {
      return;
    }
    const source = sections[sourceIndex];
    const duplicate: BuilderSection = {
      ...cloneSections([source])[0],
      id: createId(),
      blocks: source.blocks.map((block) => ({
        ...block,
        id: createId(),
      })),
    };
    const next = [...sections];
    next.splice(sourceIndex + 1, 0, duplicate);
    set({
      sections: normalizeOrder(next),
      selectedSectionId: duplicate.id,
      history: pushHistory(history, sections),
    });
  },

  updateSectionSettings: (sectionId, updates) => {
    const { sections, history } = get();
    const next = sections.map((section) =>
      section.id === sectionId
        ? { ...section, settings: { ...section.settings, ...updates } }
        : section,
    );
    set({
      sections: next,
      history: pushHistory(history, sections),
    });
  },

  toggleSectionVisibility: (sectionId) => {
    const { sections, history } = get();
    const next = sections.map((section) =>
      section.id === sectionId ? { ...section, visible: !section.visible } : section,
    );
    set({
      sections: next,
      history: pushHistory(history, sections),
    });
  },

  updateBlockContent: (sectionId, blockId, content) => {
    const { sections, history } = get();
    const next = sections.map((section) =>
      section.id !== sectionId
        ? section
        : {
            ...section,
            blocks: section.blocks.map((block) =>
              block.id === blockId ? { ...block, content } : block,
            ),
          },
    );
    set({
      sections: next,
      history: pushHistory(history, sections),
    });
  },

  updateBlockImage: (sectionId, blockId, src, alt) => {
    const { sections, history } = get();
    const next = sections.map((section) =>
      section.id !== sectionId
        ? section
        : {
            ...section,
            blocks: section.blocks.map((block) =>
              block.id === blockId ? { ...block, src, alt: alt || block.alt } : block,
            ),
          },
    );
    set({
      sections: next,
      history: pushHistory(history, sections),
    });
  },

  undo: () => {
    const { history, sections } = get();
    const previous = history.past[history.past.length - 1];
    if (!previous) {
      return;
    }
    const past = history.past.slice(0, -1);
    const future = [cloneSections(sections), ...history.future];
    set({
      sections: normalizeOrder(previous),
      history: { past, future },
    });
  },

  redo: () => {
    const { history, sections } = get();
    const [next, ...remainingFuture] = history.future;
    if (!next) {
      return;
    }
    set({
      sections: normalizeOrder(next),
      history: {
        past: [...history.past, cloneSections(sections)],
        future: remainingFuture,
      },
    });
  },
}));
