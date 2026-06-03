/**
 * Écrit un petit entier en toutes lettres, en français et capitalisé
 * (« Quatre », « Cinq », « Six »…). Sert à ce que les textes qui annoncent le
 * nombre de destinations restent justes quand on en ajoute ou en retire, sans
 * tomber dans le « 6 » qui jurerait avec le ton magazine.
 * Repli sur le chiffre au-delà de la table (cas improbable ici).
 */
const WORDS = [
  'zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six',
  'sept', 'huit', 'neuf', 'dix', 'onze', 'douze',
]

export function countWord(n: number): string {
  const word = WORDS[n] ?? String(n)
  return word.charAt(0).toUpperCase() + word.slice(1)
}
