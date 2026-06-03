import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Fine barre de progression en haut de page, lissée par un ressort pour un
 * mouvement « beurré ». Décorative (aria-hidden) et peu coûteuse (transform).
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 })

  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
}
