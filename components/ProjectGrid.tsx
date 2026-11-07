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

// Filtrage côté navigateur : la liste complète est déjà dans le HTML statique.
export function ProjectGrid({ lang, projects, filters, allLabel, emptyLabel }: Props) {
  const [active, setActive] = useState<ProjectCategory | null>(null);
  const visible = active ? projects.filter((p) => p.category === active) : projects;

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
          {visible.map((p) => (
            <ProjectCard key={p.slug} project={p} lang={lang} />
          ))}
        </div>
      ) : (
        <p className="muted">{emptyLabel}</p>
      )}
    </>
  );
}
