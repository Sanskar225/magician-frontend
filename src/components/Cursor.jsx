// src/components/Cursor.jsx
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  const posRef = useRef({ x: 0, y: 0 })
  const followerPosRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      cursor.style.left = e.clientX + 'px'
      cursor.style.top = e.clientY + 'px'
    }

    const animate = () => {
      followerPosRef.current.x += (posRef.current.x - followerPosRef.current.x) * 0.12
      followerPosRef.current.y += (posRef.current.y - followerPosRef.current.y) * 0.12
      follower.style.left = followerPosRef.current.x + 'px'
      follower.style.top = followerPosRef.current.y + 'px'
      rafRef.current = requestAnimationFrame(animate)
    }

    const onEnter = () => {
      cursor.classList.add('hovered')
      follower.classList.add('hovered')
    }

    const onLeave = () => {
      cursor.classList.remove('hovered')
      follower.classList.remove('hovered')
    }

    document.addEventListener('mousemove', onMove)
    rafRef.current = requestAnimationFrame(animate)

    const interactables = document.querySelectorAll('a, button, [data-cursor]')
    interactables.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  )
}
