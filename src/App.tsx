import { useSmoothScroll } from './hooks/useSmoothScroll'
import { useDecision } from './hooks/useDecision'
import { destinations } from './data/destinations'
import ScrollProgress from './components/ScrollProgress'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Intro from './components/Intro'
import DestinationSection from './components/DestinationSection'
import DecisionBoard from './components/DecisionBoard'
import Footer from './components/Footer'
import DotNav from './components/DotNav'
import MobileBar from './components/MobileBar'

export default function App() {
  useSmoothScroll()
  const { favorites, winner, toggleFavorite, pickWinner } = useDecision()

  const winnerName = winner ? destinations.find((d) => d.id === winner)?.name ?? null : null

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <ScrollProgress />
      <DotNav />

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

      <MobileBar favoritesCount={favorites.size} winnerName={winnerName} />
    </>
  )
}
