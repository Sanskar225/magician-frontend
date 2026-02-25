// src/components/LoadingScreen.jsx
import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [hidden, setHidden] = useState(false)
  const [progress, setProgress] = useState(0)
  const [magicWords, setMagicWords] = useState([
    'Abracadabra',
    'Presto',
    'Sim Sala Bim',
    'Hocus Pocus',
    'Alakazam'
  ])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, 30)

    // Magic word rotation
    const wordInterval = setInterval(() => {
      setCurrentWordIndex(prev => (prev + 1) % magicWords.length)
    }, 400)

    // Hide loading screen
    const timer = setTimeout(() => setHidden(true), 2000)

    return () => {
      clearTimeout(timer)
      clearInterval(progressInterval)
      clearInterval(wordInterval)
    }
  }, [magicWords.length])

  // Create floating particles
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
    symbol: ['✦', '✧', '⚡', '✨', '💫', '🎩'][Math.floor(Math.random() * 6)]
  }))

  return (
    <div className={`loading-screen ${hidden ? 'hidden' : ''}`} aria-hidden="true">
      {/* Floating magical particles */}
      <div className="loading-particles">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="loading-particle"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`
            }}
          >
            {particle.symbol}
          </div>
        ))}
      </div>

      {/* Mystical circle container */}
      <div className="loading-circle">
        <div className="loading-circle-inner">
          {/* Rotating rings */}
          <div className="loading-ring ring-1"></div>
          <div className="loading-ring ring-2"></div>
          <div className="loading-ring ring-3"></div>
          
          {/* Central symbol */}
          <div className="loading-symbol-container">
            <div className="loading-symbol-main">✦</div>
            <div className="loading-symbol-glow"></div>
          </div>
        </div>
      </div>

      {/* Magic word display */}
      <div className="loading-magic-word">
        <span className="loading-word-prefix">✨</span>
        <span className="loading-word">{magicWords[currentWordIndex]}</span>
        <span className="loading-word-suffix">✨</span>
      </div>

      {/* Progress bar with magic effect */}
      <div className="loading-progress-container">
        <div className="loading-progress-bar">
          <div 
            className="loading-progress-fill"
            style={{ width: `${progress}%` }}
          >
            <div className="progress-glow"></div>
          </div>
        </div>
        <div className="loading-progress-text">{progress}%</div>
      </div>

      {/* Mystical quote */}
      <div className="loading-quote">
        <span className="quote-line">“</span>
        The magic is about to begin
        <span className="quote-line">”</span>
      </div>

      {/* Stage curtain effect at bottom */}
      <div className="loading-curtain">
        <div className="curtain-left"></div>
        <div className="curtain-right"></div>
      </div>
    </div>
  )
}