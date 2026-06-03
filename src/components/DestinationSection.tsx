import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { Destination } from '../data/destinations'
import SceneArt from './SceneArt'
import Reveal from './Reveal'

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
  const { scrollYProgress } = useScroll({
    target: mediaRef,
    offset: ['start end', 'end start'],
  })
  const sceneY = useTransform(scrollYProgress, [0, 1], ['-9%', '9%'])

  const flip = index % 2 === 1
  const num = String(index + 1).padStart(2, '0')

  return (
    <section className={`dest${flip ? ' dest--flip' : ''}`} id={dest.id}>
      <div className="shell dest__grid">
        {/* Visuel parallax */}
        <div className="dest__media" ref={mediaRef}>
          <motion.div style={{ y: sceneY }} className="dest__scene">
            <SceneArt scene={dest.scene} />
          </motion.div>
          {dest.photo ? (
            <img
              src={dest.photo}
              alt={dest.name}
              loading="lazy"
              className="dest__scene"
              style={{ objectFit: 'cover', zIndex: 1 }}
            />
          ) : null}
          <div className="dest__media-grain" />
          <span className="dest__index">{num}</span>
          <div className="dest__place-on-media">
            <div className="dest__country">{dest.country}</div>
            <div className="dest__name">{dest.name}</div>
          </div>
        </div>

        {/* Contenu */}
        <div className="dest__body">
          <Reveal>
            <p className="dest__tagline">{dest.tagline}</p>
          </Reveal>
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

          <Reveal>
            <button
              type="button"
              className={`fav${loved ? ' on' : ''}`}
              onClick={() => onToggleLove(dest.id)}
              aria-pressed={loved}
            >
              <Heart filled={loved} />
              {loved ? 'Coup de cœur ajouté' : 'Ajouter aux coups de cœur'}
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
