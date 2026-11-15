import type { Locale, Localized } from "./i18n";

export const categories = ["video", "photo", "motion"] as const;
export type ProjectCategory = (typeof categories)[number];

export const categoryLabels: Record<ProjectCategory, Localized> = {
  video: { fr: "Vidéo", en: "Video" },
  photo: { fr: "Photo", en: "Photography" },
  motion: { fr: "Motion design", en: "Motion design" },
};

/** Vidéo hébergée sur YouTube ou Vimeo : seul l'identifiant est stocké. */
export type Video = {
  provider: "youtube" | "vimeo";
  id: string;
  /** Format vertical 9:16 (Shorts, Reels). */
  vertical?: boolean;
  /** Légende affichée sous la vidéo quand un projet en contient plusieurs. */
  label?: Localized;
};

export type Image = {
  /** Chemin dans /public, ex. "/projects/mon-projet/cover.jpg" */
  src: string;
  width: number;
  height: number;
  alt: Localized;
};

export type Project = {
  /** Identifiant d'URL, commun aux deux langues : /fr/projects/<slug> et /en/projects/<slug> */
  slug: string;
  title: Localized;
  category: ProjectCategory;
  year: number;
  client?: string;
  role?: Localized;
  summary: Localized;
  description?: Localized<string[]>;
  /** Mis en avant sur la page d'accueil */
  featured?: boolean;
  cover?: Image;
  video?: Video;
  /** Plusieurs vidéos (série, épisodes) : remplace `video`. */
  videos?: Video[];
  gallery?: Image[];
  credits?: { role: Localized; name: string }[];
};

/** Vidéo YouTube. */
function yt(id: string, opts: { vertical?: boolean; label?: Localized } = {}): Video {
  return { provider: "youtube", id, ...opts };
}

/** Miniature YouTube (1280 × 720) en attendant des visuels maison. */
function ytCover(id: string, alt: Localized): Image {
  return { src: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`, width: 1280, height: 720, alt };
}

/** Miniature verticale d'un Short YouTube (9:16) : la vignette du projet s'affiche alors en portrait. */
function ytVerticalCover(id: string, alt: Localized, size: { width: number; height: number } = { width: 948, height: 1687 }): Image {
  return { src: `https://i.ytimg.com/vi/${id}/oardefault.jpg`, ...size, alt };
}

/** Rémi gère chaque projet de A à Z. */
const ROLE_VIDEO: Localized = {
  fr: "Conception, réalisation, tournage, montage, étalonnage, motion design",
  en: "Concept, direction, filming, editing, colour grading, motion design",
};

// L'ordre du tableau est l'ordre d'affichage.
export const projects: Project[] = [
  {
    slug: "24h-chrono-kevin-louis",
    title: { fr: "24h Chrono – Kévin Louis", en: "24h Chrono – Kévin Louis" },
    category: "video",
    year: 2026,
    client: "Avenir Rénovations",
    role: ROLE_VIDEO,
    summary: {
      fr: "Une journée entière dans la peau d'un franchisé en Alsace, à la tête de deux agences.",
      en: "A full day in the shoes of a franchisee in Alsace who runs two agencies.",
    },
    description: {
      fr: [
        "Épisode de la série « 24h Chrono, dans la peau d'un franchisé » : un format documentaire d'une trentaine de minutes qui suit Kévin Louis du premier rendez-vous client jusqu'au soir, entre chantiers, équipe et gestion de ses deux agences.",
      ],
      en: [
        "An episode of the “24h Chrono” series: a 30-minute documentary format following Kévin Louis from his first client meeting until the evening, between building sites, his team and running two agencies.",
      ],
    },
    featured: true,
    video: yt("j7XPq2DYCH4"),
    cover: ytCover("j7XPq2DYCH4", { fr: "Kévin Louis sur un chantier", en: "Kévin Louis on a building site" }),
  },
  {
    slug: "naissance-artibox",
    title: { fr: "La naissance d'ArtiBox", en: "The birth of ArtiBox" },
    category: "video",
    year: 2024,
    client: "ArtiBox · Avenir Rénovations",
    role: ROLE_VIDEO,
    summary: {
      fr: "Film documentaire sur la création d'ArtiBox, la plateforme qui connecte artisans et entreprises du bâtiment.",
      en: "A documentary about the making of ArtiBox, the platform connecting tradespeople and construction companies.",
    },
    description: {
      fr: [
        "Un documentaire d'une douzaine de minutes qui retrace l'histoire du projet, de sa genèse à son lancement : les défis rencontrés, les équipes qui l'ont porté et l'impact attendu sur le secteur du bâtiment.",
      ],
      en: [
        "A twelve-minute documentary tracing the project from its genesis to its launch: the challenges, the teams behind it and its expected impact on the construction industry.",
      ],
    },
    featured: true,
    video: yt("1H4Jmd9ai7g"),
    cover: ytCover("1H4Jmd9ai7g", { fr: "Documentaire ArtiBox", en: "ArtiBox documentary" }),
  },
  {
    slug: "soyons-franchises",
    title: { fr: "Soyons Franchisés", en: "Soyons Franchisés" },
    category: "video",
    year: 2026,
    client: "Avenir Rénovations",
    role: ROLE_VIDEO,
    summary: {
      fr: "Série de portraits de franchisés au format vertical, pour les réseaux sociaux.",
      en: "A series of vertical franchisee portraits for social media.",
    },
    description: {
      fr: [
        "Chaque épisode donne la parole à un entrepreneur du réseau : ses doutes au départ, ses premiers mois, ce qui a fait la différence. Interviews, plans d'illustration et montage rythmé pour Instagram, TikTok et YouTube Shorts.",
      ],
      en: [
        "Each episode gives the floor to an entrepreneur from the network: early doubts, first months, what made the difference. Interviews, B-roll and punchy editing for Instagram, TikTok and YouTube Shorts.",
      ],
    },
    videos: [
      yt("MRCvNmf3FNY", { vertical: true, label: { fr: "Alizée, 5 mois après son lancement", en: "Alizée, five months in" } }),
      yt("sfNazWBHiqI", { vertical: true, label: { fr: "Florent Dias, premier franchisé au Luxembourg", en: "Florent Dias, first franchisee in Luxembourg" } }),
    ],
    cover: ytVerticalCover("MRCvNmf3FNY", { fr: "Portrait d'Alizée", en: "Portrait of Alizée" }),
  },
  {
    slug: "24h-chrono-antoine-meteyer",
    title: { fr: "24h Chrono – Antoine Meteyer", en: "24h Chrono – Antoine Meteyer" },
    category: "video",
    year: 2026,
    client: "Avenir Rénovations",
    role: ROLE_VIDEO,
    summary: {
      fr: "Une journée avec un franchisé entre ses agences d'Angoulême et de Guéret.",
      en: "A day with a franchisee between his agencies in Angoulême and Guéret.",
    },
    description: {
      fr: [
        "Un autre épisode de « 24h Chrono » : 25 minutes de documentaire au plus près du quotidien d'Antoine Meteyer, d'une agence à l'autre.",
      ],
      en: [
        "Another “24h Chrono” episode: 25 minutes of documentary close to Antoine Meteyer's daily life, from one agency to the next.",
      ],
    },
    video: yt("6JiqYw4QPfs"),
    cover: ytCover("6JiqYw4QPfs", { fr: "Antoine Meteyer", en: "Antoine Meteyer" }),
  },
  {
    slug: "mais-cest-qui",
    title: { fr: "Mais c'est qui ?", en: "Mais c'est qui ?" },
    category: "video",
    year: 2026,
    client: "Avenir Rénovations",
    role: ROLE_VIDEO,
    summary: {
      fr: "Série verticale qui présente les visages du siège, un collaborateur à la fois.",
      en: "A vertical series introducing the people at headquarters, one at a time.",
    },
    description: {
      fr: [
        "Un format court et incarné pour faire connaître les équipes de la tête de réseau : interview sur fond coloré, habillage graphique et plans de situation.",
      ],
      en: [
        "A short, personal format to introduce the headquarters teams: interview on a coloured backdrop, graphic package and on-the-job shots.",
      ],
    },
    videos: [
      yt("MpOZI6Nq3kk", { vertical: true, label: { fr: "Laurent, référent technique", en: "Laurent, technical lead" } }),
      yt("56qR0MI7DRs", { vertical: true, label: { fr: "Sabrina, traffic manager SEA", en: "Sabrina, SEA traffic manager" } }),
    ],
    cover: ytVerticalCover("MpOZI6Nq3kk", { fr: "Portrait de Laurent", en: "Portrait of Laurent" }),
  },
  {
    slug: "realisations-chantiers",
    title: { fr: "Réalisations chantiers", en: "Renovation showcases" },
    category: "video",
    year: 2025,
    client: "Avenir Rénovations",
    role: ROLE_VIDEO,
    summary: {
      fr: "Visites de rénovations terminées, racontées par les clients, au format Reels et Shorts.",
      en: "Tours of finished renovations, told by the clients, for Reels and Shorts.",
    },
    description: {
      fr: [
        "Des vidéos de style « Real Estate » : mouvements fluides au stabilisateur, lumière naturelle et témoignage du client pour mettre en valeur le résultat des travaux.",
      ],
      en: [
        "Real estate-style videos: smooth gimbal moves, natural light and the client's own words to showcase the finished work.",
      ],
    },
    videos: [
      yt("cPlyNpOpCk8", { vertical: true, label: { fr: "Maison savoyarde, Annecy", en: "Savoyard house, Annecy" } }),
      yt("algKvQ-8YQw", { vertical: true, label: { fr: "L'appartement de Fabien", en: "Fabien's apartment" } }),
      yt("C5Mtv0WjWKM", { vertical: true, label: { fr: "Chez Anne-Élise, près de Bordeaux", en: "Anne-Élise's home, near Bordeaux" } }),
    ],
    cover: ytVerticalCover("cPlyNpOpCk8", { fr: "Maison rénovée", en: "Renovated house" }),
  },
  {
    slug: "artitour",
    title: { fr: "ArtiTour", en: "ArtiTour" },
    category: "video",
    year: 2025,
    client: "ArtiBox",
    role: ROLE_VIDEO,
    summary: {
      fr: "Les rencontres entre artisans et donneurs d'ordres ArtiBox, de ville en ville, en format vertical.",
      en: "ArtiBox meet-ups between tradespeople and contractors, city by city, in vertical format.",
    },
    description: {
      fr: [
        "Couverture des étapes de l'ArtiTour, la tournée qui présente la plateforme ArtiBox aux artisans locaux : ambiance, témoignages et moments d'échange, montés en formats courts pour les réseaux sociaux.",
      ],
      en: [
        "Coverage of the ArtiTour, the roadshow introducing the ArtiBox platform to local tradespeople: atmosphere, testimonials and networking moments, cut into short formats for social media.",
      ],
    },
    videos: [
      yt("wgLBiQ0QUv8", { vertical: true, label: { fr: "Annecy", en: "Annecy" } }),
      yt("0Lh1PdnN8bQ", { vertical: true, label: { fr: "Chartres", en: "Chartres" } }),
      yt("212tTs6Zryw", { vertical: true, label: { fr: "Bordeaux", en: "Bordeaux" } }),
    ],
    cover: ytVerticalCover("wgLBiQ0QUv8", { fr: "ArtiTour à Annecy", en: "ArtiTour in Annecy" }, { width: 1080, height: 1920 }),
  },
  {
    slug: "franchising-belgium-2026",
    title: { fr: "Franchising Belgium 2026", en: "Franchising Belgium 2026" },
    category: "video",
    year: 2026,
    client: "Avenir Rénovations",
    role: ROLE_VIDEO,
    summary: {
      fr: "Retour en images sur le salon de la franchise en Belgique et ses premiers résultats.",
      en: "A recap of the Belgian franchise fair and its first results.",
    },
    description: {
      fr: ["Couverture de l'événement et montage du bilan : ambiance du stand, rencontres avec les porteurs de projet et chiffres clés."],
      en: ["Event coverage and recap edit: booth atmosphere, meetings with prospective franchisees and key figures."],
    },
    video: yt("9ouREFv4EfA"),
    cover: ytCover("9ouREFv4EfA", { fr: "Stand Avenir Rénovations", en: "Avenir Rénovations booth" }),
  },
  {
    slug: "franchise-expo-paris-2026",
    title: { fr: "Franchise Expo Paris 2026", en: "Franchise Expo Paris 2026" },
    category: "video",
    year: 2026,
    client: "Avenir Rénovations",
    role: ROLE_VIDEO,
    summary: {
      fr: "Quatre jours de salon à la porte de Versailles, résumés en deux minutes et demie.",
      en: "Four days at the Paris franchise fair, summed up in two and a half minutes.",
    },
    description: {
      fr: ["Captation sur le stand pendant tout le salon et montage du film bilan : rencontres avec les porteurs de projet, échanges avec l'équipe et chiffres clés de l'événement."],
      en: ["Filming on the booth throughout the fair and editing the recap film: meetings with prospective franchisees, the team at work and the event's key figures."],
    },
    video: yt("gvfeBfkkzY8"),
    cover: ytCover("gvfeBfkkzY8", { fr: "Franchise Expo Paris", en: "Franchise Expo Paris" }),
  },
  {
    slug: "bref-entreprendre-seul",
    title: { fr: "Bref. J'ai essayé d'entreprendre seul", en: "Bref. I tried to go it alone" },
    category: "video",
    year: 2025,
    client: "Avenir Rénovations",
    role: ROLE_VIDEO,
    summary: {
      fr: "Une fiction courte façon « Bref » sur les galères de l'entrepreneur solitaire.",
      en: "A short fiction in the style of “Bref” about the struggles of going it alone.",
    },
    description: {
      fr: ["Une minute, un rythme effréné et beaucoup d'autodérision : pas de clients, pas de visibilité, une montagne de paperasse… jusqu'à la rencontre avec le réseau."],
      en: ["One minute, a frantic pace and plenty of self-mockery: no clients, no visibility, a mountain of paperwork… until he meets the network."],
    },
    video: yt("urMrgJgsvWA"),
    cover: ytCover("urMrgJgsvWA", { fr: "Bref. J'ai essayé d'entreprendre seul", en: "Bref. I tried to go it alone" }),
  },
  {
    slug: "team-building-2026",
    title: { fr: "Olympiades – Team Building 2026", en: "Olympics – Team Building 2026" },
    category: "video",
    year: 2026,
    client: "Avenir Rénovations",
    role: ROLE_VIDEO,
    summary: {
      fr: "Six équipes, une coupe et un réseau soudé : le film des Olympiades internes.",
      en: "Six teams, one trophy and a close-knit network: the in-house Olympics film.",
    },
    description: {
      fr: ["Une journée de compétitions sportives entre collaborateurs, filmée au plus près de l'action, avec un montage rythmé qui met en avant l'entraide et l'esprit d'équipe."],
      en: ["A day of sports challenges between colleagues, filmed close to the action and cut at a fast pace to highlight teamwork and team spirit."],
    },
    video: yt("FJoqlLjhd8M"),
    cover: ytCover("FJoqlLjhd8M", { fr: "Olympiades Avenir Rénovations", en: "Avenir Rénovations Olympics" }),
  },
  {
    slug: "en-avant-lequipe-animateurs",
    title: { fr: "En avant l'équipe ! – Les animateurs", en: "En avant l'équipe ! – The network coaches" },
    category: "video",
    year: 2023,
    client: "Avenir Rénovations",
    role: ROLE_VIDEO,
    summary: {
      fr: "Premier épisode d'une websérie qui présente les équipes du siège, ici les animateurs réseau.",
      en: "The first episode of a web series introducing the headquarters teams, starting with the network coaches.",
    },
    description: {
      fr: ["Interviews et images de terrain pour montrer le rôle des animateurs qui accompagnent les franchisés au quotidien."],
      en: ["Interviews and field footage showing the role of the coaches who support franchisees day to day."],
    },
    video: yt("byCirbWxnLU"),
    cover: ytCover("byCirbWxnLU", { fr: "Les animateurs réseau", en: "The network coaches" }),
  },
  {
    slug: "facecam-entreprendre",
    title: { fr: "FaceCam – Entreprendre, ce n'est pas pour moi ?", en: "FaceCam – Entrepreneurship isn't for me?" },
    category: "video",
    year: 2026,
    client: "Avenir Rénovations",
    role: ROLE_VIDEO,
    summary: {
      fr: "Format face caméra pour les réseaux sociaux, court et direct.",
      en: "A short, direct face-to-camera format for social media.",
    },
    video: yt("GIfSHi-37lQ", { vertical: true }),
    cover: ytVerticalCover("GIfSHi-37lQ", { fr: "Face caméra", en: "Face to camera" }),
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const featuredProjects = projects.filter((p) => p.featured);

/** Projets voisins dans la liste, pour la navigation précédent / suivant. */
export function getAdjacentProjects(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return {
    previous: i > 0 ? projects[i - 1] : undefined,
    next: i >= 0 && i < projects.length - 1 ? projects[i + 1] : undefined,
  };
}

/** Projet traduit dans une langue, en données simples transmissibles à un composant client. */
export function localizeProject(p: Project, lang: Locale) {
  return {
    slug: p.slug,
    title: p.title[lang],
    category: p.category,
    categoryLabel: categoryLabels[p.category][lang],
    year: p.year,
    summary: p.summary[lang],
    cover: p.cover && { ...p.cover, alt: p.cover.alt[lang] },
  };
}

export type LocalizedProject = ReturnType<typeof localizeProject>;
