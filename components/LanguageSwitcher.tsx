"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";

// Les chemins sont identiques dans les deux langues : on remplace juste le préfixe.
export function LanguageSwitcher({ lang, label }: { lang: Locale; label: string }) {
  const pathname = usePathname();
  const rest = pathname.replace(/^\/[^/]+/, "");

  return (
    <nav aria-label={label} className="language-switcher">
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}${rest}`}
          hrefLang={l}
          aria-current={l === lang ? "true" : undefined}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </nav>
  );
}
