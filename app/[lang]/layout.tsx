import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "@/lib/fontawesome";
import "../globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { alternates, getLang, locales } from "@/lib/i18n";
import { site } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
      default: `${site.name} — ${site.role[lang]}`,
      template: `%s — ${site.name}`,
    },
    description: site.description[lang],
    alternates: alternates(lang),
    openGraph: {
      siteName: site.name,
      locale: lang === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const lang = await getLang(params);

  return (
    <html lang={lang} className={geistSans.variable}>
      <body>
        <Header lang={lang} />
        <main>{children}</main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
