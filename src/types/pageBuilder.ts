export type BuilderSectionType =
  | "hero"
  | "features"
  | "testimonials"
  | "blog"
  | "contact"
  | "custom";

export type BuilderBlockType =
  | "heading"
  | "paragraph"
  | "image"
  | "button"
  | "list";

export type BuilderBlock = {
  id: string;
  type: BuilderBlockType;
  content?: string;
  items?: string[];
  src?: string;
  alt?: string;
  href?: string;
};

export type SectionSettings = {
  background: string;
  padding: number;
  textColor: string;
};

export type BuilderSection = {
  id: string;
  type: BuilderSectionType;
  order: number;
  visible: boolean;
  settings: SectionSettings;
  blocks: BuilderBlock[];
};

export type SaveStatus = "idle" | "saving" | "saved" | "error";

export type BuilderViewport = "desktop" | "tablet" | "mobile";

export type BuilderSidebarTab = "add" | "structure" | "settings";
