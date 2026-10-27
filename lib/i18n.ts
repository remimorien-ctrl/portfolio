import { notFound } from "next/navigation";

export const locales =["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

/** Un texte (ou n'importe quelle valeur) décliné dans chaque langue. */
export type Localized<T = string> = Record<Locale, T>;

export const localeNames: Localized = {
  fr: "Français",
  en: "English",
};

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Lit la langue depuis les params d'une page ou d'un layout ; 404 si elle n'existe pas. */
export async function getLang(params: Promise<{ lang: string }>): Promise<Locale> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return lang;
}

/** Lien interne préfixé par la langue : href("en", "/projects") → "/en/projects". */
export function href(lang: Locale, path = ""): string {
  return `/${lang}${path}`;
}

/** URL canonique + balises hreflang d'une page (SEO) : { fr: "/fr/about", en: "/en/about" }. */
export function alternates(lang: Locale, path = "") {
  return {
    canonical: href(lang, path),
    languages: Object.fromEntries(locales.map((l) => [l, href(l, path)])),
  };
}
