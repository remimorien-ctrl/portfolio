import type { Locale } from "./i18n";

// Textes fixes de l'interface. Le contenu (projets, bio…) est dans site.ts et projects.ts.
const fr = {
  nav: {
    home: "Accueil",
    projects: "Projets",
    about: "À propos",
    contact: "Contact",
  },
  home: {
    showreel: "Showreel",
    featured: "Projets à la une",
    allProjects: "Voir tous les projets",
    ctaTitle: "Un projet en tête ?",
    ctaButton: "Me contacter",
  },
  projects: {
    title: "Projets",
    intro: "Une sélection de mes réalisations en vidéo, photo et motion design.",
    all: "Tous",
    empty: "Aucun projet dans cette catégorie pour le moment.",
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
  about: {
    title: "À propos",
    services: "Services",
    clients: "Ils m'ont fait confiance",
  },
  contact: {
    title: "Contact",
    intro: "Pour un devis, une collaboration ou simplement une question, écrivez-moi.",
    email: "Email",
    socials: "Réseaux",
  },
  footer: {
    rights: "Tous droits réservés.",
  },
  languageSwitcher: "Changer de langue",
};

export type Dictionary = typeof fr;

const en: Dictionary = {
  nav: {
    home: "Home",
    projects: "Work",
    about: "About",
    contact: "Contact",
  },
  home: {
    showreel: "Showreel",
    featured: "Featured work",
    allProjects: "See all projects",
    ctaTitle: "Have a project in mind?",
    ctaButton: "Get in touch",
  },
  projects: {
    title: "Work",
    intro: "A selection of my video, photography and motion design work.",
    all: "All",
    empty: "No projects in this category yet.",
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
  about: {
    title: "About",
    services: "Services",
    clients: "Clients",
  },
  contact: {
    title: "Contact",
    intro: "For a quote, a collaboration or just a question, drop me a line.",
    email: "Email",
    socials: "Social",
  },
  footer: {
    rights: "All rights reserved.",
  },
  languageSwitcher: "Change language",
};

const dictionaries: Record<Locale, Dictionary> = { fr, en };

export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}
