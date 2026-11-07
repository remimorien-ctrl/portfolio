import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { fullName } from "@/lib/site";

export const metadata: Metadata = {
  title: `404 — ${fullName}`,
};

// Page 404 globale : on ne connaît pas la langue, donc message bilingue.
export default function GlobalNotFound() {
  return (
    <html lang="fr">
      <body>
        <main className="not-found">
          <h1>404</h1>
          <p>Cette page n&apos;existe pas. · This page does not exist.</p>
          <p>
            <Link href="/fr">Accueil</Link> · <Link href="/en">Home</Link>
          </p>
        </main>
      </body>
    </html>
  );
}
