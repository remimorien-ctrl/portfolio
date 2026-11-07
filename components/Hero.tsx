import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faDownload } from "@fortawesome/free-solid-svg-icons";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { site, type Showreel } from "@/lib/site";

function ShowreelVideo({ showreel }: { showreel: Showreel }) {
  if (showreel.kind === "file") {
    return (
      <video
        className="window-media"
        src={showreel.src}
        poster={showreel.poster}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
    );
  }
  return (
    <iframe
      className="window-media window-iframe"
      src={`https://player.vimeo.com/video/${showreel.id}?background=1&dnt=1`}
      allow="autoplay; fullscreen"
      title="Showreel"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}

/**
 * Le logo à l'échelle de l'écran : le carré devient une fenêtre où joue le showreel,
 * et le trait blanc du R passe par-dessus. Les positions reprennent celles du logo.
 */
export function Hero({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const cv = site.cv?.[lang];

  return (
    <section className="hero">
      <div className="hero-logo" aria-hidden="true">
        <div className="window">
          {site.showreel ? <ShowreelVideo showreel={site.showreel} /> : <div className="window-film" />}
          <div className="window-braise" />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- SVG décoratif, pas besoin d'optimisation */}
        <img className="hero-r" src="/r-trait.svg" alt="" />
      </div>

      <div className="hero-text">
        <div>
          <h1 className="hero-name">
            {site.firstName}
            <br />
            <span className="accent">{site.lastName}.</span>
          </h1>
          {site.availability && (
            <p className="status mono">
              <span className="status-dot" /> {site.availability[lang]}
            </p>
          )}
        </div>
        <div className="hero-side">
          <p>{site.role[lang]}</p>
          <div className="hero-actions">
            <Link href="#work" className="button button-primary">
              {dict.hero.seeWork} <FontAwesomeIcon icon={faArrowDown} />
            </Link>
            {cv && (
              <a href={cv} className="button button-ghost" download>
                <FontAwesomeIcon icon={faDownload} /> {dict.hero.downloadCv}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
