import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faInstagram,
  faLinkedin,
  faVimeoV,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import type { Localized } from "./i18n";
import type { Image, Video } from "./projects";

type Social = {
  label: string;
  url: string;
  icon: IconDefinition;
};

type Site = {
  name: string;
  /** URL de production (sitemap, balises SEO). À mettre à jour une fois le domaine connu. */
  url: string;
  email: string;
  role: Localized;
  description: Localized;
  /** Showreel affiché en page d'accueil (masqué si absent). */
  showreel?: Video;
  about: {
    bio: Localized<string[]>;
    portrait?: Image;
    services: Localized<string[]>;
    clients: string[];
  };
  /** Un réseau dont l'URL est vide n'est pas affiché. */
  socials: Social[];
};

export const site: Site = {
  name: "Rémi Morien",
  url: "https://example.com",
  email: "remi.morien@gmail.com",
  role: {
    fr: "Vidéaste, photographe & motion designer",
    en: "Filmmaker, photographer & motion designer",
  },
  description: {
    fr: "Portfolio de Rémi Morien : vidéo, photographie et motion design.",
    en: "Rémi Morien's portfolio: video, photography and motion design.",
  },
  about: {
    bio: {
      fr: ["Texte de présentation à rédiger : parcours, approche, ce qui vous anime."],
      en: ["Bio to be written: background, approach, what drives you."],
    },
    services: {
      fr: ["Réalisation vidéo", "Photographie", "Motion design", "Montage & étalonnage"],
      en: ["Video production", "Photography", "Motion design", "Editing & colour grading"],
    },
    clients: [],
  },
  socials: [
    { label: "Instagram", url: "", icon: faInstagram },
    { label: "Vimeo", url: "", icon: faVimeoV },
    { label: "YouTube", url: "", icon: faYoutube },
    { label: "LinkedIn", url: "", icon: faLinkedin },
  ],
};

export const activeSocials = site.socials.filter((s) => s.url);
