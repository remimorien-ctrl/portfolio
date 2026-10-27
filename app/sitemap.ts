import type { MetadataRoute } from "next";
import { href, locales } from "@/lib/i18n";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/projects", "/about", "/contact", ...projects.map((p) => `/projects/${p.slug}`)];

  return paths.flatMap((path) =>
    locales.map((lang) => ({
      url: `${site.url}${href(lang, path)}`,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${site.url}${href(l, path)}`])),
      },
    })),
  );
}
