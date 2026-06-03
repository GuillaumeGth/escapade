import { useCallback, useEffect, useState } from 'react'

const FAV_KEY = 'escapade.favorites'
const WIN_KEY = 'escapade.winner'

function readSet(key: string): Set<string> {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return new Set()
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? new Set(parsed.filter((x): x is string => typeof x === 'string')) : new Set()
  } catch {
    return new Set()
  }
}

function readString(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

/**
 * État de décision partagé (coups de cœur + destination retenue), persisté en
 * localStorage. Aucun réseau : la décision reste sur l'appareil du couple.
 */
export function useDecision() {
  const [favorites, setFavorites] = useState<Set<string>>(() => readSet(FAV_KEY))
  const [winner, setWinner] = useState<string | null>(() => readString(WIN_KEY))

  useEffect(() => {
    try {
      localStorage.setItem(FAV_KEY, JSON.stringify([...favorites]))
    } catch {
      /* stockage indisponible : on ignore silencieusement */
    }
  }, [favorites])

  useEffect(() => {
    try {
      if (winner) localStorage.setItem(WIN_KEY, winner)
      else localStorage.removeItem(WIN_KEY)
    } catch {
      /* idem */
    }
  }, [winner])

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const pickWinner = useCallback((id: string) => {
    setWinner((prev) => (prev === id ? null : id))
  }, [])

  return { favorites, winner, toggleFavorite, pickWinner }
}
