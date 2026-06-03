import { useSmoothScroll } from './hooks/useSmoothScroll'
import { useDecision } from './hooks/useDecision'
import { destinations } from './data/destinations'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Intro from './components/Intro'
import DestinationSection from './components/DestinationSection'
import DecisionBoard from './components/DecisionBoard'
import Footer from './components/Footer'

export default function App() {
  useSmoothScroll()
  const { favorites, winner, toggleFavorite, pickWinner } = useDecision()

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <Hero />
      <Marquee />
      <Intro />

      <main>
        {destinations.map((dest, index) => (
          <DestinationSection
            key={dest.id}
            dest={dest}
            index={index}
            loved={favorites.has(dest.id)}
            onToggleLove={toggleFavorite}
          />
        ))}
      </main>

      <DecisionBoard favorites={favorites} winner={winner} onPick={pickWinner} />
      <Footer />
    </>
  )
}
