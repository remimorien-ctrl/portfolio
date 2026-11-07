import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { activeSocials, fullName, site } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);

  return (
    <footer className="site-footer">
      <div className="container site-footer-inner">
        <Logo size={28} />
        <p className="mono">
          © {new Date().getFullYear()} {fullName} · {dict.footer.rights}
        </p>
        <ul className="socials">
          <li>
            <a href={`mailto:${site.email}`} aria-label={dict.contact.email}>
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
          </li>
          {activeSocials.map((s) => (
            <li key={s.label}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                <FontAwesomeIcon icon={s.icon} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
