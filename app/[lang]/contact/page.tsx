import type { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { getDictionary } from "@/lib/dictionaries";
import { alternates, getLang } from "@/lib/i18n";
import { activeSocials, site } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const lang = await getLang(params);
  const dict = getDictionary(lang);
  return {
    title: dict.contact.title,
    description: dict.contact.intro,
    alternates: alternates(lang, "/contact"),
  };
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const lang = await getLang(params);
  const dict = getDictionary(lang);

  return (
    <>
      <h1>{dict.contact.title}</h1>
      <p className="lead">{dict.contact.intro}</p>

      <section>
        <h2>{dict.contact.email}</h2>
        <a href={`mailto:${site.email}`} className="button">
          <FontAwesomeIcon icon={faEnvelope} /> {site.email}
        </a>
      </section>

      {activeSocials.length > 0 && (
        <section>
          <h2>{dict.contact.socials}</h2>
          <ul className="social-list">
            {activeSocials.map((s) => (
              <li key={s.label}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={s.icon} /> {s.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
