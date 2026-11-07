import type { Locale } from "./i18n";

// Textes fixes de l'interface. Le contenu est dans site.ts, profile.ts et projects.ts.
const fr = {
  nav: {
    work: "Projets",
    about: "Moi",
    experience: "Parcours",
    skills: "Compétences",
    contact: "Contact",
  },
  hero: {
    seeWork: "Voir mes projets",
    downloadCv: "Télécharger mon CV",
  },
  work: {
    title: "Projets",
    intro: "Une sélection de mes réalisations en vidéo, photo et motion design.",
    all: "Tous",
    empty: "Aucun projet dans cette catégorie pour le moment.",
  },
  about: {
    title: "Moi",
  },
  experience: {
    title: "Parcours",
  },
  skills: {
    title: "Compétences",
    software: "Logiciels",
    gear: "Matériel",
    more: "Et aussi",
  },
  contact: {
    title: "Travaillons ensemble",
    intro: "Je cherche un poste en CDI dans une équipe créative. Écrivez-moi, je réponds vite.",
    email: "Email",
    phone: "Téléphone",
    location: "Basé à",
    downloadCv: "Télécharger mon CV",
  },
  project: {
    client: "Client",
    year: "Année",
    category: "Catégorie",
    role: "Rôle",
    credits: "Crédits",
    previous: "Projet précédent",
    next: "Projet suivant",
    back: "Tous les projets",
  },
  footer: {
    rights: "Tous droits réservés.",
  },
  menu: "Menu",
  languageSwitcher: "Changer de langue",
};

export type Dictionary = typeof fr;

const en: Dictionary = {
  nav: {
    work: "Work",
    about: "About",
    experience: "Experience",
    skills: "Skills",
    contact: "Contact",
  },
  hero: {
    seeWork: "See my work",
    downloadCv: "Download my resume",
  },
  work: {
    title: "Work",
    intro: "A selection of my video, photography and motion design work.",
    all: "All",
    empty: "No projects in this category yet.",
  },
  about: {
    title: "About",
  },
  experience: {
    title: "Experience",
  },
  skills: {
    title: "Skills",
    software: "Software",
    gear: "Gear",
    more: "Also",
  },
  contact: {
    title: "Let's work together",
    intro: "I'm looking for a full-time position in a creative team. Drop me a line, I reply fast.",
    email: "Email",
    phone: "Phone",
    location: "Based in",
    downloadCv: "Download my resume",
  },
  project: {
    client: "Client",
    year: "Year",
    category: "Category",
    role: "Role",
    credits: "Credits",
    previous: "Previous project",
    next: "Next project",
    back: "All projects",
  },
  footer: {
    rights: "All rights reserved.",
  },
  menu: "Menu",
  languageSwitcher: "Change language",
};

const dictionaries: Record<Locale, Dictionary> = { fr, en };

export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}
