import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Mono, Instrument_Sans } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "@/lib/fontawesome";
import "../globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { alternates, getLang, locales } from "@/lib/i18n";
import { fullName, site } from "@/lib/site";

// Polices de la charte : titres, texte courant, détails techniques.
const titre = Bricolage_Grotesque({
  variable: "--nf-titre",
  subsets: ["latin"],
  weight: ["600", "800"],
});

const texte = Instrument_Sans({
  variable: "--nf-texte",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const mono = DM_Mono({
  variable: "--nf-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Seules /fr et /en existent, générées au build.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const lang = await getLang(params);
  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${fullName} — ${site.role[lang]}`,
      template: `%s — ${fullName}`,
    },
    description: site.description[lang],
    alternates: alternates(lang),
    openGraph: {
      siteName: fullName,
      locale: lang === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const lang = await getLang(params);

  return (
    <html lang={lang} className={`${titre.variable} ${texte.variable} ${mono.variable}`}>
      <body>
        <Header lang={lang} />
        <main>{children}</main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
