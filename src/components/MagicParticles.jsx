// src/components/MagicParticles.jsx
import { useEffect, useRef } from 'react'

export default function MagicParticles({ count = 25 }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // 🔥 Clear container first (important for StrictMode)
    container.innerHTML = ''

    const fragment = document.createDocumentFragment()

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div')
      particle.className = 'particle'

      const size = Math.random() * 3 + 1
      const x = Math.random() * 100
      const duration = Math.random() * 20 + 15
      const delay = Math.random() * 20
      const drift = (Math.random() - 0.5) * 200 + 'px'

      particle.style.left = `${x}%`
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      particle.style.animationDuration = `${duration}s`
      particle.style.animationDelay = `-${delay}s`
      particle.style.setProperty('--drift', drift)
      particle.style.opacity = Math.random() * 0.6 + 0.2

      // ⭐ Gold star particles occasionally
      if (Math.random() > 0.7) {
        particle.textContent = '✦'
        particle.style.fontSize = `${size * 4}px`
        particle.style.width = 'auto'
        particle.style.height = 'auto'
        particle.style.background = 'transparent'
        particle.style.color = 'rgba(201, 162, 39, 0.4)'
      }

      fragment.appendChild(particle)
    }

    container.appendChild(fragment)

    return () => {
      // 🔥 Clean safely
      container.innerHTML = ''
    }
  }, [count])

  return (
    <div
      ref={containerRef}
      className="particles-container"
      aria-hidden="true"
    />
  )
}