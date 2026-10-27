export type ProjectCategory = "video" | "photo" | "motion";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  year: number;
  client?: string;
  summary: string;
  /** Image de couverture, chemin dans /public */
  cover?: string;
  /** Lien d'intégration (YouTube / Vimeo) pour les projets vidéo et motion */
  videoUrl?: string;
};

export const categoryLabels: Record<ProjectCategory, string> = {
  video: "Vidéo",
  photo: "Photo",
  motion: "Motion design",
};

// Données d'exemple, à remplacer par les vrais projets.
export const projects: Project[] = [
  {
    slug: "projet-video-exemple",
    title: "Projet vidéo (exemple)",
    category: "video",
    year: 2026,
    summary: "Description courte du projet.",
  },
  {
    slug: "projet-photo-exemple",
    title: "Projet photo (exemple)",
    category: "photo",
    year: 2026,
    summary: "Description courte du projet.",
  },
  {
    slug: "projet-motion-exemple",
    title: "Projet motion design (exemple)",
    category: "motion",
    year: 2026,
    summary: "Description courte du projet.",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
