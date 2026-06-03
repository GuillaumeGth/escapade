# Escapade 🌅

Un petit **magazine interactif mobile-first** pour choisir notre prochain voyage court (5–7 jours), à deux.
Quatre finalistes : **Madère · Galice · Albanie · Irlande**.

> Application **web** (React + Vite + TypeScript) — pas de React Native, juste un site responsive
> qu'on consulte sur le téléphone. Design éditorial à dominante **ocre / terre cuite**, avec parallax,
> animations au scroll et scroll fluide.

![Stack](https://img.shields.io/badge/React-19-c77d38) ![Stack](https://img.shields.io/badge/Vite-6-a85c24) ![Stack](https://img.shields.io/badge/TypeScript-strict-8a3d22)

---

## 🚀 Démarrer (étape par étape)

Tu n'as besoin que de **Node.js** (déjà installé sur ton Mac). Ouvre le Terminal et copie-colle :

```bash
# 1. Aller dans le dossier du projet
cd ~/Documents/GitHub/escapade

# 2. Installer les dépendances (à faire une seule fois)
npm install

# 3. Lancer le site en mode développement
npm run dev
```

Le Terminal affiche une adresse, en général **http://localhost:5173** — ouvre-la dans ton navigateur.

> 💡 **Voir le rendu mobile** : dans le navigateur, appuie sur `F12` (ou clic droit → « Inspecter »),
> puis clique sur l'icône téléphone/tablette en haut de la fenêtre qui s'ouvre. Le site est conçu
> pour cet affichage.

Pour **arrêter** le serveur : reviens dans le Terminal et fais `Ctrl + C`.

### Les autres commandes

| Commande | Ce qu'elle fait |
|---|---|
| `npm run dev` | Lance le site en local, se met à jour à chaque modification |
| `npm run build` | Construit la version optimisée (dossier `dist/`) + vérifie les erreurs |
| `npm run preview` | Prévisualise la version construite |

---

## ✨ Comment ça marche

- **Faire défiler** : chaque destination se révèle avec un visuel en *parallax*, sa tagline, son budget,
  sa saison idéale, le temps de vol depuis Paris et les lieux à voir.
- **Coup de cœur ♥** : le bouton en bas de chaque destination la marque comme favorite.
- **Tableau de décision** (section finale « On part où ? ») : les coups de cœur remontent en haut ;
  touche une carte pour désigner la destination retenue.
- Les coups de cœur et la destination choisie sont **enregistrés sur l'appareil** (localStorage).
  **Aucune donnée n'est envoyée sur Internet** — pas de serveur, pas de compte.

---

## ✏️ Modifier le contenu

Tout le contenu vit dans **un seul fichier** :
[`src/data/destinations.ts`](src/data/destinations.ts).

Ajouter une destination, changer un budget, un texte, une saison ou un lieu à voir se fait là,
sans toucher au reste de l'application. Chaque destination ressemble à ceci :

```ts
{
  id: 'madere',                       // identifiant unique (sans accent ni espace)
  name: 'Madère',
  country: 'Portugal · Atlantique',
  tagline: "L'île-jardin où l'océan…", // la phrase d'accroche
  intro: "Un caillou volcanique…",     // le paragraphe de présentation
  flight: '≈ 3 h 40',                  // temps de vol depuis Paris
  budget: 2,                           // 1 = pas cher, 2 = modéré, 3 = cher
  budgetLabel: 'Modéré',
  season: 'Toute l’année',
  seasonNote: 'Idéal avril → octobre',
  duration: '6–7 jours',
  tags: ['Randonnée', 'Nature', '…'],
  highlights: [                        // les lieux à voir
    { title: 'Pico do Arieiro', desc: 'La rando-signature…' },
  ],
  pros: ['Météo clémente…'],           // les « pourquoi on aimerait »
  cons: 'À garder en tête…',           // optionnel
  scene: { /* couleurs du décor dessiné */ },
}
```

### Ajouter de vraies photos (optionnel)

Par défaut, chaque destination affiche un **décor vectoriel dessiné** (toujours joli, jamais cassé,
aucune dépendance à Internet). Pour mettre une vraie photo à la place :

1. Dépose l'image dans le dossier `public/photos/` (ex. `public/photos/madere.jpg`).
2. Dans `src/data/destinations.ts`, ajoute le champ `photo` à la destination concernée :

   ```ts
   {
     id: 'madere',
     // … le reste …
     photo: '/photos/madere.jpg',
   }
   ```

La photo se superpose au décor dessiné, qui reste en repli si l'image ne charge pas.

---

## 🗂️ Structure du projet

```
escapade/
├── index.html                   # page racine + polices Google
├── public/
│   ├── sun.svg                  # favicon
│   └── photos/                  # (optionnel) tes photos de destinations
├── src/
│   ├── App.tsx                  # assemblage de la page
│   ├── index.css                # design system : couleurs, typo, mise en page
│   ├── main.tsx                 # point d'entrée React
│   ├── data/
│   │   └── destinations.ts      # ✏️ TOUT le contenu éditable
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
│       ├── Reveal.tsx           # apparition au scroll (réutilisable)
│       └── Footer.tsx
├── CLAUDE.md                    # contexte pour l'assistant Claude Code
└── README.md
```

---

## 🎨 Le design en bref

- **Direction** : magazine de voyage éditorial, chaleureux.
- **Couleurs** : ocre, terre cuite, or brûlé et sable sur fond papier crème (variables CSS dans `src/index.css`).
- **Typographie** : **Fraunces** (titres, serif à fort caractère) + **Hanken Grotesk** (texte courant).
- **Mouvement** : parallax au scroll, révélations échelonnées (Framer Motion), scroll fluide (Lenis),
  grain photographique en surimpression. Tout respecte `prefers-reduced-motion`.

---

## 🛠️ Stack technique

React 19 · TypeScript (strict) · Vite 6 · Framer Motion · Lenis · Google Fonts (Fraunces + Hanken Grotesk)

Aucun backend, aucune base de données, aucune clé d'API. Le site est 100 % statique et peut être
déployé tel quel (Vercel, Netlify, GitHub Pages…) après `npm run build`.
