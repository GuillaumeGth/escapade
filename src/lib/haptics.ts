/**
 * Retour haptique léger sur mobile (Vibration API). Silencieux et sans effet là
 * où l'API n'existe pas (desktop, iOS Safari) — purement décoratif, jamais requis.
 */
export function haptic(pattern: number | number[] = 12): void {
  if (typeof navigator === 'undefined' || !('vibrate' in navigator)) return
  try {
    navigator.vibrate(pattern)
  } catch {
    /* certains navigateurs bloquent : on ignore */
  }
}
