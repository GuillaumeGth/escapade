import { useEffect } from 'react'
import { animate, motion, useMotionValue, useTransform, useReducedMotion } from 'framer-motion'

interface Props {
  value: number
}

/**
 * Nombre qui « roule » jusqu'à sa valeur (compteur animé). Utilisé pour les
 * coups de cœur. Saute directement à la valeur en prefers-reduced-motion.
 */
export default function AnimatedNumber({ value }: Props) {
  const reduce = useReducedMotion()
  const mv = useMotionValue(value)
  const rounded = useTransform(mv, (v) => Math.round(v))

  useEffect(() => {
    if (reduce) {
      mv.set(value)
      return
    }
    const controls = animate(mv, value, { duration: 0.5, ease: [0.22, 1, 0.36, 1] })
    return () => controls.stop()
  }, [value, reduce, mv])

  return <motion.span>{rounded}</motion.span>
}
