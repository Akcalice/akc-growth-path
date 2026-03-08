import { BuilderSection, BuilderSectionType } from "@/types/pageBuilder";

const createId = () =>
  typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `section-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const baseSettings = {
  background: "#ffffff",
  padding: 64,
  textColor: "#111827",
};

export const createSectionFromType = (
  type: BuilderSectionType,
  order: number,
): BuilderSection => {
  if (type === "hero") {
    return {
      id: createId(),
      type,
      order,
      visible: true,
      settings: { ...baseSettings, background: "#f8fafc", padding: 96 },
      blocks: [
        { id: createId(), type: "heading", content: "<p>Votre titre hero</p>" },
        {
          id: createId(),
          type: "paragraph",
          content: "<p>Votre proposition de valeur ici.</p>",
        },
        { id: createId(), type: "button", content: "Prendre rendez-vous", href: "/contact" },
      ],
    };
  }

  if (type === "features") {
    return {
      id: createId(),
      type,
      order,
      visible: true,
      settings: { ...baseSettings, background: "#fefce8", padding: 64 },
      blocks: [
        { id: createId(), type: "heading", content: "<p>Nos services</p>" },
        {
          id: createId(),
          type: "list",
          items: ["Accompagnement educatif", "Insertion & orientation", "Coaching professionnel"],
        },
      ],
    };
  }

  if (type === "testimonials") {
    return {
      id: createId(),
      type,
      order,
      visible: true,
      settings: { ...baseSettings, background: "#ffffff", padding: 64 },
      blocks: [
        { id: createId(), type: "heading", content: "<p>Temoignages</p>" },
        {
          id: createId(),
          type: "paragraph",
          content: "<p>“Accompagnement de grande qualite.”</p>",
        },
      ],
    };
  }

  if (type === "blog") {
    return {
      id: createId(),
      type,
      order,
      visible: true,
      settings: { ...baseSettings, background: "#f8fafc", padding: 64 },
      blocks: [
        { id: createId(), type: "heading", content: "<p>Articles recents</p>" },
        {
          id: createId(),
          type: "paragraph",
          content: "<p>Ajoutez ici un extrait de vos derniers articles.</p>",
        },
      ],
    };
  }

  if (type === "contact") {
    return {
      id: createId(),
      type,
      order,
      visible: true,
      settings: { ...baseSettings, background: "#eff6ff", padding: 64 },
      blocks: [
        { id: createId(), type: "heading", content: "<p>Contact</p>" },
        {
          id: createId(),
          type: "paragraph",
          content: "<p>Contactez-nous pour demarrer votre accompagnement.</p>",
        },
      ],
    };
  }

  return {
    id: createId(),
    type: "custom",
    order,
    visible: true,
    settings: { ...baseSettings },
    blocks: [
      { id: createId(), type: "heading", content: "<p>Section personnalisée</p>" },
      { id: createId(), type: "paragraph", content: "<p>Contenu personnalisable.</p>" },
    ],
  };
};

export const defaultBuilderSections: BuilderSection[] = [
  createSectionFromType("hero", 0),
  createSectionFromType("features", 1),
  createSectionFromType("testimonials", 2),
  createSectionFromType("contact", 3),
];
