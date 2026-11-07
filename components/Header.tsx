import Link from "next/link";
import { getDictionary } from "@/lib/dictionaries";
import { href, type Locale } from "@/lib/i18n";
import { fullName } from "@/lib/site";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";

export function Header({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  // L'accueil ne contient que les projets ; le profil est sur /about, avec ses ancres.
  const links = [
    { href: `${href(lang)}#work`, label: dict.nav.work },
    { href: href(lang, "/about"), label: dict.nav.about },
    { href: `${href(lang, "/about")}#experience`, label: dict.nav.experience },
    { href: `${href(lang, "/about")}#skills`, label: dict.nav.skills },
    { href: `${href(lang, "/about")}#contact`, label: dict.nav.contact },
  ];

  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link href={href(lang)} className="site-logo">
          <Logo size={36} />
          <span>{fullName}</span>
        </Link>
        <nav aria-label={dict.menu} className="site-nav">
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <LanguageSwitcher lang={lang} label={dict.languageSwitcher} />
      </div>
    </header>
  );
}
