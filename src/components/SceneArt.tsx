import { useId } from 'react'
import type { Scene } from '../data/destinations'

interface Props {
  scene: Scene
}

/**
 * Décor vectoriel génératif par destination. Toujours rendu (zéro dépendance
 * réseau) : sert de visuel principal et de repli si une photo est ajoutée plus
 * tard mais ne charge pas. viewBox portrait 400×500 pour coller au cadre 4/5.
 */
export default function SceneArt({ scene }: Props) {
  const uid = useId().replace(/:/g, '')
  const skyId = `sky-${uid}`
  const waterId = `water-${uid}`
  const water = scene.water ?? scene.sky[0]

  return (
    <svg
      className="scene-svg"
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={skyId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={scene.sky[0]} />
          <stop offset="100%" stopColor={scene.sky[1]} />
        </linearGradient>
        <linearGradient id={waterId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={water} stopOpacity="0.95" />
          <stop offset="100%" stopColor={scene.accent} stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* Ciel */}
      <rect width="400" height="500" fill={`url(#${skyId})`} />

      {/* Soleil bas et chaud, commun à toutes les scènes */}
      <circle cx="300" cy="120" r="46" fill="#f6d690" opacity="0.85" />
      <circle cx="300" cy="120" r="70" fill="#f6d690" opacity="0.25" />

      {scene.kind === 'island' && (
        <>
          <path d="M0 300 L70 170 L150 280 L210 150 L300 300 L400 210 L400 500 L0 500 Z" fill={scene.landBack} />
          <path d="M0 360 L90 240 L180 350 L260 230 L360 360 L400 320 L400 500 L0 500 Z" fill={scene.land} />
          <rect y="430" width="400" height="70" fill={`url(#${waterId})`} />
          <path d="M0 440 Q100 430 200 440 T400 440 L400 500 L0 500 Z" fill={scene.accent} opacity="0.6" />
        </>
      )}

      {scene.kind === 'coast' && (
        <>
          <path d="M0 320 Q120 250 250 300 T400 280 L400 500 L0 500 Z" fill={scene.landBack} opacity="0.7" />
          <path d="M0 380 Q140 300 300 360 T400 350 L400 500 L0 500 Z" fill={scene.land} />
          <rect y="400" width="400" height="100" fill={`url(#${waterId})`} />
          <path d="M0 400 Q260 380 400 410 L400 430 Q160 410 0 430 Z" fill="#ffffff" opacity="0.18" />
        </>
      )}

      {scene.kind === 'riviera' && (
        <>
          {/* Mer turquoise dominante */}
          <rect y="250" width="400" height="250" fill={`url(#${waterId})`} />
          {/* Falaise ocre à droite */}
          <path d="M260 250 L400 210 L400 500 L300 500 Z" fill={scene.land} />
          <path d="M250 320 L400 290 L400 500 L290 500 Z" fill={scene.landBack} opacity="0.8" />
          {/* Plage de galets */}
          <path d="M0 470 Q120 450 260 480 L400 470 L400 500 L0 500 Z" fill="#ecd9b0" />
          {/* Reflets */}
          <path d="M20 360 Q90 350 150 365 L150 372 Q90 360 20 370 Z" fill="#ffffff" opacity="0.35" />
        </>
      )}

      {scene.kind === 'highlands' && (
        <>
          {/* Mer sous les falaises */}
          <rect y="370" width="400" height="130" fill={`url(#${waterId})`} />
          {/* Falaise plate verte tombant à pic */}
          <path d="M0 250 Q120 235 230 255 L260 250 L260 370 L0 370 Z" fill={scene.land} />
          <path d="M260 250 L400 240 L400 370 L260 370 Z" fill={scene.landBack} />
          {/* Écume au pied */}
          <path d="M0 365 Q130 355 260 368 L260 380 Q130 368 0 380 Z" fill="#ffffff" opacity="0.4" />
          {/* Brume basse */}
          <rect y="300" width="400" height="22" fill="#ffffff" opacity="0.12" />
        </>
      )}
    </svg>
  )
}
