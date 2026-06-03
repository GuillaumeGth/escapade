import { destinations } from '../data/destinations'
import { countWord } from '../lib/numbers'

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__mark">Escapade</p>
      <p className="footer__note">
        Fait à deux, pour décider à deux. {countWord(destinations.length)} destinations, un seul billet à réserver.
      </p>
    </footer>
  )
}
