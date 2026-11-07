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
  gallery?: Image[];
  credits?: { role: Localized; name: string }[];
};

// Image d'exemple aléatoire (Lorem Picsum), le temps d'avoir les vrais visuels.
function exampleImage(seed: string, width = 1600, height = 1000): Image {
  return {
    src: `https://picsum.photos/seed/${seed}/${width}/${height}`,
    width,
    height,
    alt: { fr: "Image d'exemple", en: "Placeholder image" },
  };
}

function exampleProject(
  slug: string,
  category: ProjectCategory,
  year: number,
  title: Localized,
  summary: Localized,
): Project {
  return {
    slug,
    title,
    category,
    year,
    client: "Client",
    role: { fr: "Réalisation, montage", en: "Direction, editing" },
    summary,
    description: {
      fr: ["Texte détaillé du projet : contexte, intention, réalisation."],
      en: ["Detailed project text: context, intent, execution."],
    },
    cover: exampleImage(slug),
    gallery: category === "photo" ? [1, 2, 3, 4].map((i) => exampleImage(`${slug}-${i}`, 1200, 1500)) : undefined,
  };
}

// Projets d'exemple avec images aléatoires, à remplacer par les vrais projets.
// L'ordre du tableau est l'ordre d'affichage.
export const projects: Project[] = [
  exampleProject("film-de-marque", "video", 2026,
    { fr: "Film de marque", en: "Brand film" },
    { fr: "Un film de 90 secondes pour une marque de mode lyonnaise.", en: "A 90-second film for a Lyon fashion brand." }),
  exampleProject("aftermovie-festival", "video", 2025,
    { fr: "Aftermovie de festival", en: "Festival aftermovie" },
    { fr: "Trois jours de tournage multicam, montage livré en 72 h.", en: "Three days of multicam shooting, edit delivered in 72 h." }),
  exampleProject("portraits-artistes", "photo", 2025,
    { fr: "Portraits d'artistes", en: "Artist portraits" },
    { fr: "Une série de portraits en lumière naturelle.", en: "A series of natural-light portraits." }),
  exampleProject("habillage-anime", "motion", 2025,
    { fr: "Habillage animé", en: "Motion package" },
    { fr: "Génériques et titres animés pour une série web.", en: "Animated titles and openers for a web series." }),
  exampleProject("concert-live", "photo", 2024,
    { fr: "Concert live", en: "Live concert" },
    { fr: "Couverture photo d'une tournée de concerts.", en: "Photo coverage of a concert tour." }),
  exampleProject("clip-musical", "video", 2024,
    { fr: "Clip musical", en: "Music video" },
    { fr: "Clip tourné en une nuit dans les rues de Lyon.", en: "A music video shot in one night in the streets of Lyon." }),
  exampleProject("logo-anime", "motion", 2024,
    { fr: "Logo animé", en: "Logo animation" },
    { fr: "Animation de logo pour une agence de communication.", en: "Logo animation for a communications agency." }),
  exampleProject("reportage-food", "photo", 2023,
    { fr: "Reportage food", en: "Food story" },
    { fr: "Photos de plats et d'équipe pour un restaurant.", en: "Dish and team photos for a restaurant." }),
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
