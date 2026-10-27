import type { Metadata } from "next";
import Image from "next/image";
import { getDictionary } from "@/lib/dictionaries";
import { alternates, getLang } from "@/lib/i18n";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const lang = await getLang(params);
  return {
    title: getDictionary(lang).about.title,
    alternates: alternates(lang, "/about"),
  };
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const lang = await getLang(params);
  const dict = getDictionary(lang);
  const { bio, portrait, services, clients } = site.about;

  return (
    <>
      <h1>{dict.about.title}</h1>
      <div className="about">
        {portrait && (
          <Image
            src={portrait.src}
            alt={portrait.alt[lang]}
            width={portrait.width}
            height={portrait.height}
            sizes="(max-width: 700px) 100vw, 400px"
          />
        )}
        <div>
          {bio[lang].map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>

      <section>
        <h2>{dict.about.services}</h2>
        <ul>
          {services[lang].map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      {clients.length > 0 && (
        <section>
          <h2>{dict.about.clients}</h2>
          <ul className="clients">
            {clients.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
