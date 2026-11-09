import type { Locale } from "@/lib/i18n";
import { timeline, trackLabels, type Track } from "@/lib/profile";

const tracks: Track[] = ["job", "freelance", "education"];

/** Frise des années, reprise du CV : une ligne par piste, une barre par période. */
export function Timeline({ lang }: { lang: Locale }) {
  const { from, to, bars } = timeline;
  const span = to - from;
  const years = Array.from({ length: span }, (_, i) => from + i);
  const pct = (year: number) => `${((year - from) / span) * 100}%`;

  return (
    <div className="timeline" aria-hidden="true">
      <div className="timeline-row timeline-years">
        <span />
        <div className="timeline-track">
          {years.map((y) => (
            <span key={y} style={{ left: pct(y) }}>
              ’{String(y).slice(2)}
            </span>
          ))}
        </div>
      </div>
      {tracks.map((track) => (
        <div key={track} className="timeline-row">
          <span className="timeline-label">{trackLabels[track][lang]}</span>
          <div className="timeline-track">
            {bars
              .filter((b) => b.track === track)
              .map((b) => (
                <span
                  key={b.label.fr}
                  className={`timeline-bar track-${track}`}
                  style={{ left: pct(b.start), width: `calc(${pct(b.end)} - ${pct(b.start)})` }}
                >
                  {b.label[lang]}
                </span>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
