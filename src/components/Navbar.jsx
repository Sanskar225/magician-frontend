// src/components/Navbar.jsx
import { useState, useEffect, useCallback } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'

const navLinks = [
  { to: '/', label: 'Home', icon: '🏠' },
  { to: '/about', label: 'About', icon: '📜' },
  { to: '/services', label: 'Illusions', icon: '🎩' },
  { to: '/blog', label: 'Grimoire', icon: '📖' },
  { to: '/contact', label: 'Summon', icon: '🔮' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hoveredLink, setHoveredLink] = useState(null)
  const [magicParticles, setMagicParticles] = useState([])
  const location = useLocation()

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50)
  }, [])

  // Magic particle effect
  useEffect(() => {
    const createParticle = () => {
      const newParticle = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 5,
      }
      setMagicParticles(prev => [...prev.slice(-8), newParticle])
    }

    const interval = setInterval(createParticle, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <nav 
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} 
      role="navigation" 
      aria-label="Main navigation"
    >
      {/* Magical Particles Background */}
      <div className={styles.particleContainer}>
        {magicParticles.map(particle => (
          <div
            key={particle.id}
            className={styles.magicParticle}
            style={{
              left: `${particle.left}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}s`,
            }}
          >
            ✦
          </div>
        ))}
      </div>

      {/* Mystical Top Border */}
      <div className={styles.mysticalBorder}>
        <div className={styles.borderGlow} />
        <div className={styles.runeContainer}>
          <span>⚡</span>
          <span>✦</span>
          <span>⚡</span>
        </div>
      </div>

      {/* Logo with Enhanced Magic */}
      <Link to="/" className={styles.logo} aria-label="Magnus the Illusionist - Home">
        <div className={styles.logoWrapper}>
          <span className={styles.logoSymbol}>✦</span>
          <div className={styles.logoGlow} />
        </div>
        <div className={styles.logoText}>
          <span className={styles.logoName}>
            Parth
            <span className={styles.logoNameGlow}>.</span>
          </span>
          <span className={styles.logoTag}>Master of Illusions</span>
        </div>
      </Link>

      {/* Desktop nav with Icons */}
      <ul className={styles.navLinks} role="list">
        {navLinks.map(({ to, label, icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
              onMouseEnter={() => setHoveredLink(label)}
              onMouseLeave={() => setHoveredLink(null)}
              end={to === '/'}
            >
              <span className={styles.linkIcon}>{icon}</span>
              <span className={styles.linkLabel}>{label}</span>
              {hoveredLink === label && (
                <span className={styles.linkSparkle}>✨</span>
              )}
              <span className={styles.navUnderline} aria-hidden="true" />
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Enhanced CTA Button */}
      <Link to="/contact" className={`${styles.cta} ${styles.mysticalButton}`}>
        <span className={styles.ctaText}>Book a Show</span>
        <span className={styles.ctaGlow}>✨</span>
        <span className={styles.ctaParticles}>
          <span>✦</span>
          <span>⚡</span>
          <span>✦</span>
        </span>
      </Link>

      {/* Magical Hamburger */}
      <button
        className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        <span className={styles.hamburgerLine} />
        <span className={styles.hamburgerLine} />
        <span className={styles.hamburgerLine} />
        <span className={styles.hamburgerGlow} />
      </button>

      {/* Enhanced Mobile Menu */}
      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className={styles.mobileMenuHeader}>
          <span className={styles.mobileMenuSymbol}>✦</span>
          <h3 className={styles.mobileMenuTitle}>Navigation</h3>
          <span className={styles.mobileMenuSymbol}>✦</span>
        </div>

        <ul role="list">
          {navLinks.map(({ to, label, icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `${styles.mobileLink} ${isActive ? styles.active : ''}`
                }
                end={to === '/'}
              >
                <span className={styles.mobileLinkIcon}>{icon}</span>
                <span className={styles.mobileLinkLabel}>{label}</span>
                <span className={styles.mobileLinkArrow}>→</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className={styles.mobileMenuFooter}>
          <Link to="/contact" className={`${styles.mobileCta} ${styles.mysticalButton}`}>
            <span>Summon Magnus</span>
            <span>🔮</span>
          </Link>
          <div className={styles.mobileMenuRunes}>
            <span>⚡</span>
            <span>✦</span>
            <span>⚡</span>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile overlay */}
      {menuOpen && (
        <div
          className={styles.overlay}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        >
          <div className={styles.overlayGlow} />
        </div>
      )}
    </nav>
  )
}