import Link from "next/link";
import { getDictionary } from "@/lib/dictionaries";
import { href, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const links = [
    { path: "/projects", label: dict.nav.projects },
    { path: "/about", label: dict.nav.about },
    { path: "/contact", label: dict.nav.contact },
  ];

  return (
    <header className="site-header">
      <Link href={href(lang)} className="site-logo">
        {site.name}
      </Link>
      <nav aria-label="Navigation">
        <ul>
          {links.map((l) => (
            <li key={l.path}>
              <Link href={href(lang, l.path)}>{l.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <LanguageSwitcher lang={lang} label={dict.languageSwitcher} />
    </header>
  );
}
