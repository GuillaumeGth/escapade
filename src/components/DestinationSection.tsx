import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import type { Destination } from '../data/destinations'
import SceneArt from './SceneArt'
import Reveal from './Reveal'
import MaskReveal from './MaskReveal'
import Gallery from './Gallery'
import { haptic } from '../lib/haptics'

interface Props {
  dest: Destination
  index: number
  loved: boolean
  onToggleLove: (id: string) => void
}

const BUDGET_SLOTS = [1, 2, 3] as const

function Heart({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2}>
      <path d="M12 21s-7.5-4.6-10-9.3C.4 8.3 2 5 5.2 5c2 0 3.3 1.1 4.1 2.3C10.1 6.1 11.4 5 13.4 5 16.6 5 18.2 8.3 16.6 11.7 14 16.4 12 21 12 21z" />
    </svg>
  )
}

export default function DestinationSection({ dest, index, loved, onToggleLove }: Props) {
  const mediaRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: mediaRef,
    offset: ['start end', 'end start'],
  })
  const spring = useSpring(scrollYProgress, { stiffness: 80, damping: 28, mass: 0.4 })
  const p = reduce ? scrollYProgress : spring
  const sceneY = useTransform(p, [0, 1], ['-11%', '11%'])
  const sceneScale = useTransform(p, [0, 0.5, 1], [1.06, 1, 1.06])

  const flip = index % 2 === 1
  const num = String(index + 1).padStart(2, '0')

  const onToggle = () => {
    haptic(loved ? 8 : [10, 30, 14])
    onToggleLove(dest.id)
  }

  return (
    <section className={`dest${flip ? ' dest--flip' : ''}`} id={dest.id}>
      <div className="shell dest__grid">
        {/* Visuel parallax — révélé par un volet qui se lève au scroll */}
        <motion.div
          className="dest__media"
          ref={mediaRef}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 36, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '0px 0px -12% 0px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div style={{ y: sceneY, scale: sceneScale }} className="dest__scene">
            <SceneArt scene={dest.scene} />
          </motion.div>
          {dest.photo ? (
            <motion.img
              src={dest.photo}
              alt={dest.name}
              loading="lazy"
              className="dest__scene"
              style={{ objectFit: 'cover', zIndex: 1, y: sceneY, scale: sceneScale }}
            />
          ) : null}
          <div className="dest__media-grain" />
          <span className="dest__index">{num}</span>
          <div className="dest__place-on-media">
            <div className="dest__country">{dest.country}</div>
            <div className="dest__name">{dest.name}</div>
          </div>
        </motion.div>

        {/* Contenu */}
        <div className="dest__body">
          <MaskReveal className="dest__tagline">{dest.tagline}</MaskReveal>
          <Reveal delay={0.06}>
            <p className="dest__intro">{dest.intro}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="chips">
              {dest.tags.map((tag) => (
                <span className="chip" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <dl className="facts">
              <div className="fact">
                <dt>Vol depuis Paris</dt>
                <dd>{dest.flight}</dd>
              </div>
              <div className="fact">
                <dt>Budget</dt>
                <dd>
                  <span className="budget-dots">
                    {BUDGET_SLOTS.map((slot) => (
                      <i key={slot} className={slot <= dest.budget ? 'on' : ''} />
                    ))}
                  </span>
                  <small>{dest.budgetLabel}</small>
                </dd>
              </div>
              <div className="fact">
                <dt>Saison</dt>
                <dd>
                  {dest.season}
                  <small>{dest.seasonNote}</small>
                </dd>
              </div>
              <div className="fact">
                <dt>Durée idéale</dt>
                <dd>{dest.duration}</dd>
              </div>
            </dl>
          </Reveal>

          <p className="section-label">À voir absolument</p>
          <div className="highlights">
            {dest.highlights.map((h, i) => (
              <Reveal key={h.title} delay={0.04 * i}>
                <div className="highlight">
                  <span className="highlight__num">{String(i + 1).padStart(2, '0')}</span>
                  <span>
                    <span className="highlight__t">{h.title}</span>
                    <br />
                    <span className="highlight__d">{h.desc}</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="section-label">Pourquoi on aimerait</p>
          <div className="pros">
            {dest.pros.map((p) => (
              <Reveal key={p}>
                <div className="pro">{p}</div>
              </Reveal>
            ))}
          </div>

          {dest.cons ? <p className="cons-note">À garder en tête — {dest.cons}</p> : null}

          {dest.gallery && dest.gallery.length > 0 ? (
            <Gallery images={dest.gallery} name={dest.name} />
          ) : null}

          <Reveal>
            <motion.button
              type="button"
              className={`fav${loved ? ' on' : ''}`}
              onClick={onToggle}
              aria-pressed={loved}
              whileTap={{ scale: 0.94 }}
              transition={{ type: 'spring', stiffness: 500, damping: 28 }}
            >
              <Heart filled={loved} />
              {loved ? 'Coup de cœur ajouté' : 'Ajouter aux coups de cœur'}
            </motion.button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
