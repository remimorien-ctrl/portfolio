import Image from "next/image";
import Link from "next/link";
import { href, type Locale } from "@/lib/i18n";
import type { LocalizedProject } from "@/lib/projects";

export function ProjectCard({ project, lang }: { project: LocalizedProject; lang: Locale }) {
  return (
    <Link href={href(lang, `/projects/${project.slug}`)} className="project-card">
      <div className="project-card-media">
        {project.cover ? (
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            width={project.cover.width}
            height={project.cover.height}
            sizes="(max-width: 700px) 100vw, 60vw"
          />
        ) : (
          <div className="cover-placeholder" />
        )}
      </div>
      <div className="project-card-info">
        <div>
          <h3>{project.title}</h3>
          <p className="mono">{project.year}</p>
        </div>
        <span className={`tag tag-${project.category}`}>{project.categoryLabel}</span>
      </div>
    </Link>
  );
}
