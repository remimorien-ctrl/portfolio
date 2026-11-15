"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { LocalizedProject, ProjectCategory } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";

type Props = {
  lang: Locale;
  projects: LocalizedProject[];
  filters: { value: ProjectCategory; label: string }[];
  allLabel: string;
  emptyLabel: string;
};

type Layout = { span: number; shifted?: boolean };

const isVertical = (p: LocalizedProject) => !!p.cover && p.cover.height > p.cover.width;

/**
 * Largeur de chaque vignette sur la grille de 12 colonnes, ligne par ligne :
 * 3 verticales (4 + 4 + 4), une verticale et une horizontale (4 + 8),
 * ou deux horizontales décalées (7 + 5 / 5 + 7). Les hauteurs s'alignent ainsi d'elles-mêmes.
 */
function computeLayout(list: LocalizedProject[]): Layout[] {
  const out: Layout[] = [];
  let pair = 0;
  for (let i = 0; i < list.length; ) {
    const v = list.slice(i, i + 3).map(isVertical);
    if (v[0] && v[1] && v[2]) {
      out.push({ span: 4 }, { span: 4 }, { span: 4 });
      i += 3;
    } else if (v[0] !== v[1] && i + 1 < list.length) {
      out.push({ span: v[0] ? 4 : 8 }, { span: v[1] ? 4 : 8 });
      i += 2;
    } else if (v[0] && v[1]) {
      out.push({ span: 4 }, { span: 4 });
      i += 2;
    } else if (i + 1 < list.length) {
      const first = pair++ % 2 === 0 ? 7 : 5;
      out.push({ span: first }, { span: 12 - first, shifted: true });
      i += 2;
    } else {
      out.push({ span: v[0] ? 4 : 7 });
      i += 1;
    }
  }
  return out;
}

// Filtrage côté navigateur : la liste complète est déjà dans le HTML statique.
export function ProjectGrid({ lang, projects, filters, allLabel, emptyLabel }: Props) {
  const [active, setActive] = useState<ProjectCategory | null>(null);
  const visible = active ? projects.filter((p) => p.category === active) : projects;
  const layout = computeLayout(visible);

  return (
    <>
      <div className="filters" role="group">
        <button className="pill" aria-pressed={active === null} onClick={() => setActive(null)}>
          {allLabel}
        </button>
        {filters.map((f) => (
          <button
            key={f.value}
            className="pill"
            aria-pressed={active === f.value}
            onClick={() => setActive(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>
      {visible.length > 0 ? (
        <div className="project-grid">
          {visible.map((p, i) => (
            <ProjectCard key={p.slug} project={p} lang={lang} layout={layout[i]} />
          ))}
        </div>
      ) : (
        <p className="muted">{emptyLabel}</p>
      )}
    </>
  );
}
