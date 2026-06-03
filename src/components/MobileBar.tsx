import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AnimatedNumber from './AnimatedNumber'
import { scrollToId } from '../lib/scroll'

interface Props {
  favoritesCount: number
  winnerName: string | null
}

/**
 * Barre d'action flottante mobile, façon app : apparaît une fois le héros passé,
 * disparaît dès qu'on atteint le tableau de décision (pour ne pas le recouvrir).
 * Affiche le nombre de coups de cœur et raccourcit vers la décision.
 */
export default function MobileBar({ favoritesCount, winnerName }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('top')
    const decision = document.getElementById('decision')
    const targets = [hero, decision].filter((el): el is HTMLElement => el !== null)
    if (targets.length === 0) return

    const state = new Map<Element, boolean>()
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => state.set(e.target, e.isIntersecting))
        // Visible seulement « au milieu » : ni dans le héros, ni dans la décision.
        const anchorVisible = [...state.values()].some(Boolean)
        setVisible(!anchorVisible)
      },
      { threshold: 0.12 },
    )
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="mobilebar"
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        >
          <div className="mobilebar__status">
            <span className="mobilebar__heart" aria-hidden="true">
              ♥
            </span>
            <span className="mobilebar__count">
              <AnimatedNumber value={favoritesCount} />
            </span>
            <span className="mobilebar__label">
              {winnerName ? `Retenu · ${winnerName}` : favoritesCount > 1 ? 'coups de cœur' : 'coup de cœur'}
            </span>
          </div>
          <button type="button" className="mobilebar__cta" onClick={() => scrollToId('decision')}>
            Décider <span aria-hidden="true">→</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
