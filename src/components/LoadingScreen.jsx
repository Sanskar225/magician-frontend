// src/components/LoadingScreen.jsx
import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 1800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`loading-screen ${hidden ? 'hidden' : ''}`} aria-hidden="true">
      <div className="loading-symbol">✦</div>
      <div className="loading-bar" />
      <div className="loading-text">Preparing the show</div>
    </div>
  )
}
