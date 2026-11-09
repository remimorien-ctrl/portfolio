import type { Localized } from "./i18n";

// Contenu « CV » du site : présentation, parcours, compétences.
// Repris du CV (public/cv-remi-morien.pdf).

export const about = {
  /** Accroche : la partie `highlight` est mise en couleur. */
  headline: {
    fr: { before: "Je raconte des histoires ", highlight: "en images fixes et animées", after: ", du repérage jusqu'à l'étalonnage final." },
    en: { before: "I tell stories ", highlight: "in still and moving images", after: ", from location scouting to the final grade." },
  } satisfies Localized<{ before: string; highlight: string; after: string }>,
  bio: {
    fr: [
      "Vidéaste et photographe, je travaille pour des marques, des particuliers et pour des événements. J'aime la lumière naturelle, les plans qui respirent et les montages qui vont droit au but.",
      "Je sais m'adapter à mon entourage et à l'imprévu.",
    ],
    en: [
      "As a filmmaker and photographer, I work with brands, private clients and events. I love natural light, shots that breathe and edits that get straight to the point.",
      "I adapt easily to the people around me and to the unexpected.",
    ],
  } satisfies Localized<string[]>,
  /** Photo de la page « Moi » (détourée, posée sur le dégradé du logo). */
  photo: "/remi-morien-portrait.webp",
  qualities: [
    {
      title: { fr: "Œil", en: "Eye" },
      text: { fr: "Le bon cadre, vite, même en direct.", en: "The right frame, fast, even live." },
    },
    {
      title: { fr: "Autonomie", en: "Autonomy" },
      text: { fr: "De l'intention à la livraison.", en: "From brief to delivery." },
    },
    {
      title: { fr: "Relationnel", en: "People skills" },
      text: {
        fr: "Tout le monde n'est pas acteur, je sais mettre les gens à l'aise.",
        en: "Not everyone is an actor: I know how to put people at ease.",
      },
    },
    {
      title: { fr: "Délais", en: "Deadlines" },
      text: {
        fr: "Chaque projet a ses délais, et je sais y répondre quand il le faut.",
        en: "Every project has its deadlines, and I deliver when it counts.",
      },
    },
  ] satisfies { title: Localized; text: Localized }[],
};

export type Track = "job" | "freelance" | "education";

export const trackLabels: Record<Track, Localized> = {
  job: { fr: "Emploi", en: "Job" },
  freelance: { fr: "Freelance", en: "Freelance" },
  education: { fr: "Formation", en: "Education" },
};

export type Experience = {
  track: Track;
  period: Localized;
  title: Localized;
  company: Localized;
  points: Localized<string[]>;
};

/** Dans l'ordre du CV. */
export const experiences: Experience[] = [
  {
    track: "freelance",
    period: { fr: "2023 – auj.", en: "2023 – now" },
    title: { fr: "Vidéaste & photographe freelance", en: "Freelance filmmaker & photographer" },
    company: { fr: "Indépendant · Paris et mobile en France", en: "Self-employed · Paris and across France" },
    points: {
      fr: [
        "Films et photographie de mariage et autres événements familiaux.",
        "Portraits et sessions photo de particuliers et de professionnels.",
      ],
      en: [
        "Wedding and family event films and photography.",
        "Portraits and photo sessions for private and professional clients.",
      ],
    },
  },
  {
    track: "job",
    period: { fr: "2023 – auj.", en: "2023 – now" },
    title: { fr: "Vidéaste & photographe", en: "Filmmaker & photographer" },
    company: { fr: "Avenir Rénovations · Collégien · CDI", en: "Avenir Rénovations · Collégien, France · Full-time" },
    points: {
      fr: [
        "Contenus BtoB vidéo et photo pour développer la franchise en France et à l'international.",
        "Couverture des événements internes et externes de l'entreprise et des marques du groupe.",
        "Portraits corporate des collaborateurs et des partenaires.",
        "Réalisation de vidéos style « Real Estate » en format Reels et Shorts.",
      ],
      en: [
        "B2B video and photo content to grow the franchise in France and abroad.",
        "Coverage of internal and external events for the company and the group's brands.",
        "Corporate portraits of employees and partners.",
        "Real estate-style videos for Reels and Shorts.",
      ],
    },
  },
  {
    track: "job",
    period: { fr: "2022 – 2023", en: "2022 – 2023" },
    title: { fr: "Graphiste", en: "Graphic designer" },
    company: { fr: "REPA Group · Tourcoing", en: "REPA Group · Tourcoing, France" },
    points: {
      fr: ["Création, déclinaison et livraison de créations graphiques sur différents médias."],
      en: ["Designed, adapted and delivered graphic work across a range of media."],
    },
  },
  {
    track: "job",
    period: { fr: "2020 – 2022", en: "2020 – 2022" },
    title: { fr: "Designer multimédia en alternance", en: "Multimedia designer (work-study)" },
    company: { fr: "Mutuelle Just · Valenciennes", en: "Mutuelle Just · Valenciennes, France" },
    points: {
      fr: [
        "Réflexion, organisation, tournage et montage de vidéos pour l'interne et l'externe.",
        "Création de différents supports de communication, en accord avec l'équipe communication.",
      ],
      en: [
        "Planned, organised, shot and edited videos for internal and external audiences.",
        "Designed a range of communication materials together with the communications team.",
      ],
    },
  },
  {
    track: "education",
    period: { fr: "2017 – 2022", en: "2017 – 2022" },
    title: { fr: "Master Direction artistique", en: "Master's degree in Art Direction" },
    company: { fr: "e-artsup · Lille", en: "e-artsup · Lille, France" },
    points: { fr: [], en: [] },
  },
];

/** Frise chronologique : années de début et de fin (décimales possibles : 2021.5 = mi-2021). */
export const timeline = {
  from: 2018,
  to: 2027,
  bars: [
    { track: "job", label: { fr: "Designer multimédia", en: "Multimedia designer" }, start: 2020.6, end: 2022.5 },
    { track: "job", label: { fr: "Graphiste", en: "Graphic designer" }, start: 2022.5, end: 2023.55 },
    { track: "job", label: { fr: "Vidéaste photographe · CDI", en: "Filmmaker & photographer" }, start: 2023.6, end: 2027 },
    { track: "freelance", label: { fr: "Freelance vidéo & photo", en: "Freelance video & photo" }, start: 2023.6, end: 2027 },
    { track: "education", label: { fr: "Master Direction artistique", en: "Master's in Art Direction" }, start: 2018, end: 2022.5 },
    { track: "education", label: { fr: "A2", en: "A2" }, start: 2024.1, end: 2024.45 },
  ] satisfies { track: Track; label: Localized; start: number; end: number }[],
};

/** Niveau sur 12, comme les jauges du CV. */
export const skills: { name: Localized; level: number }[] = [
  { name: { fr: "Cadrage & composition", en: "Framing & composition" }, level: 10 },
  { name: { fr: "Lumière", en: "Lighting" }, level: 8 },
  { name: { fr: "Montage", en: "Editing" }, level: 9 },
  { name: { fr: "Étalonnage", en: "Colour grading" }, level: 9 },
  { name: { fr: "Photo portrait & événement", en: "Portrait & event photography" }, level: 10 },
  { name: { fr: "Motion design", en: "Motion design" }, level: 6 },
  { name: { fr: "Drone", en: "Drone" }, level: 8 },
];

export const software = [
  { abbr: "Pr", name: "Premiere Pro" },
  { abbr: "Dv", name: "DaVinci Resolve" },
  { abbr: "Ae", name: "After Effects" },
  { abbr: "Lr", name: "Lightroom" },
  { abbr: "Ps", name: "Photoshop" },
  { abbr: "Ai", name: "Illustrator" },
];

export const gear = ["Nikon Z6", "Nikon Z8", "DJI Mavic 4 Pro", "DJI RS 3", "DJI Mic 2", "Atomos Ninja V"];

/** Affiché après le matériel. */
export const gearNote: Localized = { fr: "Ouvert à tout autre matériel", en: "Happy to work with any other gear" };

export const extras: Localized<string[]> = {
  fr: ["Français · Anglais courant", "Permis B · Télépilote drone A2"],
  en: ["French · Fluent English", "Driving licence · A2 drone pilot certificate"],
};
