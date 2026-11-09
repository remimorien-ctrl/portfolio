import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faInstagram,
  faLinkedin,
  faVimeoV,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import type { Localized } from "./i18n";

type Social = {
  label: string;
  url: string;
  icon: IconDefinition;
};

/**
 * Showreel en fond de l'accueil, lu en boucle et sans le son.
 * - "file" : fichier MP4 dans /public (le plus fiable : pas de logo ni de boutons de lecteur)
 * - "vimeo" : vidéo Vimeo en mode arrière-plan
 */
export type Showreel =
  | { kind: "file"; src: string; poster?: string }
  | { kind: "vimeo"; id: string };

type Site = {
  firstName: string;
  lastName: string;
  /** URL de production (sitemap, balises SEO). */
  url: string;
  email: string;
  /** Affiché seulement s'il est renseigné. */
  phone?: string;
  location: Localized;
  role: Localized;
  description: Localized;
  /** Étiquettes sous le nom (comme sur le CV). */
  tags: Localized<string[]>;
  /** Mise en avant de la disponibilité. Masquée si absente. */
  availability?: Localized;
  showreel?: Showreel;
  /** CV en PDF dans /public, par langue. Le bouton est masqué si absent. */
  cv?: Partial<Localized>;
  /** Un réseau dont l'URL est vide n'est pas affiché. */
  socials: Social[];
};

export const site: Site = {
  firstName: "Rémi",
  lastName: "Morien",
  url: "https://remimorien.com",
  email: "remi.morien@gmail.com",
  phone: "+33 7 77 72 73 85",
  location: {
    fr: "Paris · mobile partout en France",
    en: "Paris, France · willing to relocate",
  },
  role: {
    fr: "Vidéaste, photographe & motion designer",
    en: "Filmmaker, photographer & motion designer",
  },
  description: {
    fr: "Rémi Morien, vidéaste, photographe et motion designer basé à Paris. Portfolio, parcours et contact.",
    en: "Rémi Morien, filmmaker, photographer and motion designer based in Paris, France. Portfolio, experience and contact.",
  },
  tags: {
    fr: ["Vidéaste", "Photographe", "6 ans d'expérience"],
    en: ["Filmmaker", "Photographer", "6 years' experience"],
  },
  availability: {
    fr: "Disponible · CDI",
    en: "Open to full-time roles",
  },
  // CV en français uniquement pour l'instant : le bouton est masqué sur la version anglaise.
  cv: { fr: "/cv-remi-morien.pdf" },
  socials: [
    { label: "Instagram", url: "", icon: faInstagram },
    { label: "Vimeo", url: "", icon: faVimeoV },
    { label: "YouTube", url: "", icon: faYoutube },
    { label: "LinkedIn", url: "", icon: faLinkedin },
  ],
};

export const fullName = `${site.firstName} ${site.lastName}`;

export const activeSocials = site.socials.filter((s) => s.url);
