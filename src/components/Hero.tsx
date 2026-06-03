import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import MaskReveal from './MaskReveal'
import { destinations } from '../data/destinations'
import { countWord } from '../lib/numbers'

/**
 * En-tête plein écran avec parallax : le soleil, la crête et le titre se
 * déplacent à des vitesses différentes au scroll. Le progrès est lissé par un
 * ressort (mouvement « beurré ») et le titre se révèle au masque, ligne à ligne.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Ressort doux par-dessus le progrès brut → parallax fluide, sans à-coups.
  const spring = useSpring(scrollYProgress, { stiffness: 90, damping: 30, mass: 0.35 })
  const p = reduce ? scrollYProgress : spring

  const sunY = useTransform(p, [0, 1], ['0%', '42%'])
  const sunScale = useTransform(p, [0, 1], [1, 1.3])
  const ridgeY = useTransform(p, [0, 1], ['0%', '-18%'])
  const titleY = useTransform(p, [0, 1], ['0%', '-44%'])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <header className="hero" id="top" ref={ref}>
      <motion.div className="hero__sun" style={{ y: sunY, scale: sunScale }} />

      <motion.div className="hero__ridge" style={{ y: ridgeY }}>
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="currentColor"
            d="M0 220 L120 180 L260 250 L420 140 L600 240 L780 120 L960 230 L1140 150 L1320 240 L1440 190 L1440 320 L0 320 Z"
          />
        </svg>
      </motion.div>

      <motion.div className="hero__inner shell" style={{ y: titleY, opacity: titleOpacity }}>
        <motion.p
          className="eyebrow hero__kicker"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Un voyage à deux · 5 à 7 jours
        </motion.p>

        <h1 className="hero__title">
          <MaskReveal trigger="mount" delay={0.18}>
            Notre prochaine
          </MaskReveal>
          <MaskReveal trigger="mount" delay={0.34} className="hero__title-em">
            <em>escapade</em>
          </MaskReveal>
        </h1>

        <motion.p
          className="hero__sub"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
        >
          {countWord(destinations.length)} directions, une décision à prendre ensemble. Faites défiler, ouvrez les coups de cœur, tranchez.
        </motion.p>

        <motion.div
          className="hero__cue"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.85 }}
        >
          <span className="dot" />
          Faire défiler
        </motion.div>
      </motion.div>
    </header>
  )
}
