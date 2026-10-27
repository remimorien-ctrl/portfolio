import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { categoryLabels, projects } from "@/lib/projects";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <main>
      <h1>{site.name}</h1>
      <p>Vidéaste, photographe &amp; motion designer</p>
      <ul>
        {projects.map((p) => (
          <li key={p.slug}>
            <Link href={`/projets/${p.slug}`}>
              {p.title} · {categoryLabels[p.category]} · {p.year}
            </Link>
          </li>
        ))}
      </ul>
      <a href={`mailto:${site.email}`}>
        <FontAwesomeIcon icon={faEnvelope} /> Contact
      </a>
    </main>
  );
}
