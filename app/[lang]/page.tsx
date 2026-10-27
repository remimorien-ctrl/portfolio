import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { VideoEmbed } from "@/components/VideoEmbed";
import { getDictionary } from "@/lib/dictionaries";
import { getLang, href } from "@/lib/i18n";
import { featuredProjects, localizeProject } from "@/lib/projects";
import { site } from "@/lib/site";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const lang = await getLang(params);
  const dict = getDictionary(lang);

  return (
    <>
      <section className="hero">
        <h1>{site.name}</h1>
        <p className="muted">{site.role[lang]}</p>
      </section>

      {site.showreel && (
        <section>
          <h2>{dict.home.showreel}</h2>
          <VideoEmbed video={site.showreel} title={`${dict.home.showreel} — ${site.name}`} />
        </section>
      )}

      <section>
        <h2>{dict.home.featured}</h2>
        <div className="project-grid">
          {featuredProjects.map((p) => (
            <ProjectCard key={p.slug} project={localizeProject(p, lang)} lang={lang} />
          ))}
        </div>
        <p>
          <Link href={href(lang, "/projects")}>{dict.home.allProjects} →</Link>
        </p>
      </section>

      <section className="cta">
        <h2>{dict.home.ctaTitle}</h2>
        <Link href={href(lang, "/contact")} className="button">
          {dict.home.ctaButton}
        </Link>
      </section>
    </>
  );
}
