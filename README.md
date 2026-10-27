# Portfolio — Rémi Morien

Next.js 16 (App Router) · TypeScript strict · React 19 · 100 % statique (SSG) · bilingue FR / EN.
Hébergé sur Vercel : chaque `git push origin master` déclenche un déploiement.

## Développement

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de production (webpack, sans Turbopack)
npm run lint
```

## Où modifier le contenu

| Fichier               | Contenu                                                   |
| --------------------- | --------------------------------------------------------- |
| `lib/projects.ts`     | Les projets (titres, textes, vidéos, images, crédits)     |
| `lib/site.ts`         | Nom, email, URL du site, bio, services, clients, réseaux  |
| `lib/dictionaries.ts` | Textes fixes de l'interface (menus, boutons) en FR et EN  |

### Ajouter un projet

1. Mettre les images dans `public/projects/<slug>/`.
2. Ajouter une entrée dans le tableau `projects` de `lib/projects.ts`.
   Les textes s'écrivent `{ fr: "…", en: "…" }`.
   Une vidéo se renseigne par son identifiant : `video: { provider: "vimeo", id: "123456789" }`.
3. `npm run build` pour vérifier, puis commit et push.

## Structure

- `app/[lang]/…` : toutes les pages, générées pour `/fr` et `/en`. `/` redirige vers `/fr`.
- `app/global-not-found.tsx` : page 404.
- `app/sitemap.ts`, `app/robots.ts` : SEO (basés sur `site.url`).
- `components/` : en-tête, pied de page, cartes et grille de projets, lecteur vidéo.
