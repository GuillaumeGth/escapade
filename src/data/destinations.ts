import data from './destinations.json'

export type SceneKind = 'island' | 'coast' | 'riviera' | 'highlands'

export interface Scene {
  kind: SceneKind
  sky: [string, string]
  land: string
  landBack: string
  accent: string
  water?: string
}

export interface Highlight {
  title: string
  desc: string
}

export interface Destination {
  id: string
  name: string
  country: string
  tagline: string
  intro: string
  flight: string
  budget: 1 | 2 | 3
  budgetLabel: string
  season: string
  seasonNote: string
  duration: string
  tags: string[]
  highlights: Highlight[]
  pros: string[]
  cons?: string
  scene: Scene
  /** Optionnel : photo « héros » affichée en fond parallax. Si absent, la scène dessinée s'affiche. */
  photo?: string
  /** Optionnel : galerie de photos (chemins publics) affichée sous la destination. */
  gallery?: string[]
}

/**
 * SOURCE DE VÉRITÉ du contenu : `destinations.json` (à éditer pour tout texte,
 * budget, lieu ou couleur de décor). Ce fichier ne fait que typer et exposer ces données.
 *
 * Note : un fichier JSON ne peut pas contenir de fonction, donc chaque `gallery`
 * y est écrite en toutes lettres. Les chemins suivent la convention
 * `/photos/<id>/<id>-NN.jpg` (héros = 01), rangés dans `public/photos/<id>/`.
 *
 * Le `as` ci-dessous est nécessaire car TypeScript élargit les littéraux d'un JSON
 * (ex. `budget: 2` devient `number`, `kind: "island"` devient `string`). On affirme
 * donc que le contenu respecte l'interface `Destination` : à vérifier à l'œil en éditant le JSON.
 */
/**
 * Préfixe un chemin public (ex. `/photos/madere/madere-01.jpg`) par le `base`
 * de Vite. En local le base vaut `/`, mais sur GitHub Pages il vaut `/escapade/` :
 * sans ça, les images seraient cherchées à la racine du domaine et renverraient 404.
 */
const asset = (path: string): string =>
  import.meta.env.BASE_URL.replace(/\/$/, '') + path

const withBase = (dest: Destination): Destination => ({
  ...dest,
  photo: dest.photo ? asset(dest.photo) : dest.photo,
  gallery: dest.gallery?.map(asset),
})

export const destinations = (data as Destination[]).map(withBase)
