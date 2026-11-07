import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { VideoEmbed } from "@/components/VideoEmbed";
import { getDictionary } from "@/lib/dictionaries";
import { alternates, getLang, href } from "@/lib/i18n";
import { categoryLabels, getAdjacentProjects, getProject, projects } from "@/lib/projects";

// Uniquement les projets connus au build : tout le reste renvoie une 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/projects/[slug]">): Promise<Metadata> {
  const lang = await getLang(params);
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.title[lang],
    description: project.summary[lang],
    alternates: alternates(lang, `/projects/${project.slug}`),
    openGraph: project.cover && { images: [project.cover.src] },
  };
}

export default async function ProjectPage({ params }: PageProps<"/[lang]/projects/[slug]">) {
  const lang = await getLang(params);
  const project = getProject((await params).slug);
  if (!project) notFound();

  const dict = getDictionary(lang);
  const { previous, next } = getAdjacentProjects(project.slug);
  const title = project.title[lang];

  return (
    <article className="container project">
      <p>
        <Link href={`${href(lang)}#work`}>← {dict.project.back}</Link>
      </p>
      <h1>{title}</h1>
      <p className="lead">{project.summary[lang]}</p>

      <dl className="project-meta">
        <div>
          <dt>{dict.project.category}</dt>
          <dd>{categoryLabels[project.category][lang]}</dd>
        </div>
        <div>
          <dt>{dict.project.year}</dt>
          <dd>{project.year}</dd>
        </div>
        {project.client && (
          <div>
            <dt>{dict.project.client}</dt>
            <dd>{project.client}</dd>
          </div>
        )}
        {project.role && (
          <div>
            <dt>{dict.project.role}</dt>
            <dd>{project.role[lang]}</dd>
          </div>
        )}
      </dl>

      {project.video ? (
        <VideoEmbed video={project.video} title={title} />
      ) : (
        project.cover && (
          <Image
            src={project.cover.src}
            alt={project.cover.alt[lang]}
            width={project.cover.width}
            height={project.cover.height}
            sizes="(max-width: 1100px) 100vw, 1100px"
            priority
          />
        )
      )}

      {project.description?.[lang].map((paragraph, i) => <p key={i}>{paragraph}</p>)}

      {project.gallery && (
        <div className="gallery">
          {project.gallery.map((img) => (
            <Image
              key={img.src}
              src={img.src}
              alt={img.alt[lang]}
              width={img.width}
              height={img.height}
              sizes="(max-width: 700px) 100vw, 50vw"
            />
          ))}
        </div>
      )}

      {project.credits && (
        <section>
          <h2>{dict.project.credits}</h2>
          <dl className="credits">
            {project.credits.map((c) => (
              <div key={`${c.role.fr}-${c.name}`}>
                <dt>{c.role[lang]}</dt>
                <dd>{c.name}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <nav className="project-nav">
        {previous ? (
          <Link href={href(lang, `/projects/${previous.slug}`)}>
            ← {dict.project.previous}
            <br />
            <strong>{previous.title[lang]}</strong>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={href(lang, `/projects/${next.slug}`)}>
            {dict.project.next} →
            <br />
            <strong>{next.title[lang]}</strong>
          </Link>
        )}
      </nav>
    </article>
  );
}
