import type Lenis from 'lenis'

/**
 * Pont entre le smooth-scroll global (Lenis, monté dans useSmoothScroll) et les
 * composants qui veulent déclencher un défilement doux vers une ancre
 * (navigation par points, barre d'action mobile). On garde une référence unique
 * au module plutôt que d'écrire le scroll dans chaque composant.
 */
let lenisRef: Lenis | null = null

export function registerLenis(instance: Lenis | null): void {
  lenisRef = instance
}

/** Fait défiler en douceur jusqu'à l'élément portant cet `id`. */
export function scrollToId(id: string): void {
  const el = document.getElementById(id)
  if (!el) return
  if (lenisRef) {
    lenisRef.scrollTo(el, { offset: -16, duration: 1.2 })
  } else {
    // Repli (prefers-reduced-motion : Lenis n'est pas actif).
    el.scrollIntoView({ block: 'start' })
  }
}
