import type { Metadata } from "next";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { SectionTitle } from "@/components/SectionTitle";
import { SkillBar } from "@/components/SkillBar";
import { Timeline } from "@/components/Timeline";
import { getDictionary } from "@/lib/dictionaries";
import { alternates, getLang } from "@/lib/i18n";
import { about, experiences, extras, gear, gearNote, skills, software, timeline, trackLabels } from "@/lib/profile";
import { activeSocials, site } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const lang = await getLang(params);
  return {
    title: getDictionary(lang).about.title,
    alternates: alternates(lang, "/about"),
  };
}

// Profil : présentation, parcours, compétences et contact. L'accueil est réservé aux projets.
export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const lang = await getLang(params);
  const dict = getDictionary(lang);
  const headline = about.headline[lang];
  const cv = site.cv?.[lang];

  return (
    <>
      <section id="about" className="section">
        <div className="container">
          <SectionTitle>{dict.about.title}</SectionTitle>
          <div className="about-layout">
            <div>
              <p className="headline">
                {headline.before}
                <span className="highlight">{headline.highlight}</span>
                {headline.after}
              </p>
              <div className="prose">
                {about.bio[lang].map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
            <figure className="portrait">
              <Image src={about.photo} alt={`${site.firstName} ${site.lastName}`} width={800} height={1000} sizes="(max-width: 800px) 280px, 320px" priority />
            </figure>
          </div>
          <ul className="qualities">
            {about.qualities.map((q) => (
              <li key={q.title.fr}>
                <h3>{q.title[lang]}</h3>
                <p>{q.text[lang]}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="experience" className="section section-encre">
        <div className="container">
          <SectionTitle aside={`${timeline.from} – ${new Date().getFullYear()}`}>
            {dict.experience.title}
          </SectionTitle>
          <Timeline lang={lang} />
          <ol className="experiences">
            {experiences.map((e) => (
              <li key={e.title.fr} className="experience">
                <div className="experience-when">
                  <span className="mono">{e.period[lang]}</span>
                  <span className={`tag tag-${e.track}`}>{trackLabels[e.track][lang]}</span>
                </div>
                <div>
                  <h3>{e.title[lang]}</h3>
                  <p className="muted">{e.company[lang]}</p>
                  <ul className="bullets">
                    {e.points[lang].map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="skills" className="section">
        <div className="container">
          <SectionTitle>{dict.skills.title}</SectionTitle>
          <div className="skills-layout">
            <div className="skills">
              {skills.map((s) => (
                <SkillBar key={s.name.fr} name={s.name[lang]} level={s.level} />
              ))}
            </div>
            <div className="skills-side">
              <h3 className="mini-title">{dict.skills.software}</h3>
              <ul className="chips">
                {software.map((s) => (
                  <li key={s.abbr} className="chip">
                    <span className="chip-abbr">{s.abbr}</span> {s.name}
                  </li>
                ))}
              </ul>
              <h3 className="mini-title">{dict.skills.gear}</h3>
              <ul className="chips">
                {gear.map((g) => (
                  <li key={g} className="chip">
                    {g}
                  </li>
                ))}
                <li className="chip chip-muted">{gearNote[lang]}</li>
              </ul>
              <h3 className="mini-title">{dict.skills.more}</h3>
              <ul className="mono extras">
                {extras[lang].map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section section-encre">
        <div className="container contact">
          <div>
            <h2 className="contact-title">
              {dict.contact.title}
              <span className="dot">.</span>
            </h2>
            <p className="lead">{dict.contact.intro}</p>
            <div className="hero-actions">
              <a href={`mailto:${site.email}`} className="button button-primary">
                <FontAwesomeIcon icon={faEnvelope} /> {site.email}
              </a>
              {cv && (
                <a href={cv} className="button button-ghost" download>
                  <FontAwesomeIcon icon={faDownload} /> {dict.contact.downloadCv}
                </a>
              )}
            </div>
          </div>
          <dl className="contact-details">
            <div>
              <dt>{dict.contact.location}</dt>
              <dd>
                <FontAwesomeIcon icon={faLocationDot} /> {site.location[lang]}
              </dd>
            </div>
            {site.phone && (
              <div>
                <dt>{dict.contact.phone}</dt>
                <dd>
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`}>
                    <FontAwesomeIcon icon={faPhone} /> {site.phone}
                  </a>
                </dd>
              </div>
            )}
            {activeSocials.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>
                  <a href={s.url} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={s.icon} /> {s.url.replace(/^https?:\/\/(www\.)?/, "")}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
