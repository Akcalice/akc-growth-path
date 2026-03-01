export type CmsSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type CmsBlogPost = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  category: "Educatif" | "Insertion" | "Professionnel";
  imageKey: string;
  imageAlt: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  author: string;
  keywords: string[];
  sections: CmsSection[];
};

export type CmsContent = {
  site: {
    companyName: string;
    tabTitle: string;
    defaultMetaDescription: string;
    ogImage: string;
    logoPath: string;
    faviconPath: string;
    contactEmail: string;
    location: string;
  };
  navbar: {
    links: { to: string; label: string }[];
    ctaLabel: string;
  };
  footer: {
    description: string;
    navigationTitle: string;
    navigationLinks: { to: string; label: string }[];
    contactTitle: string;
    appointmentTitle: string;
    appointmentDescription: string;
    appointmentCtaLabel: string;
    copyrightText: string;
  };
  home: {
    heroBadge: string;
    heroTitleLine1: string;
    heroTitleLine2: string;
    heroDescription: string;
    heroPrimaryCta: string;
    heroSecondaryCta: string;
    introTitle: string;
    introDescription: string;
    services: { title: string; description: string; imageKey: string }[];
    howItWorksTitle: string;
    steps: { num: string; title: string; text: string }[];
    whyTitle: string;
    whySubtitle: string;
    whyTagline: string;
    whyCardTitle: string;
    whyCtaLabel: string;
    whyImageKey: string;
    testimonialsTitle: string;
    testimonials: { text: string; name: string; sessions: string }[];
    faqTitle: string;
    faqDescription: string;
    faqItems: { q: string; a: string }[];
    faqCtaLabel: string;
    finalCtaTitle: string;
    finalCtaDescription: string;
    finalCtaLabel: string;
  };
  about: {
    badge: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
    ctaLabel: string;
    portraitImageKey: string;
    methodologyTitle: string;
    methodologyParagraph1: string;
    methodologyParagraph2: string;
    methodologyImageKey: string;
    valuesTitle: string;
    values: { title: string; text: string }[];
  };
  servicesPage: {
    badge: string;
    title: string;
    intro: string;
    items: {
      title: string;
      description: string;
      forWho: string;
      imageKey: string;
      learnMoreLabel: string;
    }[];
    audiencesTitle: string;
    audiences: { title: string; text: string }[];
    ctaTitle: string;
    ctaDescription: string;
    ctaLabel: string;
  };
  accompagnementPage: {
    badge: string;
    title: string;
    intro: string;
    poles: {
      title: string;
      description: string;
      items: string[];
    }[];
    listTitle: string;
    ctaLabel: string;
  };
  pricingPage: {
    title: string;
    intro: string;
    plans: {
      title: string;
      price: string;
      featured: boolean;
      features: string[];
      ctaLabel: string;
      ctaLink: string;
    }[];
    ctaTitle: string;
    ctaDescription: string;
    ctaLabel: string;
  };
  rendezVousPage: {
    badge: string;
    title: string;
    intro: string;
    options: {
      title: string;
      duration: string;
      price: string;
      description: string;
      features: string[];
      popular?: boolean;
      ctaLabel: string;
      ctaLink: string;
    }[];
    formatsTitle: string;
    formats: { title: string; text: string }[];
  };
  contactPage: {
    badge: string;
    title: string;
    intro: string;
    form: {
      fullNameLabel: string;
      fullNamePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      subjectLabel: string;
      subjectPlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      submitLabel: string;
      successTitle: string;
      successDescription: string;
      errorTitle: string;
      errorDescription: string;
    };
    infoTitle: string;
    hoursTitle: string;
    hoursWeekdays: string;
    hoursSaturday: string;
  };
  blog: {
    badge: string;
    listingTitle: string;
    listingDescription: string;
    seoTitle: string;
    seoDescription: string;
    posts: CmsBlogPost[];
    notFoundTitle: string;
    notFoundDescription: string;
    backToBlogLabel: string;
    articleCtaTitle: string;
    articleCtaDescription: string;
    articleCtaLabel: string;
  };
};

export const defaultCmsContent: CmsContent = {
  site: {
    companyName: "AKConseil",
    tabTitle: "AKConseil",
    defaultMetaDescription:
      "AKConseil : accompagnement educatif, social et professionnel sur-mesure.",
    ogImage: "/logo-akc.svg",
    logoPath: "/logo-akc.svg",
    faviconPath: "/favicon-akconseil.svg",
    contactEmail: "contact@akconseil.fr",
    location: "France",
  },
  navbar: {
    links: [
      { to: "/", label: "Accueil" },
      { to: "/a-propos", label: "A Propos" },
      { to: "/services", label: "Services" },
      { to: "/accompagnement", label: "Accompagnement" },
      { to: "/prix", label: "Prix" },
      { to: "/blog", label: "Blog" },
      { to: "/contact", label: "Contact" },
    ],
    ctaLabel: "Prendre RDV",
  },
  footer: {
    description:
      "Accompagnement educatif, social et professionnel sur-mesure. Aller au rythme de la personne accompagnee.",
    navigationTitle: "Navigation",
    navigationLinks: [
      { to: "/", label: "Accueil" },
      { to: "/a-propos", label: "A Propos" },
      { to: "/services", label: "Services" },
      { to: "/accompagnement", label: "Accompagnement" },
      { to: "/blog", label: "Blog" },
    ],
    contactTitle: "Contact",
    appointmentTitle: "Prendre RDV",
    appointmentDescription:
      "Reservez une consultation personnalisee pour demarrer votre accompagnement.",
    appointmentCtaLabel: "Reserver",
    copyrightText: "Tous droits reserves.",
  },
  home: {
    heroBadge: "Consultante experte (+25 ans d'experiences)",
    heroTitleLine1: "L'aide qu'il vous faut,",
    heroTitleLine2: "au moment juste.",
    heroDescription:
      "Parce que chaque parcours est unique, notre accompagnement l'est aussi.",
    heroPrimaryCta: "Prendre Rendez-vous",
    heroSecondaryCta: "Decouvrir nos services",
    introTitle: "Accompagnement educatif, social et professionnel sur-mesure.",
    introDescription:
      "Un accompagnement complet a travers des formations, des ateliers pratiques et des conseils sur-mesure, dedies aux femmes, aux familles et aux structures professionnelles.",
    services: [
      {
        title: "Accompagnement educatif",
        description:
          "Orientation, ecoute attentive et soutien dans la gestion de situations complexes : education, developpement personnel et equilibre familial.",
        imageKey: "familySupport",
      },
      {
        title: "Insertion & orientation",
        description:
          "Ateliers cibles et temps d'echange pour definir un projet clair, valoriser vos competences et reprendre confiance en votre parcours.",
        imageKey: "coachingSession",
      },
      {
        title: "Coaching professionnel",
        description:
          "Formations et ateliers pratiques pour booster la confiance, atteindre ses objectifs, renforcer la cohesion et encourager l'autonomie.",
        imageKey: "booksHero",
      },
    ],
    howItWorksTitle: "Comment ca marche",
    steps: [
      {
        num: "1",
        title: "Diagnostic",
        text: "Commencez par identifier vos besoins grace a un diagnostic simple et rapide. Je cerne vos attentes et repere les axes prioritaires.",
      },
      {
        num: "2",
        title: "Accompagnement",
        text: "Recevez un accompagnement personnalise : conseils, ateliers pratiques ou coaching adapte a votre profil.",
      },
      {
        num: "3",
        title: "Evolution",
        text: "Suivez votre evolution etape par etape. Je vous aide a garder le cap, a rester motive et a mesurer vos progres.",
      },
    ],
    whyTitle: "Pourquoi faire appel a AKConseil ?",
    whySubtitle: "Une approche humaine et engagee",
    whyTagline: "Parce que vous n'etes pas seul",
    whyCardTitle: "Un cadre bienveillant, sans jugement",
    whyCtaLabel: "Votre evolution commence ici",
    whyImageKey: "communitySunset",
    testimonialsTitle: "Nos Avis clients",
    testimonials: [
      {
        text: "AKConseil a su m'accompagner avec une grande justesse, a un moment ou j'avais besoin de recul et de clarte.",
        name: "Charline",
        sessions: "8 sessions",
      },
      {
        text: "Grace a l'accompagnement personnalise, j'ai pu retrouver confiance en moi et construire un projet professionnel solide.",
        name: "Anna",
        sessions: "7 sessions",
      },
      {
        text: "Un cadre bienveillant et sans jugement qui m'a permis d'avancer sereinement dans ma reconversion.",
        name: "Sophie",
        sessions: "12 sessions",
      },
    ],
    faqTitle: "Foire Aux Questions",
    faqDescription:
      "Si vous ne trouvez pas ce que vous cherchez, n'hesitez pas a nous contacter.",
    faqItems: [
      {
        q: "A qui s'adresse nos accompagnements ?",
        a: "Nos accompagnements s'adressent aux femmes, aux familles, aux jeunes en recherche d'orientation, ainsi qu'aux entreprises et structures souhaitant renforcer leurs equipes.",
      },
      {
        q: "Comment reserver un rendez-vous ?",
        a: "Vous pouvez reserver directement via notre page de prise de rendez-vous en ligne ou nous contacter par email a contact@akconseil.fr.",
      },
      {
        q: "A qui s'adresse l'accompagnement ?",
        a: "L'accompagnement s'adresse a toute personne souhaitant evoluer sur le plan educatif, social ou professionnel, qu'elle soit particulier ou au sein d'une structure.",
      },
      {
        q: "Quels sont les avantages de cet accompagnement ?",
        a: "Un suivi personnalise, un cadre bienveillant, des outils concrets et une approche adaptee a votre rythme pour des resultats durables.",
      },
      {
        q: "Comment se deroule le premier rendez-vous ?",
        a: "Le premier rendez-vous est un temps d'ecoute et de diagnostic pour comprendre vos besoins, vos attentes et definir ensemble les axes prioritaires.",
      },
      {
        q: "Puis-je poser des questions avant de m'engager ?",
        a: "Bien sur ! Nous proposons un premier echange gratuit pour repondre a toutes vos questions avant tout engagement.",
      },
      {
        q: "Proposes-tu des interventions en structure ou entreprise ?",
        a: "Oui, nous intervenons aupres des entreprises, associations et institutions avec des ateliers sur-mesure, des formations et du coaching collectif.",
      },
    ],
    faqCtaLabel: "Contactez-nous",
    finalCtaTitle: "Pret·e a avancer ?",
    finalCtaDescription:
      "Reservez votre premier rendez-vous et commencez votre accompagnement personnalise.",
    finalCtaLabel: "Prendre Rendez-vous",
  },
  about: {
    badge: "A propos",
    title: "Une consultante engagee a vos cotes",
    paragraph1:
      "Fondatrice d'AKC Gestion Conseils, je suis consultante experte avec plus de 25 ans d'experience dans l'accompagnement educatif, l'insertion et le developpement professionnel.",
    paragraph2:
      "Ma philosophie : Aller au rythme de la personne accompagnee. Chaque parcours est unique, et mon approche humaine et personnalisee permet a chacun de devenir acteur de son evolution. Je travaille aupres des femmes, des familles, des jeunes et des structures professionnelles pour offrir un accompagnement complet et bienveillant.",
    ctaLabel: "Prendre Rendez-vous",
    portraitImageKey: "consultantPortrait",
    methodologyTitle: "Ma methodologie",
    methodologyParagraph1:
      "Mon approche repose sur l'ecoute active, l'analyse de la situation globale et la co-construction de solutions adaptees. Je combine formations, ateliers pratiques et conseils personnalises.",
    methodologyParagraph2:
      "Que vous soyez un particulier en quete de reperes ou une entreprise souhaitant renforcer ses equipes, je m'engage a vous accompagner avec respect, professionnalisme et engagement.",
    methodologyImageKey: "booksStudy",
    valuesTitle: "Nos valeurs",
    values: [
      {
        title: "Bienveillance",
        text: "Un cadre d'ecoute sans jugement, respectueux du rythme de chacun.",
      },
      {
        title: "Sur-mesure",
        text: "Chaque accompagnement est adapte a votre situation et vos objectifs.",
      },
      {
        title: "Humanite",
        text: "Aller au rythme de la personne accompagnee, toujours.",
      },
      {
        title: "Expertise",
        text: "Plus de 25 ans d'experience dans l'accompagnement educatif et professionnel.",
      },
    ],
  },
  servicesPage: {
    badge: "Nos services",
    title: "Des prestations sur-mesure",
    intro:
      "AKC Gestion Conseils vous accompagne avec engagement vers plus de serenite professionnelle, sociale et educative.",
    items: [
      {
        title: "Accompagnement educatif",
        description:
          "Orientation, ecoute attentive et soutien dans la gestion de situations complexes : education, developpement personnel et equilibre familial.",
        forWho: "Parents, familles, jeunes",
        imageKey: "illusEducation",
        learnMoreLabel: "En savoir plus",
      },
      {
        title: "Insertion & orientation professionnelle",
        description:
          "Ateliers cibles, bilans de competences et temps d'echange pour definir un projet clair, valoriser vos competences et reprendre confiance.",
        forWho: "Personnes en reconversion, demandeurs d'emploi",
        imageKey: "illusInsertion",
        learnMoreLabel: "En savoir plus",
      },
      {
        title: "Coaching professionnel",
        description:
          "Formations et ateliers pratiques pour booster la confiance, atteindre ses objectifs, renforcer la cohesion et encourager l'autonomie.",
        forWho: "Entreprises, structures, professionnels",
        imageKey: "illusCoaching",
        learnMoreLabel: "En savoir plus",
      },
    ],
    audiencesTitle: "A qui s'adressent nos services ?",
    audiences: [
      {
        title: "Particuliers",
        text: "Femmes, familles, jeunes en quete d'accompagnement personnalise.",
      },
      {
        title: "Entreprises & Institutions",
        text: "Formations sur-mesure, ateliers collectifs et coaching d'equipe.",
      },
    ],
    ctaTitle: "Contactez-nous pour un devis sur-mesure",
    ctaDescription:
      "Offres variees : seance individuelle, suivi, forfaits et ateliers collectifs. Tous les services sont personnalises.",
    ctaLabel: "Contactez-nous",
  },
  accompagnementPage: {
    badge: "Accompagnement",
    title: "Nos 3 poles d'intervention",
    intro:
      "Un accompagnement global et personnalise, adapte a chaque situation et a chaque rythme.",
    poles: [
      {
        title: "Pole Educatif",
        description:
          "Un espace d'ecoute et d'echange pour apaiser les tensions, favoriser le dialogue et retablir un equilibre dans les relations familiales.",
        items: [
          "Soutien a la parentalite",
          "Guidance educative",
          "Mediation familiale",
          "Ateliers parents-enfants",
          "Accompagnement scolaire",
        ],
      },
      {
        title: "Pole Insertion",
        description:
          "Vous etes en recherche d'emploi, en reconversion ou en questionnement professionnel ? Je vous accompagne pour definir un projet clair et reprendre confiance.",
        items: [
          "Bilan de competences",
          "Aide a la recherche d'emploi",
          "Preparation aux entretiens",
          "Redaction de CV et lettres",
          "Orientation professionnelle",
        ],
      },
      {
        title: "Pole Professionnel",
        description:
          "Formations et ateliers pratiques pour booster la confiance, atteindre ses objectifs et encourager l'autonomie au sein de votre structure.",
        items: [
          "Coaching individuel",
          "Formation en entreprise",
          "Ateliers de cohesion d'equipe",
          "Developpement du leadership",
          "Gestion du stress",
        ],
      },
    ],
    listTitle: "Ce que nous proposons :",
    ctaLabel: "Reserver une consultation",
  },
  pricingPage: {
    title: "Tarifs & forfaits",
    intro:
      "Seances individuelles, suivis personnalises, ateliers & offres entreprises.",
    plans: [
      {
        title: "Seance de suivi",
        price: "60€",
        featured: true,
        features: ["Session 1h", "Suivi progressif", "Objectifs sur-mesure"],
        ctaLabel: "Prendre RDV",
        ctaLink: "/rendez-vous",
      },
      {
        title: "Seance initiale",
        price: "90€",
        featured: false,
        features: [
          "Entretien 1h30 complet",
          "Bilan personnalise",
          "Conseils adaptes + suivi",
        ],
        ctaLabel: "Prendre RDV",
        ctaLink: "/rendez-vous",
      },
      {
        title: "Ateliers & Entreprises",
        price: "500€",
        featured: false,
        features: [
          "Session 3h (10 pers. max)",
          "Programme adapte/collectif",
          "Supports pedagogiques inclus",
        ],
        ctaLabel: "Prendre RDV",
        ctaLink: "/rendez-vous",
      },
      {
        title: "Ateliers & Entreprises",
        price: "Sur devis",
        featured: false,
        features: [
          "Session 3h (10 pers. max)",
          "Forfaits semaines/mois",
          "Programme adapte/collectif",
        ],
        ctaLabel: "Demander un devis",
        ctaLink: "/contact",
      },
    ],
    ctaTitle: "Besoin d'une offre personnalisee ?",
    ctaDescription:
      "Contactez-nous pour un devis sur-mesure adapte a vos besoins specifiques.",
    ctaLabel: "Contactez-nous",
  },
  rendezVousPage: {
    badge: "Prise de Rendez-vous",
    title: "Reservez votre consultation",
    intro:
      "Choisissez la formule qui vous convient et demarrez votre accompagnement personnalise.",
    options: [
      {
        title: "Consultation decouverte",
        duration: "30 min",
        price: "Gratuit",
        description:
          "Un premier echange pour faire connaissance et evaluer vos besoins.",
        features: [
          "Ecoute de votre situation",
          "Identification des axes",
          "Proposition de suivi",
        ],
        ctaLabel: "Reserver",
        ctaLink: "/contact",
      },
      {
        title: "Seance individuelle",
        duration: "1h",
        price: "Sur devis",
        description:
          "Accompagnement personnalise sur la thematique de votre choix.",
        features: ["Suivi personnalise", "Outils concrets", "Bilan de progression"],
        popular: true,
        ctaLabel: "Reserver",
        ctaLink: "/contact",
      },
      {
        title: "Forfait accompagnement",
        duration: "5 seances",
        price: "Sur devis",
        description: "Un parcours complet pour un accompagnement en profondeur.",
        features: [
          "Programme sur-mesure",
          "Suivi regulier",
          "Support entre les seances",
        ],
        ctaLabel: "Reserver",
        ctaLink: "/contact",
      },
    ],
    formatsTitle: "Formats de consultation",
    formats: [
      {
        title: "Visioconference",
        text: "Depuis chez vous, en toute simplicite.",
      },
      {
        title: "En presentiel",
        text: "Dans un espace dedie et confidentiel.",
      },
      {
        title: "Rendez-vous flash",
        text: "Pour une question rapide et ciblee.",
      },
    ],
  },
  contactPage: {
    badge: "Contact",
    title: "Contactez-nous",
    intro:
      "N'hesitez pas a nous ecrire pour toute question ou demande de renseignement.",
    form: {
      fullNameLabel: "Nom complet",
      fullNamePlaceholder: "Votre nom",
      emailLabel: "Email",
      emailPlaceholder: "votre@email.com",
      subjectLabel: "Sujet",
      subjectPlaceholder: "Sujet de votre message",
      messageLabel: "Message",
      messagePlaceholder: "Votre message...",
      submitLabel: "Envoyer",
      successTitle: "Message envoye !",
      successDescription: "Nous vous repondrons dans les meilleurs delais.",
      errorTitle: "Erreur d'envoi",
      errorDescription:
        "Une erreur est survenue. Merci de reessayer ou de nous ecrire par email.",
    },
    infoTitle: "Informations de contact",
    hoursTitle: "Horaires",
    hoursWeekdays: "Lundi - Vendredi : 9h - 18h",
    hoursSaturday: "Samedi : Sur rendez-vous",
  },
  blog: {
    badge: "Blog",
    listingTitle: "Nos 3 articles de reference",
    listingDescription:
      "Des contenus utiles et actionnables pour progresser sur les sujets educatifs, l'insertion professionnelle et l'accompagnement en entreprise.",
    seoTitle: "Blog AKConseil | Conseils educatifs, insertion et coaching",
    seoDescription:
      "3 articles de fond pour avancer sur les enjeux educatifs, l'orientation professionnelle et la performance des equipes.",
    posts: [
      {
        slug: "accompagner-adolescent-difficulte-scolaire",
        title:
          "Accompagner un adolescent en difficulte scolaire : methode concrete en 7 etapes",
        metaTitle:
          "Difficulte scolaire adolescent : methode concrete en 7 etapes | AKC Gestion Conseils",
        metaDescription:
          "Un guide pratique pour aider un adolescent en difficulte scolaire : dialogue, organisation, motivation et coordination avec l'ecole.",
        excerpt:
          "Un cadre clair pour aider un adolescent en perte de motivation scolaire, sans conflit permanent ni culpabilite.",
        category: "Educatif",
        imageKey: "illusEducation",
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
        metaTitle:
          "Reconversion professionnelle : plan d'action 90 jours | AKC Gestion Conseils",
        metaDescription:
          "Un plan simple et efficace pour reussir sa reconversion professionnelle en 90 jours : clarifier son projet, valider son marche et passer a l'action.",
        excerpt:
          "Passez de l'idee a un vrai projet professionnel avec une feuille de route pragmatique en trois phases.",
        category: "Insertion",
        imageKey: "illusInsertion",
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
              "Realiser 5 a 10 entretiens exploratoires.",
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
        title:
          "Coaching en entreprise : 5 leviers pour performance durable et bien-etre",
        metaTitle:
          "Coaching en entreprise : 5 leviers de performance durable | AKC Gestion Conseils",
        metaDescription:
          "Comment le coaching en entreprise ameliore cohesion, leadership, communication et engagement des equipes de maniere durable.",
        excerpt:
          "Le coaching en entreprise n'est pas un luxe : c'est un levier concret pour aligner performance, cohesion et qualite de vie au travail.",
        category: "Professionnel",
        imageKey: "illusCoaching",
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
    ],
    notFoundTitle: "Article introuvable",
    notFoundDescription:
      "Le contenu demande n'est pas disponible. Vous pouvez consulter les autres articles du blog.",
    backToBlogLabel: "Retour au blog",
    articleCtaTitle: "Besoin d'un accompagnement personnalise ?",
    articleCtaDescription:
      "AKC Gestion Conseils vous aide a transformer ces recommandations en plan d'action adapte a votre situation.",
    articleCtaLabel: "Prendre rendez-vous",
  },
};
