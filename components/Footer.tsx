import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { activeSocials, site } from "@/lib/site";

export function Footer({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);

  return (
    <footer className="site-footer">
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
      <p>
        © {new Date().getFullYear()} {site.name}. {dict.footer.rights}
      </p>
    </footer>
  );
}
