# Escapade — contexte projet

## Qu'est-ce qu'Escapade ?

Un **magazine interactif mobile-first** pour choisir un prochain voyage court (5–7 jours) à deux.
Quatre destinations finalistes sont présentées (Madère, Galice, Albanie, Irlande) ; l'utilisateur
parcourt, marque des « coups de cœur » et désigne une destination retenue.

C'est une **app web** (site React responsive consulté sur téléphone) — **pas** du React Native.
Projet personnel, pas de visée commerciale, pas de backend.

## Utilisateur principal

Le propriétaire du projet est **novice en développement**. Toujours :
- expliquer les étapes en clair, donner des commandes exactes à copier-coller ;
- ne jamais supposer de connaissance technique préalable ;
- garder malgré tout une **qualité de code optimale** (typage strict, composants propres).

## Stack technique

| Couche | Choix |
|---|---|
| Framework | React 19 + TypeScript (strict) |
| Build / dev server | Vite 6 |
| Animations | Framer Motion (`framer-motion`) |
| Scroll fluide | Lenis (`lenis`) |
| Styles | CSS natif avec variables (`src/index.css`) — pas de framework CSS |
| Polices | Google Fonts : Fraunces (display) + Hanken Grotesk (texte) |
| Persistance | `localStorage` uniquement — **aucun serveur, aucune base de données** |

## Lancer le projet

```bash
npm install      # une seule fois
npm run dev      # serveur de dev (http://localhost:5173)
npm run build    # type-check (tsc) + build de production dans dist/
npm run preview  # prévisualise le build
```

> ⚠️ Toujours faire passer `npm run build` avant de considérer une modification terminée :
> il fait le type-check TypeScript **et** le bundle. Zéro erreur attendue.

## Structure

```
src/
├── App.tsx                  # assemblage de la page (ordre des sections)
├── index.css                # design system : tokens couleurs, typo, layout, responsive
├── data/destinations.ts     # SOURCE DE VÉRITÉ du contenu (voir ci-dessous)
├── hooks/
│   ├── useSmoothScroll.ts   # active Lenis (respecte prefers-reduced-motion)
│   └── useDecision.ts       # coups de cœur + gagnante, persistés en localStorage
└── components/
    ├── Hero.tsx             # hero plein écran + parallax (useScroll / useTransform)
    ├── Marquee.tsx          # bandeau défilant infini
    ├── Intro.tsx            # le « brief »
    ├── SceneArt.tsx         # décor vectoriel génératif par destination
    ├── DestinationSection.tsx # 1 destination = visuel parallax + contenu révélé
    ├── DecisionBoard.tsx    # tableau de décision final
    ├── Reveal.tsx           # primitive d'apparition au scroll (réutilisable)
    └── Footer.tsx
```

## Règle d'or — le contenu vit dans `data/destinations.ts`

> **Tout le contenu éditorial (destinations, textes, budgets, lieux, couleurs de décor) est
> dans [`src/data/destinations.ts`](src/data/destinations.ts), et nulle part ailleurs.**

Aucun texte de destination ne doit être codé en dur dans un composant. Ajouter une destination,
changer un texte ou un budget = modifier ce fichier uniquement. Les composants se contentent
d'afficher les données du type `Destination`.

- Le champ `scene` décrit le **décor vectoriel dessiné** (couleurs + type : `island` / `coast` /
  `riviera` / `highlands`). C'est le visuel par défaut : toujours rendu, jamais cassé.
- Le champ optionnel `photo` (ex. `'/photos/madere.jpg'`) superpose une vraie image, avec le
  décor dessiné en repli.

## Conventions de code

- **Mobile-first** : écrire le CSS pour mobile d'abord, puis enrichir avec `@media (min-width: 760px)`.
- **Un composant = un fichier** dans `src/components/`. Les bouts réutilisables (ex. `Reveal`) sont extraits.
- **Tokens, pas de valeurs en dur** : couleurs, espacements et polices passent par les variables CSS
  de `:root` dans `index.css` (`var(--ochre)`, `var(--paper)`, `var(--font-display)`…). Ne pas
  hardcoder un `#hex` dans un composant.
- **Animations** : n'animer que `transform` et `opacity` (fluidité). Réutiliser `Reveal` pour les
  apparitions au scroll plutôt que de recréer une animation à chaque fois.
- **Accessibilité du mouvement** : tout effet doit se désactiver via `prefers-reduced-motion`
  (déjà géré dans `useSmoothScroll` et dans `index.css`).
- **TypeScript strict** : pas de `any`, pas de `@ts-ignore`. Typer les données via l'interface
  `Destination`. Corriger les erreurs du compilateur, ne pas les masquer.
- **Données / accès** : la persistance passe par le hook `useDecision` (localStorage). Ne pas
  lire/écrire `localStorage` directement dans un composant.
- **Pas de réseau, pas de données personnelles envoyées** : tout reste sur l'appareil. Ne pas
  introduire d'appel réseau, d'analytics ou de backend sans validation explicite.

## Direction artistique (à préserver)

- Palette **ocre dominante** : terre cuite, or brûlé, sable, sur fond papier crème.
- Typo **Fraunces** (titres, italiques expressifs) + **Hanken Grotesk** (corps).
- Ambiance magazine de voyage : grain photographique, parallax, révélations échelonnées,
  asymétrie maîtrisée. Éviter le « look IA » générique (Inter, dégradés violets, layouts plats).

## Déploiement

Site 100 % statique. Après `npm run build`, le dossier `dist/` se déploie tel quel sur Vercel,
Netlify ou GitHub Pages.

## État d'avancement

- [x] Scaffold React + Vite + TypeScript
- [x] Design system ocre (`index.css`), polices Fraunces + Hanken Grotesk
- [x] Hero parallax + marquee + intro
- [x] 4 destinations (Madère, Galice, Albanie, Irlande) avec décors vectoriels génératifs
- [x] Coups de cœur + tableau de décision (localStorage)
- [x] Scroll fluide (Lenis) + révélations au scroll (Framer Motion)
- [ ] Vraies photos par destination (optionnel — voir README)
- [ ] Déploiement en ligne (Vercel / Netlify)
- [ ] Idées éventuelles : carte des 4 destinations, comparateur côte à côte, dates/météo indicatives
