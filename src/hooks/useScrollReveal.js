// src/hooks/useScrollReveal.js
import { useEffect, useRef } from 'react'

export const useScrollReveal = (options = {}) => {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          if (!options.repeat) {
            observer.unobserve(entry.target)
          }
        } else if (options.repeat) {
          entry.target.classList.remove('visible')
        }
      },
      {
        threshold: options.threshold || 0.15,
        rootMargin: options.rootMargin || '0px 0px -50px 0px',
      }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [options.threshold, options.rootMargin, options.repeat])

  return ref
}

export const useParallax = (speed = 0.5) => {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleScroll = () => {
      const rect = element.getBoundingClientRect()
      const scrolled = window.scrollY
      const rate = scrolled * speed
      element.style.transform = `translateY(${rate}px)`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return ref
}

export const useCountUp = (target, duration = 2000) => {
  const ref = useRef(null)
  const countRef = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0
          const increment = target / (duration / 16)

          const timer = setInterval(() => {
            start += increment
            if (start >= target) {
              element.textContent = target
              clearInterval(timer)
            } else {
              element.textContent = Math.floor(start)
            }
          }, 16)

          countRef.current = timer
          observer.unobserve(element)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(element)
    return () => {
      observer.disconnect()
      if (countRef.current) clearInterval(countRef.current)
    }
  }, [target, duration])

  return ref
}
