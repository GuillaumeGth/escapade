import Reveal from './Reveal'
import { destinations } from '../data/destinations'
import { countWord } from '../lib/numbers'

/**
 * Section d'ouverture : pose le cadre du choix (court séjour, destinations finalistes).
 */
export default function Intro() {
  return (
    <section className="intro shell" id="intro">
      <Reveal>
        <p className="eyebrow">Le brief</p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="intro__lead">
          Cinq à sept jours, deux billets, et l’envie d’un <b>vrai dépaysement</b> sans traverser la planète.
        </h2>
      </Reveal>

      <dl className="intro__meta">
        <Reveal delay={0.05}>
          <div>
            <dt>Durée</dt>
            <dd>Court séjour</dd>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div>
            <dt>Au départ de</dt>
            <dd>Paris</dd>
          </div>
        </Reveal>
        <Reveal delay={0.19}>
          <div>
            <dt>Finalistes</dt>
            <dd>{countWord(destinations.length)}</dd>
          </div>
        </Reveal>
      </dl>
    </section>
  )
}
