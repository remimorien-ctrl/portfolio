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

// Données d'exemple, à remplacer par les vrais projets.
// L'ordre du tableau est l'ordre d'affichage.
export const projects: Project[] = [
  {
    slug: "projet-video-exemple",
    title: { fr: "Projet vidéo (exemple)", en: "Video project (example)" },
    category: "video",
    year: 2026,
    client: "Client",
    role: { fr: "Réalisation, montage", en: "Direction, editing" },
    summary: { fr: "Description courte du projet.", en: "Short project description." },
    description: {
      fr: ["Texte détaillé du projet : contexte, intention, réalisation."],
      en: ["Detailed project text: context, intent, execution."],
    },
    featured: true,
  },
  {
    slug: "projet-photo-exemple",
    title: { fr: "Projet photo (exemple)", en: "Photo project (example)" },
    category: "photo",
    year: 2026,
    summary: { fr: "Description courte du projet.", en: "Short project description." },
    featured: true,
  },
  {
    slug: "projet-motion-exemple",
    title: { fr: "Projet motion design (exemple)", en: "Motion design project (example)" },
    category: "motion",
    year: 2025,
    summary: { fr: "Description courte du projet.", en: "Short project description." },
    featured: true,
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
