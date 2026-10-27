import type { Metadata } from "next";
import { ProjectGrid } from "@/components/ProjectGrid";
import { getDictionary } from "@/lib/dictionaries";
import { alternates, getLang } from "@/lib/i18n";
import { categories, categoryLabels, localizeProject, projects } from "@/lib/projects";

export async function generateMetadata({ params }: PageProps<"/[lang]/projects">): Promise<Metadata> {
  const lang = await getLang(params);
  const dict = getDictionary(lang);
  return {
    title: dict.projects.title,
    description: dict.projects.intro,
    alternates: alternates(lang, "/projects"),
  };
}

export default async function ProjectsPage({ params }: PageProps<"/[lang]/projects">) {
  const lang = await getLang(params);
  const dict = getDictionary(lang);

  return (
    <>
      <h1>{dict.projects.title}</h1>
      <p className="muted">{dict.projects.intro}</p>
      <ProjectGrid
        lang={lang}
        projects={projects.map((p) => localizeProject(p, lang))}
        filters={categories
          .filter((c) => projects.some((p) => p.category === c))
          .map((c) => ({ value: c, label: categoryLabels[c][lang] }))}
        allLabel={dict.projects.all}
        emptyLabel={dict.projects.empty}
      />
    </>
  );
}
