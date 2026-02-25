import { useEffect, useRef } from 'react'

const VANTA_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24'
const THREE_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve()
      return
    }
    const s = document.createElement('script')
    s.src = src
    s.async = true
    s.onload = resolve
    s.onerror = reject
    document.head.appendChild(s)
  })
}

export function useVanta(effect = 'NET', options = {}) {
  const ref = useRef(null)
  const vantaRef = useRef(null)

  useEffect(() => {
    let cancelled = false

    async function init() {
      try {
        await loadScript(THREE_CDN)
        await loadScript(`${VANTA_CDN}/vanta.${effect.toLowerCase()}.min.js`)

        if (!ref.current || cancelled) return

        if (vantaRef.current) {
          vantaRef.current.destroy()
        }

        const VANTA = window.VANTA
        if (!VANTA || !VANTA[effect]) return

        vantaRef.current = VANTA[effect]({
          el: ref.current,
          THREE: window.THREE,
          ...options,
        })

      } catch (err) {
        console.warn('Vanta failed:', err)
      }
    }

    // 🔥 Delay slightly to ensure DOM fully painted
    const timeout = setTimeout(init, 50)

    return () => {
      cancelled = true
      clearTimeout(timeout)
      if (vantaRef.current) {
        vantaRef.current.destroy()
        vantaRef.current = null
      }
    }
  }, [effect, JSON.stringify(options)])  // 🔥 important

  return ref
}