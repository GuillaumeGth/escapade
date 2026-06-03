# Escapade 🌅

Un petit magazine interactif **mobile-first** pour choisir notre prochain voyage court (5–7 jours) à deux.
Quatre finalistes : **Madère, Galice, Albanie, Irlande**.

Application **web** (React + Vite + TypeScript) pensée pour le téléphone — pas de React Native, juste un
site responsive qu'on consulte sur mobile. Design éditorial à dominante **ocre / terre cuite**, avec
parallax, animations au scroll (Framer Motion) et scroll fluide (Lenis).

## Lancer le projet

```bash
npm install
npm run dev
```

Puis ouvrir l'URL affichée (par défaut <http://localhost:5173>). Pour tester le rendu mobile :
ouvrir les outils de développement du navigateur (F12) et activer la vue responsive / mobile.

### Autres commandes

```bash
npm run build     # build de production dans dist/
npm run preview   # prévisualise le build de production
```

## Comment ça marche

- **Faire défiler** : chaque destination se révèle avec un visuel en parallax, ses points forts,
  son budget, sa saison idéale et les lieux à voir.
- **Coup de cœur** : le bouton ♥ en bas de chaque destination la marque comme favorite.
- **Tableau de décision** (section finale « On part où ? ») : les coups de cœur remontent en haut ;
  touchez une carte pour désigner la destination retenue.
- Les coups de cœur et la destination choisie sont **enregistrés sur l'appareil** (localStorage) —
  aucune donnée n'est envoyée sur Internet.

## Modifier le contenu

Tout le contenu vit dans un seul fichier : [`src/data/destinations.ts`](src/data/destinations.ts).
Ajouter une destination, changer un budget, un texte ou un lieu se fait là, sans toucher au reste.

### Ajouter de vraies photos (optionnel)

Par défaut, chaque destination affiche un **décor vectoriel dessiné** (toujours joli, jamais cassé).
Pour mettre une vraie photo :

1. Déposez l'image dans le dossier `public/photos/` (ex. `public/photos/madere.jpg`).
2. Dans `src/data/destinations.ts`, ajoutez le champ `photo` à la destination concernée :

   ```ts
   {
     id: 'madere',
     // …
     photo: '/photos/madere.jpg',
   }
   ```

La photo se superpose au décor dessiné (qui reste en repli si l'image ne charge pas).

## Structure

```
escapade/
├── index.html
├── src/
│   ├── App.tsx                  # assemblage de la page
│   ├── index.css                # design system (couleurs, typo, layout)
│   ├── data/destinations.ts     # ✏️ tout le contenu éditable
│   ├── hooks/
│   │   ├── useSmoothScroll.ts   # scroll fluide (Lenis)
│   │   └── useDecision.ts       # coups de cœur + gagnante (localStorage)
│   └── components/
│       ├── Hero.tsx             # en-tête plein écran + parallax
│       ├── Marquee.tsx          # bandeau défilant
│       ├── Intro.tsx            # le brief
│       ├── SceneArt.tsx         # décor vectoriel par destination
│       ├── DestinationSection.tsx
│       ├── DecisionBoard.tsx    # tableau de décision final
│       ├── Reveal.tsx           # animation d'apparition au scroll
│       └── Footer.tsx
```

## Stack

React 19 · TypeScript · Vite 6 · Framer Motion · Lenis · Google Fonts (Fraunces + Hanken Grotesk)
