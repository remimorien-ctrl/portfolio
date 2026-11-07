import type { Localized } from "./i18n";

// Contenu « CV » du site : présentation, parcours, compétences.
// Repris du modèle de CV : chaque élément est à vérifier / remplacer par les vraies informations.

export const about = {
  /** Accroche : la partie `highlight` est mise en couleur. */
  headline: {
    fr: { before: "Je raconte des histoires ", highlight: "en images fixes et animées", after: ", du repérage jusqu'à l'étalonnage final." },
    en: { before: "I tell stories ", highlight: "in still and moving images", after: ", from location scouting to the final grade." },
  } satisfies Localized<{ before: string; highlight: string; after: string }>,
  bio: {
    fr: [
      "Vidéaste et photographe, je travaille pour des marques, des artistes et des événements. J'aime la lumière naturelle, les plans qui respirent et les montages qui vont droit au but.",
      "Je tourne seul avec un kit léger ou je m'intègre à une équipe sur un plateau plus lourd.",
    ],
    en: [
      "As a filmmaker and photographer, I work with brands, artists and events. I love natural light, shots that breathe and edits that get straight to the point.",
      "I can shoot solo with a light kit or join a crew on a bigger set.",
    ],
  } satisfies Localized<string[]>,
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
      text: { fr: "Je mets les gens à l'aise.", en: "I put people at ease." },
    },
    {
      title: { fr: "Délais", en: "Turnaround" },
      text: { fr: "Formats courts livrés en 48 h.", en: "Short formats delivered in 48 h." },
    },
  ] satisfies { title: Localized; text: Localized }[],
};

export type Track = "video" | "photo" | "education";

export const trackLabels: Record<Track, Localized> = {
  video: { fr: "Vidéo", en: "Video" },
  photo: { fr: "Photo", en: "Photo" },
  education: { fr: "Formation", en: "Education" },
};

export type Experience = {
  track: Track;
  period: Localized;
  title: Localized;
  company: Localized;
  points: Localized<string[]>;
};

/** Du plus récent au plus ancien. */
export const experiences: Experience[] = [
  {
    track: "video",
    period: { fr: "2023 – auj.", en: "2023 – now" },
    title: { fr: "Vidéaste & photographe freelance", en: "Freelance filmmaker & photographer" },
    company: { fr: "Indépendant · Paris et déplacements", en: "Self-employed · Paris and travel" },
    points: {
      fr: [
        "Films de marque et contenus réseaux pour une quinzaine de clients (mode, food, culture).",
        "Aftermovies de festivals : tournage multicam, montage livré sous 72 h.",
        "Portraits corporate et artistes, couverture photo de concerts et conférences.",
      ],
      en: [
        "Brand films and social content for around fifteen clients (fashion, food, culture).",
        "Festival aftermovies: multicam shoots, edit delivered within 72 h.",
        "Corporate and artist portraits, photo coverage of concerts and conferences.",
      ],
    },
  },
  {
    track: "video",
    period: { fr: "2021 – 2023", en: "2021 – 2023" },
    title: { fr: "Monteur & cadreur", en: "Editor & camera operator" },
    company: { fr: "Agence de communication · Paris", en: "Communications agency · Paris" },
    points: {
      fr: [
        "Tournage et montage d'une centaine de vidéos courtes pour les réseaux des clients.",
        "Déclinaison des formats 16:9, 9:16 et 1:1 pour chaque campagne.",
      ],
      en: [
        "Shot and edited around a hundred short videos for clients' social channels.",
        "Delivered 16:9, 9:16 and 1:1 versions for every campaign.",
      ],
    },
  },
  {
    track: "photo",
    period: { fr: "Janv. – juin 2021", en: "Jan – Jun 2021" },
    title: { fr: "Assistant photographe (stage)", en: "Photography assistant (internship)" },
    company: { fr: "Studio photo · Paris", en: "Photo studio · Paris" },
    points: {
      fr: ["Lumières et assistance sur les shootings mode et produit, retouche des séries."],
      en: ["Lighting and assistance on fashion and product shoots, retouching."],
    },
  },
  {
    track: "education",
    period: { fr: "2019 – 2021", en: "2019 – 2021" },
    title: { fr: "BTS Métiers de l'audiovisuel, option image", en: "Vocational degree in audiovisual production (camera)" },
    company: { fr: "Lycée (à compléter) · Paris", en: "School (to be completed) · Paris" },
    points: {
      fr: ["Court-métrage de fin d'études en tant que chef opérateur."],
      en: ["Graduation short film as director of photography."],
    },
  },
];

/** Frise chronologique : années de début et de fin (décimales possibles : 2021.5 = mi-2021). */
export const timeline = {
  from: 2019,
  to: 2027,
  bars: [
    { track: "video", label: { fr: "Agence", en: "Agency" }, start: 2021, end: 2023 },
    { track: "video", label: { fr: "Freelance vidéo", en: "Freelance video" }, start: 2023, end: 2027 },
    { track: "photo", label: { fr: "Stage", en: "Internship" }, start: 2021, end: 2021.5 },
    { track: "photo", label: { fr: "Freelance photo", en: "Freelance photo" }, start: 2023, end: 2027 },
    { track: "education", label: { fr: "BTS Audiovisuel", en: "Audiovisual degree" }, start: 2019, end: 2021 },
    { track: "education", label: { fr: "A2", en: "A2" }, start: 2024, end: 2024.5 },
  ] satisfies { track: Track; label: Localized; start: number; end: number }[],
};

/** Niveau sur 10. */
export const skills: { name: Localized; level: number }[] = [
  { name: { fr: "Cadrage & composition", en: "Framing & composition" }, level: 10 },
  { name: { fr: "Lumière", en: "Lighting" }, level: 9 },
  { name: { fr: "Montage", en: "Editing" }, level: 10 },
  { name: { fr: "Étalonnage", en: "Colour grading" }, level: 8 },
  { name: { fr: "Photo portrait & événement", en: "Portrait & event photography" }, level: 9 },
  { name: { fr: "Drone & motion design", en: "Drone & motion design" }, level: 7 },
];

export const software = [
  { abbr: "Pr", name: "Premiere Pro" },
  { abbr: "Dv", name: "DaVinci Resolve" },
  { abbr: "Ae", name: "After Effects" },
  { abbr: "Lr", name: "Lightroom" },
  { abbr: "Ps", name: "Photoshop" },
];

export const gear = ["Sony FX3", "Sony A7 IV", "DJI Mini 4 Pro", "DJI RS 3", "Aputure 300d"];

export const extras: Localized<string[]> = {
  fr: ["Français · Anglais courant", "Permis B · Télépilote drone A2"],
  en: ["French · Fluent English", "Driving licence · A2 drone pilot certificate"],
};
