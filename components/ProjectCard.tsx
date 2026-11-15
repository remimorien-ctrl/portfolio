import Image from "next/image";
import Link from "next/link";
import { href, type Locale } from "@/lib/i18n";
import type { LocalizedProject } from "@/lib/projects";

type Props = {
  project: LocalizedProject;
  lang: Locale;
  /** Colonnes occupées sur 12, et décalage vers le bas pour l'effet « vignettes décalées ». */
  layout?: { span: number; shifted?: boolean };
};

export function ProjectCard({ project, lang, layout }: Props) {
  const vertical = !!project.cover && project.cover.height > project.cover.width;
  return (
    <Link
      href={href(lang, `/projects/${project.slug}`)}
      className={[
        "project-card",
        vertical && "project-card-vertical",
        layout?.shifted && "project-card-shifted",
      ]
        .filter(Boolean)
        .join(" ")}
      style={layout ? ({ "--span": layout.span } as React.CSSProperties) : undefined}
    >
      <div className="project-card-media">
        {project.cover ? (
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            width={project.cover.width}
            height={project.cover.height}
            sizes={vertical ? "(max-width: 700px) 100vw, 35vw" : "(max-width: 700px) 100vw, 60vw"}
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
