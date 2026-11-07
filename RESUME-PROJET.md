# Contexte : mon site portfolio remimorien.com

## Qui je suis et le but du site
Je suis Rémi Morien, vidéaste, photographe et motion designer, basé à Lyon. Le site est un portfolio bilingue FR/EN qui doit m'aider à décrocher un CDI : il s'adresse aux recruteurs.

## Technique (reprise exacte de mon autre site)
- Next.js 16.4 (App Router, build avec `next build --webpack`, sans Turbopack), React 19, TypeScript strict, npm.
- 100 % statique (SSG) : pas de base de données ni de CMS. Tout le contenu est dans des fichiers `lib/*.ts`.
- Font Awesome en composants SVG React (jamais la version CSS), avec `config.autoAddCss = false`.
- Code sur GitHub : https://github.com/remimorien-ctrl/portfolio (branche `master`).
- Hébergé sur Vercel : chaque `git push origin master` met le site en ligne.
- Domaine : https://remimorien.com (www redirige vers le domaine principal).

## Organisation du site
- `/fr` et `/en` : accueil réservé aux projets. En haut, le carré de mon logo agrandi sert de fenêtre au showreel, et le trait blanc du R passe par-dessus. Dessous, une grille de projets filtrable (Vidéo / Photo / Motion design), en vignettes décalées.
- `/fr/projects/[slug]` : une fiche par projet (vidéo YouTube/Vimeo ou image, texte, client, rôle, galerie, crédits, projet précédent/suivant).
- `/fr/about` : page « Moi » avec présentation, parcours (frise 2019 → aujourd'hui), compétences (jauges, logiciels, matériel) et contact.
- `/` redirige vers `/fr`, avec une page 404 bilingue, un sitemap et un robots.txt.

## Fichiers de contenu
- `lib/site.ts` : nom, email (remi.morien@gmail.com), ville, disponibilité CDI, showreel, CV PDF, réseaux sociaux.
- `lib/profile.ts` : bio, qualités, expériences, frise, compétences, logiciels, matériel.
- `lib/projects.ts` : les projets.
- `lib/dictionaries.ts` : textes de l'interface en FR et EN.

## Charte graphique « R »
- Logo : un R blanc tracé à la main, posé sur un carré en dégradé jaune → orange, avec un bloc rouge Braise en bas à droite. Toujours sur fond sombre. Fichiers : `public/logo.svg` (logo complet) et `public/r-trait.svg` (le R seul).
- Couleurs : Soleil #F9DA23, Miel #F4A40F, Mandarine #ED7409, Braise #E7440F, Encre #1E1611 (fond), Fumée #6B5D52, Brume #F2EEEA.
- Polices : Bricolage Grotesque (titres), Instrument Sans (texte), DM Mono (détails).
- Coin haut gauche arrondi (28px 6px 6px 6px), boutons en pilule.
- Direction retenue, « La fenêtre » : site sombre, ambiance salle de cinéma. Une première version claire a été rejetée.

## Où on en est
- En ligne sur remimorien.com : une ancienne version, simple et sans design.
- La refonte « La fenêtre » est faite, mais pas encore en ligne.
- Contenu provisoire : 8 projets d'exemple avec des photos aléatoires (Lorem Picsum). Le parcours et les compétences sont repris d'un modèle de CV qui contenait des textes d'exemple, et doivent être validés.

## Reste à faire
1. Remplacer les projets d'exemple par mes vrais projets (titres FR/EN, liens vidéo, images), puis retirer Lorem Picsum de `next.config.ts`.
2. Showreel (lien Vimeo ou MP4 compressé) pour la fenêtre de l'accueil.
3. Valider ou corriger le parcours, les compétences et le matériel.
4. Ajouter mon LinkedIn, Instagram et Vimeo, mon CV en PDF (FR/EN) et ma photo.
5. Mettre en ligne la refonte.
