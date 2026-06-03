import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { destinations } from '../data/destinations'

const LOOP = [0, 1] as const

/**
 * Bandeau défilant infini avec les noms des destinations. L'animation est
 * purement décorative (transform), donc fluide et peu coûteuse.
 */
export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <motion.div
        className="marquee__track"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
      >
        {LOOP.map((loop) => (
          <Fragment key={loop}>
            {destinations.map((d) => (
              <span key={`${loop}-${d.id}`}>
                {d.name}
                <span className="marquee__star"> ✦ </span>
              </span>
            ))}
          </Fragment>
        ))}
      </motion.div>
    </div>
  )
}
