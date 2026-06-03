import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { destinations } from '../data/destinations'
import Reveal from './Reveal'
import MaskReveal from './MaskReveal'
import AnimatedNumber from './AnimatedNumber'
import { haptic } from '../lib/haptics'

interface Props {
  favorites: Set<string>
  winner: string | null
  onPick: (id: string) => void
}

/**
 * Message romantique pré-rempli envoyé via WhatsApp quand on choisit une
 * destination. Pas de numéro imposé : WhatsApp laisse choisir le contact.
 * Le nom de la destination clôt le message (« sous les étoiles de Madère »),
 * avec élision devant une voyelle (« d'Albanie », « d'Irlande »).
 */
function loveMessage(name: string): string {
  const startsWithVowel = /^[aeiouéèêàâîïôöûüy]/i.test(name)
  const place = startsWithVowel ? `d'${name}` : `de ${name}`
  return (
    "Mon amour, je veux découvrir le monde avec toi. À tes côtés je n'ai peur de rien, " +
    `j'irai n'importe où tant que l'on est ensemble — mais surtout, fais-moi l'amour sous les étoiles ${place}.`
  )
}

function openWhatsApp(name: string) {
  const url = `https://wa.me/?text=${encodeURIComponent(loveMessage(name))}`
  window.open(url, '_blank', 'noopener,noreferrer')
}

/**
 * Tableau de décision final : récapitule les destinations, met en avant les
 * coups de cœur et permet de désigner « la » destination retenue (persistée
 * en local). Aucune interprétation automatique — c'est le couple qui tranche.
 */
export default function DecisionBoard({ favorites, winner, onPick }: Props) {
  // Coups de cœur d'abord, sans réordonner brutalement la liste de base.
  const ordered = useMemo(() => {
    return [...destinations].sort((a, b) => {
      const fa = favorites.has(a.id) ? 0 : 1
      const fb = favorites.has(b.id) ? 0 : 1
      return fa - fb
    })
  }, [favorites])

  const winnerName = winner ? destinations.find((d) => d.id === winner)?.name : null

  return (
    <section className="board" id="decision">
      <div className="shell">
        <Reveal>
          <p className="eyebrow board__eyebrow">À vous de jouer</p>
        </Reveal>
        <h2 className="board__title">
          <MaskReveal>On part</MaskReveal>
          <MaskReveal delay={0.08} className="board__title-em">
            <em>où</em>&nbsp;?
          </MaskReveal>
        </h2>
        <Reveal delay={0.14}>
          <p className="board__sub">
            Vos coups de cœur remontent en haut. Touchez une carte pour désigner la grande gagnante — le choix
            reste enregistré sur cet appareil.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <p className="board__tally" aria-live="polite">
            <span className="board__tally-num">
              <AnimatedNumber value={favorites.size} />
            </span>
            {favorites.size > 1 ? ' coups de cœur' : ' coup de cœur'} sur {destinations.length}
          </p>
        </Reveal>

        <div className="ballots">
          {ordered.map((d, i) => {
            const isWinner = winner === d.id
            const isLoved = favorites.has(d.id)
            return (
              <Reveal key={d.id} delay={0.05 * i}>
                <motion.button
                  type="button"
                  className={`ballot${isWinner ? ' win' : ''}`}
                  onClick={() => {
                    haptic([12, 40, 18])
                    onPick(d.id)
                    openWhatsApp(d.name)
                  }}
                  aria-pressed={isWinner}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 480, damping: 30 }}
                >
                  <span className="ballot__rank">{String(i + 1).padStart(2, '0')}</span>
                  <span className="ballot__name">{d.name}</span>
                  {isLoved ? <span className="ballot__loved">♥ coup de cœur</span> : null}
                  <span className="ballot__pick">{isWinner ? 'On y va !' : 'Choisir'}</span>
                </motion.button>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={0.1}>
          <p className="board__verdict">
            {winnerName ? (
              <>
                Prochaine escapade : <b>{winnerName}</b>. Reste à réserver les billets.
              </>
            ) : (
              <>Pas encore décidé ? Relisez les coups de cœur et tranchez ci-dessus.</>
            )}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
