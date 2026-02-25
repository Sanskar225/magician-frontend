// src/components/Cursor.jsx
import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  const sparkleContainerRef = useRef(null)
  const posRef = useRef({ x: 0, y: 0 })
  const followerPosRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    const sparkleContainer = sparkleContainerRef.current
    if (!cursor || !follower || !sparkleContainer) return

    // Create sparkle trail
    const createSparkle = (x, y) => {
      const sparkle = document.createElement('div')
      sparkle.className = 'cursor-sparkle'
      sparkle.innerHTML = ['✦', '✧', '⚡', '✨', '💫'][Math.floor(Math.random() * 5)]
      sparkle.style.left = x + 'px'
      sparkle.style.top = y + 'px'
      sparkle.style.fontSize = Math.random() * 15 + 10 + 'px'
      sparkle.style.opacity = '0.6'
      sparkle.style.color = `hsl(${45 + Math.random() * 20}, 80%, 60%)`
      sparkle.style.position = 'fixed'
      sparkle.style.pointerEvents = 'none'
      sparkle.style.zIndex = '999997'
      sparkle.style.fontFamily = 'var(--font-display, Arial)'
      sparkle.style.animation = 'sparkleFade 0.8s forwards'
      sparkleContainer.appendChild(sparkle)

      setTimeout(() => sparkle.remove(), 800)
    }

    let lastSparkleTime = 0
    const sparkleInterval = 50

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      cursor.style.left = e.clientX + 'px'
      cursor.style.top = e.clientY + 'px'

      const now = Date.now()
      if (now - lastSparkleTime > sparkleInterval && !isHovering) {
        createSparkle(
          e.clientX + (Math.random() - 0.5) * 20,
          e.clientY + (Math.random() - 0.5) * 20
        )
        lastSparkleTime = now
      }
    }

    const animate = () => {
      followerPosRef.current.x += (posRef.current.x - followerPosRef.current.x) * 0.12
      followerPosRef.current.y += (posRef.current.y - followerPosRef.current.y) * 0.12
      follower.style.left = followerPosRef.current.x + 'px'
      follower.style.top = followerPosRef.current.y + 'px'

      // Add rotation based on movement
      const dx = posRef.current.x - followerPosRef.current.x
      const dy = posRef.current.y - followerPosRef.current.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      if (distance > 1) {
        const angle = Math.atan2(dy, dx) * 180 / Math.PI
        follower.style.transform = `translate(-50%, -50%) rotate(${angle}deg) scale(${1 + distance * 0.02})`
      } else {
        follower.style.transform = 'translate(-50%, -50%) rotate(0deg) scale(1)'
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    const onEnter = (e) => {
      setIsHovering(true)
      const target = e.target
      const isLink = target.tagName === 'A' || target.closest('a')
      const isButton = target.tagName === 'BUTTON' || target.closest('button')

      cursor.classList.add('hovered')
      follower.classList.add('hovered')

      if (isLink) {
        cursor.classList.add('link-hover')
        follower.classList.add('link-hover')
        // Create burst of sparkles
        for (let i = 0; i < 5; i++) {
          setTimeout(() => {
            createSparkle(
              posRef.current.x + (Math.random() - 0.5) * 40,
              posRef.current.y + (Math.random() - 0.5) * 40
            )
          }, i * 50)
        }
      } else if (isButton) {
        cursor.classList.add('button-hover')
        follower.classList.add('button-hover')
      }
    }

    const onLeave = () => {
      setIsHovering(false)
      cursor.classList.remove('hovered', 'link-hover', 'button-hover')
      follower.classList.remove('hovered', 'link-hover', 'button-hover')
      follower.style.transform = 'translate(-50%, -50%) rotate(0deg) scale(1)'
    }

    const onMouseDown = () => {
      cursor.classList.add('clicking')
      follower.classList.add('clicking')
      
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          createSparkle(
            posRef.current.x + (Math.random() - 0.5) * 50,
            posRef.current.y + (Math.random() - 0.5) * 50
          )
        }, i * 30)
      }
    }

    const onMouseUp = () => {
      cursor.classList.remove('clicking')
      follower.classList.remove('clicking')
    }

    // Hide default cursor
    document.body.style.cursor = 'none'

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    rafRef.current = requestAnimationFrame(animate)

    const interactables = document.querySelectorAll(
      'a, button, [data-cursor], .nav-link, .btn, .social-link, .footer-link'
    )
    
    interactables.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      cancelAnimationFrame(rafRef.current)
      document.body.style.cursor = 'auto'
      
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [isHovering])

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower">
        <span className="follower-star">✦</span>
      </div>
      <div ref={sparkleContainerRef} className="cursor-sparkle-container" />
    </>
  )
}