import { useEffect, useState } from 'react'
import { destinations } from '../data/destinations'
import { scrollToId } from '../lib/scroll'

/**
 * Navigation par points (côté écran) pour sauter d'une destination à l'autre.
 * Le point de la section visible est mis en valeur via IntersectionObserver.
 * S'efface tant qu'on est dans le héros / l'intro (aucune section active).
 */
export default function DotNav() {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const sections = destinations
      .map((d) => document.getElementById(d.id))
      .filter((el): el is HTMLElement => el !== null)

    const io = new IntersectionObserver(
      (entries) => {
        // La section dont le centre est le plus proche du milieu de l'écran gagne.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: [0.1, 0.5, 1] },
    )

    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  return (
    <nav className={`dotnav${active ? ' is-on' : ''}`} aria-label="Aller à une destination">
      {destinations.map((d, i) => {
        const on = active === d.id
        return (
          <button
            key={d.id}
            type="button"
            className={`dotnav__dot${on ? ' on' : ''}`}
            onClick={() => scrollToId(d.id)}
            aria-label={`${d.name}${on ? ' (section actuelle)' : ''}`}
            aria-current={on ? 'true' : undefined}
          >
            <span className="dotnav__label">{d.name}</span>
            <i aria-hidden="true">{String(i + 1).padStart(2, '0')}</i>
          </button>
        )
      })}
    </nav>
  )
}
