import { Hero } from "@/components/Hero";
import { ProjectGrid } from "@/components/ProjectGrid";
import { SectionTitle } from "@/components/SectionTitle";
import { getDictionary } from "@/lib/dictionaries";
import { getLang } from "@/lib/i18n";
import { categories, categoryLabels, localizeProject, projects } from "@/lib/projects";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const lang = await getLang(params);
  const dict = getDictionary(lang);

  return (
    <>
      <Hero lang={lang} />

      <section id="work" className="section">
        <div className="container">
          <SectionTitle>{dict.work.title}</SectionTitle>
          <p className="lead">{dict.work.intro}</p>
          <ProjectGrid
            lang={lang}
            projects={projects.map((p) => localizeProject(p, lang))}
            filters={categories
              .filter((c) => projects.some((p) => p.category === c))
              .map((c) => ({ value: c, label: categoryLabels[c][lang] }))}
            allLabel={dict.work.all}
            emptyLabel={dict.work.empty}
          />
        </div>
      </section>
    </>
  );
}
