import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categoryLabels, getProject, projects } from "@/lib/projects";

// Uniquement les slugs connus au build : tout le reste renvoie une 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projets/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return project ? { title: project.title, description: project.summary } : {};
}

export default async function ProjectPage({
  params,
}: PageProps<"/projets/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main>
      <p>
        {categoryLabels[project.category]} · {project.year}
      </p>
      <h1>{project.title}</h1>
      <p>{project.summary}</p>
    </main>
  );
}
