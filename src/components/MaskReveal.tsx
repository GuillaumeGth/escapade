import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface Props {
  children: ReactNode
  /** Délai avant l'apparition (s). */
  delay?: number
  /** 'view' = au scroll (défaut) · 'mount' = dès l'affichage (héros). */
  trigger?: 'view' | 'mount'
  className?: string
}

/**
 * Révélation « au masque » : le texte glisse depuis sous une ligne invisible,
 * comme dans les sites de studio. Le conteneur masque le débordement, l'enfant
 * remonte de 110 % à 0. Se réduit à un simple fondu en prefers-reduced-motion.
 */
export default function MaskReveal({ children, delay = 0, trigger = 'view', className }: Props) {
  const reduce = useReducedMotion()

  const inner = reduce
    ? { initial: { opacity: 0 }, to: { opacity: 1 } }
    : { initial: { y: '110%' }, to: { y: '0%' } }

  const animateProps =
    trigger === 'mount'
      ? { animate: inner.to }
      : { whileInView: inner.to, viewport: { once: true, margin: '0px 0px -10% 0px' } }

  return (
    <span className={className} style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.04em' }}>
      <motion.span
        style={{ display: 'block', willChange: 'transform' }}
        initial={inner.initial}
        {...animateProps}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  )
}
