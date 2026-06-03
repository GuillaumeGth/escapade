import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from './Reveal'

interface Props {
  images: string[]
  name: string
}

/**
 * Mosaïque de photos « magazine » + lightbox au clic.
 * Toutes les images sont des chemins publics (cf. data/destinations.ts).
 * Navigation clavier (← → Échap) et respect de prefers-reduced-motion
 * (géré globalement dans index.css + transitions Framer Motion).
 */
export default function Gallery({ images, name }: Props) {
  const [active, setActive] = useState<number | null>(null)

  const close = useCallback(() => setActive(null), [])
  const step = useCallback(
    (dir: number) =>
      setActive((cur) => (cur === null ? cur : (cur + dir + images.length) % images.length)),
    [images.length],
  )

  // Navigation clavier quand la lightbox est ouverte.
  useEffect(() => {
    if (active === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [active, close, step])

  if (images.length === 0) return null

  return (
    <div className="gallery">
      <p className="section-label">En images</p>
      <div className="gallery__grid">
        {images.map((src, i) => (
          <Reveal
            key={src}
            delay={0.03 * (i % 4)}
            className={`gallery__item${i % 5 === 0 ? ' gallery__item--wide' : ''}`}
          >
            <button
              type="button"
              className="gallery__cell"
              onClick={() => setActive(i)}
              aria-label={`Agrandir la photo ${i + 1} de ${name}`}
            >
              <img src={src} alt={`${name} — photo ${i + 1}`} loading="lazy" />
            </button>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={`Photos de ${name}`}
          >
            <button type="button" className="lightbox__close" onClick={close} aria-label="Fermer">
              ✕
            </button>
            <button
              type="button"
              className="lightbox__nav lightbox__nav--prev"
              onClick={(e) => {
                e.stopPropagation()
                step(-1)
              }}
              aria-label="Photo précédente"
            >
              ‹
            </button>
            <motion.img
              key={active}
              src={images[active]}
              alt={`${name} — photo ${active + 1}`}
              className="lightbox__img"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              drag
              dragSnapToOrigin
              dragElastic={0.5}
              dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 130) close()
                else if (info.offset.x < -90) step(1)
                else if (info.offset.x > 90) step(-1)
              }}
            />
            <button
              type="button"
              className="lightbox__nav lightbox__nav--next"
              onClick={(e) => {
                e.stopPropagation()
                step(1)
              }}
              aria-label="Photo suivante"
            >
              ›
            </button>
            <span className="lightbox__count">
              {active + 1} / {images.length}
              <span className="lightbox__hint">Glissez ← → · vers le bas pour fermer</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
