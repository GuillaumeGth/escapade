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
 * Construit les chemins d'une galerie rangée dans `public/photos/<id>/`.
 * Les fichiers sont nommés `<id>-01.jpg`, `<id>-02.jpg`, … (héros = 01).
 */
function gallery(id: string, count: number): string[] {
  return Array.from(
    { length: count },
    (_, i) => `/photos/${id}/${id}-${String(i + 1).padStart(2, '0')}.jpg`,
  )
}

export const destinations: Destination[] = [
  {
    id: 'madere',
    name: 'Madère',
    country: 'Portugal · Atlantique',
    tagline: "L'île-jardin où l'océan vient buter contre les montagnes.",
    intro:
      "Un caillou volcanique posé au large de l'Afrique, vert toute l'année, taillé de falaises et sillonné de levadas. La douceur subtropicale sans le décalage horaire.",
    flight: '≈ 3 h 40',
    budget: 2,
    budgetLabel: 'Modéré',
    season: 'Toute l’année',
    seasonNote: 'Idéal avril → octobre, doux même en hiver',
    duration: '6–7 jours',
    tags: ['Randonnée', 'Nature', 'Doux climat', 'Falaises', 'Sans décalage'],
    highlights: [
      { title: 'Pico do Arieiro → Pico Ruivo', desc: 'La rando-signature, crêtes au-dessus des nuages.' },
      { title: 'Levadas', desc: 'Sentiers plats le long des canaux d’irrigation, à travers la forêt laurifère.' },
      { title: 'Funchal', desc: 'Marché dos Lavradores, téléphérique de Monte et ses jardins tropicaux.' },
      { title: 'Porto Moniz', desc: 'Piscines naturelles creusées dans la lave, au nord-ouest.' },
      { title: 'Fanal', desc: 'Forêt brumeuse d’arbres millénaires, irréelle au lever du jour.' },
      { title: 'Cabo Girão', desc: 'Skywalk à 580 m au-dessus de l’océan, l’une des plus hautes falaises d’Europe.' },
    ],
    pros: [
      'Météo clémente même hors saison',
      'Paysages très variés sur une petite île',
      'Anglais courant, très sûr',
      'Gastronomie : espetada, bolo do caco, vin de Madère',
    ],
    scene: {
      kind: 'island',
      sky: ['#7fb7c4', '#c9e0d6'],
      land: '#2f5d3a',
      landBack: '#4d7a4a',
      accent: '#1f6a66',
      water: '#2f8a86',
    },
    photo: '/photos/madere/madere-01.jpg',
    gallery: gallery('madere', 10),
  },
  {
    id: 'acores',
    name: 'Açores',
    country: 'Portugal · Atlantique',
    tagline: 'Un archipel volcanique perdu en plein Atlantique, vert émeraude et cratères noyés de lacs.',
    intro:
      "Neuf îles posées à mi-chemin de l'Amérique, où des cratères géants enferment des lacs bleus et verts, où l'on se baigne dans des sources chaudes et où les baleines passent au large. Une nature brute, humide et spectaculaire, encore loin des foules.",
    flight: '≈ 4 h 00',
    budget: 2,
    budgetLabel: 'Modéré',
    season: 'Mai → septembre',
    seasonNote: 'Juin–septembre plus secs ; météo changeante toute l’année',
    duration: '6–7 jours',
    tags: ['Volcans', 'Lacs de cratère', 'Randonnée', 'Sources chaudes', 'Baleines'],
    highlights: [
      { title: 'Sete Cidades', desc: 'Deux lacs — un bleu, un vert — au fond d’un immense cratère, à São Miguel.' },
      { title: 'Lagoa do Fogo', desc: 'Le « lac de feu », cratère sauvage classé réserve naturelle.' },
      { title: 'Furnas', desc: 'Fumerolles et geysers, cozido cuit sous terre, jardins et bains thermaux.' },
      { title: 'Pico', desc: 'Le plus haut sommet du Portugal (2 351 m) et ses vignes de lave classées UNESCO.' },
      { title: 'Baleines & dauphins', desc: 'Observation au large parmi les meilleurs spots au monde.' },
      { title: 'Flores', desc: 'L’île-jardin de l’ouest, falaises ruisselantes et cascades du Poço da Ribeira do Ferreiro.' },
    ],
    pros: [
      'Nature volcanique spectaculaire et préservée',
      'Sources chaudes et piscines naturelles',
      'Sans décalage horaire, vol direct depuis Paris',
      'Encore peu touristique, accueil chaleureux',
    ],
    cons: 'Météo très changeante (microclimats) ; prévoir plusieurs jours et une voiture.',
    scene: {
      kind: 'island',
      sky: ['#74b1b0', '#d2e7da'],
      land: '#27522f',
      landBack: '#3f7444',
      accent: '#1f7a6e',
      water: '#2b8f8a',
    },
    photo: '/photos/acores/acores-01.jpg',
    gallery: gallery('acores', 9),
  },
  {
    id: 'galice',
    name: 'Galice',
    country: 'Espagne · Atlantique',
    tagline: 'La côte celte de l’Espagne — brumes, rías et fruits de mer.',
    intro:
      "Le bout vert et humide de l'Ibérie, où finit le chemin de Compostelle et où commence l'océan. Villages de pêcheurs, vignes d'Albariño et la meilleure table de poisson d'Europe.",
    flight: '≈ 2 h 00',
    budget: 2,
    budgetLabel: 'Abordable',
    season: 'Mai → septembre',
    seasonNote: 'Juin parfait ; climat océanique changeant',
    duration: '5–6 jours',
    tags: ['Gastronomie', 'Côte sauvage', 'Authentique', 'Proche', 'Vins'],
    highlights: [
      { title: 'Saint-Jacques-de-Compostelle', desc: 'Cathédrale et vieille ville en granit, classées UNESCO.' },
      { title: 'Praia das Catedrais', desc: 'Arches de pierre sculptées par l’Atlantique, à marée basse.' },
      { title: 'Îles Cíes', desc: 'Parc national, sable blanc et eau turquoise — la “plage des Caraïbes” galicienne.' },
      { title: 'Cap Finisterre', desc: 'Le “bout du monde” des Romains, fin mythique du Camino.' },
      { title: 'Ribeira Sacra', desc: 'Canyons du Sil, vignes en terrasses et monastères suspendus.' },
      { title: 'Combarro', desc: 'Hórreos (greniers sur pilotis) alignés au bord de l’eau.' },
    ],
    pros: [
      'Une des meilleures gastronomies d’Europe (poulpe, fruits de mer)',
      'Très abordable et peu touristique',
      'Court vol, dépaysement immédiat',
      'Vert, vallonné, atmosphère celtique',
    ],
    scene: {
      kind: 'coast',
      sky: ['#9bb0ad', '#dfe6dc'],
      land: '#3a5a3f',
      landBack: '#5c7a55',
      accent: '#7a8a4f',
      water: '#5f7d76',
    },
    photo: '/photos/galice/galice-01.jpg',
    gallery: gallery('galice', 19),
  },
  {
    id: 'albanie',
    name: 'Albanie',
    country: 'Balkans · Adriatique',
    tagline: 'La Méditerranée turquoise d’avant la foule — et le meilleur prix d’Europe.',
    intro:
      "La Riviera albanaise aligne des criques turquoise dignes des Cyclades, doublée de cités ottomanes en pierre classées UNESCO et de ruines antiques. Encore brut, accueillant, imbattable côté budget.",
    flight: '≈ 2 h 45',
    budget: 1,
    budgetLabel: 'Très accessible',
    season: 'Mai–juin & septembre',
    seasonNote: 'Éviter juillet–août (chaud et fréquenté)',
    duration: '6–7 jours',
    tags: ['Plages turquoise', 'Petit budget', 'Préservé', 'Histoire', 'Aventure'],
    highlights: [
      { title: 'Riviera (Ksamil, Dhërmi, Himarë)', desc: 'Eaux turquoise et criques de galets le long de la côte ionienne.' },
      { title: 'Berat', desc: '“La ville aux mille fenêtres”, maisons ottomanes empilées, UNESCO.' },
      { title: 'Gjirokastër', desc: 'Cité de pierre et son château dominant la vallée, UNESCO.' },
      { title: 'Butrint', desc: 'Ruines grecques et romaines dans un parc naturel, UNESCO.' },
      { title: 'Blue Eye (Syri i Kaltër)', desc: 'Source karstique d’un bleu impossible, au cœur de la forêt.' },
      { title: 'Tirana', desc: 'Quartier Blloku, façades colorées et Bunk’Art pour l’histoire récente.' },
    ],
    pros: [
      'Rapport qualité/prix imbattable en Europe',
      'Plages parmi les plus belles de Méditerranée',
      'Encore authentique, hors des circuits',
      'Accueil chaleureux, mélange de cultures',
    ],
    cons: 'Routes parfois lentes en montagne ; mieux vaut louer une voiture.',
    scene: {
      kind: 'riviera',
      sky: ['#3aa3c9', '#bfe8ee'],
      land: '#b07a3c',
      landBack: '#caa05a',
      accent: '#e0b25a',
      water: '#1ec3c8',
    },
    photo: '/photos/albanie/albanie-01.jpg',
    gallery: gallery('albanie', 11),
  },
  {
    id: 'irlande',
    name: 'Irlande',
    country: 'Îles Britanniques · Atlantique',
    tagline: 'Falaises battues par le vent, pubs chaleureux et vert sans fin.',
    intro:
      "L'île d'émeraude se conduit du nez au volant : road-trip côtier le long du Wild Atlantic Way, pauses dans des pubs où la musique live ne s'arrête jamais, et des paysages mélancoliques à souhait.",
    flight: '≈ 1 h 50',
    budget: 3,
    budgetLabel: 'Plus cher',
    season: 'Mai → septembre',
    seasonNote: 'Juin–juillet pour la lumière ; météo capricieuse',
    duration: '6–7 jours',
    tags: ['Road-trip', 'Falaises', 'Pubs & musique', 'Romantique', 'Anglophone'],
    highlights: [
      { title: 'Falaises de Moher', desc: '214 m de à-pic sur l’Atlantique, l’icône de l’ouest.' },
      { title: 'Ring of Kerry', desc: 'Boucle côtière mythique, montagnes, plages et villages colorés.' },
      { title: 'Connemara', desc: 'Tourbières, lacs et lumière changeante — l’Irlande de carte postale.' },
      { title: 'Galway', desc: 'Ville bohème, ruelles pavées, sessions de musique trad chaque soir.' },
      { title: 'Dublin', desc: 'Trinity College, Temple Bar et la fabrique Guinness.' },
      { title: 'Péninsule de Dingle', desc: 'Route côtière sauvage, plages et dauphins au large.' },
    ],
    pros: [
      'Ambiance des pubs et musique live unique',
      'Road-trips côtiers spectaculaires',
      'Anglophone, facile à organiser',
      'Vol très court depuis Paris',
    ],
    cons: 'Le plus cher des quatre (hébergement, restaurants) et météo imprévisible.',
    scene: {
      kind: 'highlands',
      sky: ['#8a99a0', '#d3dad6'],
      land: '#2f5236',
      landBack: '#4a6b41',
      accent: '#6f7d3a',
      water: '#516a72',
    },
    photo: '/photos/irlande/irlande-01.jpg',
    gallery: gallery('irlande', 15),
  },
]
