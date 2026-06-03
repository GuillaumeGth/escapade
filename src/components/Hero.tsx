import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * En-tête plein écran avec parallax : le soleil, la crête et le titre se
 * déplacent à des vitesses différentes au scroll pour créer la profondeur.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const sunY = useTransform(scrollYProgress, [0, 1], ['0%', '38%'])
  const sunScale = useTransform(scrollYProgress, [0, 1], [1, 1.25])
  const ridgeY = useTransform(scrollYProgress, [0, 1], ['0%', '-16%'])
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-40%'])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <header className="hero" ref={ref}>
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
          <motion.span
            style={{ display: 'block' }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            Notre prochaine
          </motion.span>
          <motion.em
            style={{ display: 'block' }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            escapade
          </motion.em>
        </h1>

        <motion.p
          className="hero__sub"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Quatre directions, une décision à prendre ensemble. Faites défiler, ouvrez les coups de cœur, tranchez.
        </motion.p>

        <motion.div
          className="hero__cue"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <span className="dot" />
          Faire défiler
        </motion.div>
      </motion.div>
    </header>
  )
}
