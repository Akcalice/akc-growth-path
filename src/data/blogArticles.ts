import illusEducation from "@/assets/illus-education.jpg";
import illusInsertion from "@/assets/illus-insertion.jpg";
import illusCoaching from "@/assets/illus-coaching.jpg";

export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogArticle = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  category: "Educatif" | "Insertion" | "Professionnel";
  image: string;
  imageAlt: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  author: string;
  keywords: string[];
  sections: BlogSection[];
};

export const blogArticles: BlogArticle[] = [
  {
    slug: "accompagner-adolescent-difficulte-scolaire",
    title: "Accompagner un adolescent en difficulte scolaire : methode concrete en 7 etapes",
    metaTitle:
      "Difficulte scolaire adolescent : methode concrete en 7 etapes | AKC Gestion Conseils",
    metaDescription:
      "Un guide pratique pour aider un adolescent en difficulte scolaire : dialogue, organisation, motivation et coordination avec l'ecole.",
    excerpt:
      "Un cadre clair pour aider un adolescent en perte de motivation scolaire, sans conflit permanent ni culpabilite.",
    category: "Educatif",
    image: illusEducation,
    imageAlt: "Accompagnement educatif pour adolescent en difficulte scolaire",
    publishedAt: "2026-03-01",
    updatedAt: "2026-03-01",
    readingTime: "8 min",
    author: "AKC Gestion Conseils",
    keywords: [
      "adolescent difficulte scolaire",
      "accompagnement educatif",
      "motivation scolaire",
      "soutien parental",
      "AKC Gestion Conseils",
    ],
    sections: [
      {
        heading: "1) Reconnaitre les signaux faibles avant la rupture",
        paragraphs: [
          "La baisse des resultats n'est pas toujours le premier signal. Le desengagement se voit souvent avant : fatigue persistante, refus de parler de l'ecole, procrastination, irritabilite ou isolement.",
          "Observer ces indicateurs permet d'intervenir tot, avec une approche de prevention plutot que de correction dans l'urgence.",
        ],
      },
      {
        heading: "2) Ouvrir un dialogue sans jugement",
        paragraphs: [
          "L'objectif n'est pas de convaincre immediatement, mais de comprendre ce qui bloque : peur de l'echec, perte de sens, difficulte methodologique, pression sociale ou familiale.",
          "Une posture d'ecoute active reduit la resistance et favorise la cooperation. Les questions ouvertes fonctionnent mieux que les injonctions.",
        ],
        bullets: [
          "Qu'est-ce qui est le plus difficile pour toi en ce moment ?",
          "A quel moment de la semaine est-ce que tu te sens le plus depasse ?",
          "De quoi aurais-tu besoin pour te sentir plus en confiance ?",
        ],
      },
      {
        heading: "3) Repenser l'organisation avec des objectifs realistes",
        paragraphs: [
          "Un plan trop ambitieux echoue vite. Il faut des objectifs progressifs, mesurables et atteignables sur 2 a 4 semaines.",
          "On commence par des routines simples : plages de travail courtes, pauses, priorisation des matieres, et suivi visuel des progres.",
        ],
      },
      {
        heading: "4) Travailler la confiance autant que les notes",
        paragraphs: [
          "Le sentiment de competence influence directement l'engagement scolaire. Valoriser les efforts et les strategies mises en place est essentiel pour reconstruire la motivation.",
          "L'accompagnement ne doit pas se limiter au scolaire : sommeil, activite physique, relations sociales et gestion du stress ont un impact direct.",
        ],
      },
      {
        heading: "5) Coordonner les adultes autour du jeune",
        paragraphs: [
          "Parents, equipe pedagogique et accompagnant doivent partager une vision commune. Quand les messages sont coherents, l'adolescent se sent cadre et soutenu.",
          "Des points de suivi reguliers permettent d'ajuster le plan sans dramatiser chaque contretemps.",
        ],
      },
      {
        heading: "6) Installer un suivi dans la duree",
        paragraphs: [
          "Les progres ne sont pas lineaires. Il est normal d'observer des hauts et des bas. L'important est de maintenir la dynamique et de celebrer les petites victoires.",
          "Un accompagnement personnalise aide le jeune a redevenir acteur de son parcours, a son rythme.",
        ],
      },
      {
        heading: "Conclusion",
        paragraphs: [
          "Accompagner un adolescent en difficulte scolaire, c'est combiner exigence et bienveillance. Avec une methode claire et un cadre stable, les resultats reviennent durablement.",
          "Si vous souhaitez un accompagnement adapte a votre situation familiale, AKC Gestion Conseils peut vous aider a structurer un plan concret et rassurant.",
        ],
      },
    ],
  },
  {
    slug: "reconversion-professionnelle-plan-90-jours",
    title: "Reconversion professionnelle : plan d'action clair sur 90 jours",
    metaTitle: "Reconversion professionnelle : plan d'action 90 jours | AKC Gestion Conseils",
    metaDescription:
      "Un plan simple et efficace pour reussir sa reconversion professionnelle en 90 jours : clarifier son projet, valider son marche et passer a l'action.",
    excerpt:
      "Passez de l'idee a un vrai projet professionnel avec une feuille de route pragmatique en trois phases.",
    category: "Insertion",
    image: illusInsertion,
    imageAlt: "Plan de reconversion professionnelle en 90 jours",
    publishedAt: "2026-03-01",
    updatedAt: "2026-03-01",
    readingTime: "9 min",
    author: "AKC Gestion Conseils",
    keywords: [
      "reconversion professionnelle",
      "bilan de competences",
      "orientation professionnelle",
      "plan de transition",
      "insertion professionnelle",
    ],
    sections: [
      {
        heading: "Pourquoi un plan 90 jours fonctionne mieux",
        paragraphs: [
          "La reconversion echoue rarement par manque d'envie, mais souvent par manque de structure. Un horizon de 90 jours est assez long pour avancer, et assez court pour rester mobilise.",
          "Cette methode permet de sortir de l'incertitude, de tester rapidement son projet et de prendre des decisions basees sur des faits.",
        ],
      },
      {
        heading: "Phase 1 (Jours 1 a 30) : clarifier son cap",
        paragraphs: [
          "On identifie ses competences transferables, ses contraintes reelles (budget, temps, mobilite) et ses priorites personnelles.",
          "Le but n'est pas de trouver le metier parfait, mais de definir une direction solide et coherente avec votre realite.",
        ],
        bullets: [
          "Faire l'inventaire de ses savoir-faire et de ses reussites.",
          "Identifier les activites qui donnent de l'energie.",
          "Fixer un objectif cible a 6-12 mois.",
        ],
      },
      {
        heading: "Phase 2 (Jours 31 a 60) : valider le projet",
        paragraphs: [
          "Avant de se former ou de demissionner, il faut confronter l'idee au terrain : echanges metier, offres d'emploi, niveau de remuneration, exigences de recrutement.",
          "Cette phase evite les erreurs couteuses et permet d'ajuster le projet rapidement.",
        ],
        bullets: [
          "Réaliser 5 a 10 entretiens exploratoires.",
          "Etudier les annonces pour identifier les competences cles.",
          "Construire un mini plan de montee en competences.",
        ],
      },
      {
        heading: "Phase 3 (Jours 61 a 90) : passer en execution",
        paragraphs: [
          "On transforme la strategie en actions visibles : CV cible, profil LinkedIn, candidatures qualitatives, portefeuille de preuves et preparation des entretiens.",
          "C'est la phase de conversion : il faut un rythme regulier, des objectifs hebdomadaires et un suivi des resultats.",
        ],
      },
      {
        heading: "Les erreurs frequentes a eviter",
        paragraphs: [
          "Se former sans objectif clair, multiplier les candidatures non ciblees, attendre la confiance parfaite avant d'agir, ou ignorer ses contraintes financieres.",
          "Une transition reussie repose sur l'equilibre entre ambition, realisme et discipline.",
        ],
      },
      {
        heading: "Conclusion",
        paragraphs: [
          "Une reconversion professionnelle peut etre sereine lorsqu'elle est methodique. Le plan 90 jours offre une trajectoire claire et mesurable.",
          "AKC Gestion Conseils accompagne chaque etape : clarification, strategie, outils et suivi pour transformer un projet en resultat concret.",
        ],
      },
    ],
  },
  {
    slug: "coaching-entreprise-leviers-performance-bien-etre",
    title: "Coaching en entreprise : 5 leviers pour performance durable et bien-etre",
    metaTitle:
      "Coaching en entreprise : 5 leviers de performance durable | AKC Gestion Conseils",
    metaDescription:
      "Comment le coaching en entreprise ameliore cohesion, leadership, communication et engagement des equipes de maniere durable.",
    excerpt:
      "Le coaching en entreprise n'est pas un luxe : c'est un levier concret pour aligner performance, cohesion et qualite de vie au travail.",
    category: "Professionnel",
    image: illusCoaching,
    imageAlt: "Atelier de coaching en entreprise pour renforcer la cohesion",
    publishedAt: "2026-03-01",
    updatedAt: "2026-03-01",
    readingTime: "7 min",
    author: "AKC Gestion Conseils",
    keywords: [
      "coaching entreprise",
      "cohesion equipe",
      "leadership",
      "qualite de vie au travail",
      "accompagnement professionnel",
    ],
    sections: [
      {
        heading: "Le coaching en entreprise : pour quoi faire concretement ?",
        paragraphs: [
          "Le coaching aide les equipes et les managers a mieux cooperer, prendre des decisions plus claires et mieux gerer les tensions du quotidien.",
          "L'enjeu n'est pas seulement humain : c'est aussi un impact direct sur la productivite, la retention des talents et la qualite du service.",
        ],
      },
      {
        heading: "Levier 1 : clarifier les roles et responsabilites",
        paragraphs: [
          "Beaucoup de frictions viennent d'attentes implicites. Clarifier qui fait quoi, avec quels objectifs et quels indicateurs, fluidifie le fonctionnement de l'equipe.",
        ],
      },
      {
        heading: "Levier 2 : renforcer la communication operationnelle",
        paragraphs: [
          "Une communication efficace est precise, factuelle et orientee solution. Le coaching permet d'installer des rituels simples : feedbacks courts, points de synchronisation, cadrage des priorites.",
        ],
      },
      {
        heading: "Levier 3 : developper un leadership adapte",
        paragraphs: [
          "Un management uniforme ne fonctionne pas avec tous les profils. Le coaching aide les responsables a ajuster leur posture selon les situations : cadrer, deleguer, soutenir ou arbitrer.",
        ],
      },
      {
        heading: "Levier 4 : prevenir l'usure et le stress chronique",
        paragraphs: [
          "Quand la charge monte, les conflits augmentent et la qualite baisse. Le coaching apporte des outils concrets de regulation : priorisation, limites claires, gestion des urgences et recuperation.",
        ],
      },
      {
        heading: "Levier 5 : installer une culture de progression continue",
        paragraphs: [
          "Une equipe performante apprend en continu. Avec des objectifs trimestriels, des retours d'experience et des plans d'action courts, les progres deviennent visibles et durables.",
        ],
      },
      {
        heading: "Conclusion",
        paragraphs: [
          "Le coaching en entreprise est un investissement strategique. Il permet de construire une performance solide sans sacrifier la dimension humaine.",
          "AKC Gestion Conseils propose des formats sur-mesure : coaching individuel, ateliers collectifs et accompagnement des equipes dirigeantes.",
        ],
      },
    ],
  },
];

export const getBlogArticleBySlug = (slug: string) =>
  blogArticles.find((article) => article.slug === slug);

export const formatBlogDate = (date: string) =>
  new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
