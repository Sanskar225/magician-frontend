// src/components/Footer.jsx
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import styles from './Footer.module.css'

const SITE_NAME = import.meta.env.VITE_SITE_NAME || 'Magnus the Illusionist'
const EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'contact@magnusthemagician.com'
const PHONE = import.meta.env.VITE_CONTACT_PHONE || '+1 (555) 000-0000'
const INSTAGRAM = import.meta.env.VITE_INSTAGRAM_URL
const FACEBOOK = import.meta.env.VITE_FACEBOOK_URL
const YOUTUBE = import.meta.env.VITE_YOUTUBE_URL

export default function Footer() {
  const year = new Date().getFullYear()
  const [sparkles, setSparkles] = useState([])
  const [email, setEmail] = useState('')
  const [isHovering, setIsHovering] = useState(null)

  // Magical sparkle effect
  useEffect(() => {
    const createSparkle = () => {
      const newSparkle = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 10 + 5,
        delay: Math.random() * 5,
      }
      setSparkles(prev => [...prev.slice(-15), newSparkle])
    }

    const interval = setInterval(createSparkle, 2000)
    return () => clearInterval(interval)
  }, [])

  const handleSubscribe = (e) => {
    e.preventDefault()
    // Add subscription logic here
    setEmail('')
    // Show magical success message
  }

  return (
    <footer className={styles.footer} role="contentinfo">
      {/* Magical Sparkles Background */}
      <div className={styles.sparkleContainer}>
        {sparkles.map(sparkle => (
          <div
            key={sparkle.id}
            className={styles.sparkle}
            style={{
              left: `${sparkle.left}%`,
              top: `${sparkle.top}%`,
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
              animationDelay: `${sparkle.delay}s`,
            }}
          >
            ✦
          </div>
        ))}
      </div>

      {/* Mystical Top Border */}
      <div className={styles.topBorder}>
        <div className={styles.mysticalLine} />
        <div className={styles.floatingCards}>
          <span>♠</span>
          <span>♥</span>
          <span>♦</span>
          <span>♣</span>
        </div>
      </div>

      <div className="container">
        {/* Main Grid with Hover Effects */}
        <div className={styles.grid}>
          {/* Brand Section with Mystical Aura */}
          <div 
            className={`${styles.brand} ${styles.mysticalCard}`}
            onMouseEnter={() => setIsHovering('brand')}
            onMouseLeave={() => setIsHovering(null)}
          >
            <div className={styles.logo}>
              <span className={styles.logoSymbol}>
                <span className={styles.spinningSymbol}>✦</span>
              </span>
              <div>
                <div className={styles.logoName}>{SITE_NAME.split(' ')[0]}</div>
                <div className={styles.logoTag}>Master of Illusions</div>
              </div>
            </div>
            <p className={styles.tagline}>
              "Reality is merely an illusion, albeit a very persistent one." 
              <span className={styles.signature}>— Magnus</span>
            </p>
            
            {/* Animated Social Links */}
            <div className={styles.social}>
              {INSTAGRAM && (
                <a 
                  href={INSTAGRAM} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`${styles.socialLink} ${styles.mysticalHover}`}
                  aria-label="Instagram"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              )}
              {FACEBOOK && (
                <a 
                  href={FACEBOOK} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`${styles.socialLink} ${styles.mysticalHover}`}
                  aria-label="Facebook"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}
              {YOUTUBE && (
                <a 
                  href={YOUTUBE} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`${styles.socialLink} ${styles.mysticalHover}`}
                  aria-label="YouTube"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links with Magic Reveal */}
          <nav 
            aria-label="Footer quick links"
            className={styles.mysticalCard}
            onMouseEnter={() => setIsHovering('quick')}
            onMouseLeave={() => setIsHovering(null)}
          >
            <h3 className={styles.colTitle}>
              <span className={styles.titleGlow}>✦</span> Quick Links
            </h3>
            <ul className={styles.linkList}>
              {[
                { to: '/', label: 'Home', icon: '🏠' },
                { to: '/about', label: 'The Story', icon: '📜' },
                { to: '/services', label: 'Illusions', icon: '🎩' },
                { to: '/blog', label: 'Tales of Magic', icon: '📖' },
                { to: '/contact', label: 'Summon Magnus', icon: '🔮' },
              ].map(({ to, label, icon }) => (
                <li key={to} className={styles.linkItem}>
                  <Link to={to} className={styles.footerLink}>
                    <span className={styles.linkIcon}>{icon}</span>
                    <span className={styles.linkText}>{label}</span>
                    <span className={styles.linkSparkle}>✨</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services with Mystical Icons */}
          <nav 
            aria-label="Footer services"
            className={styles.mysticalCard}
            onMouseEnter={() => setIsHovering('services')}
            onMouseLeave={() => setIsHovering(null)}
          >
            <h3 className={styles.colTitle}>
              <span className={styles.titleGlow}>✦</span> Services
            </h3>
            <ul className={styles.linkList}>
              {[
                { name: 'Corporate Events', icon: '💼' },
                { name: 'Private Parties', icon: '🎉' },
                { name: 'Wedding Shows', icon: '💑' },
                { name: 'Stage Illusions', icon: '🎪' },
                { name: 'Virtual Magic', icon: '💻' },
                { name: 'Close-up Magic', icon: '🃏' },
              ].map(({ name, icon }) => (
                <li key={name} className={styles.linkItem}>
                  <Link to="/services" className={styles.footerLink}>
                    <span className={styles.linkIcon}>{icon}</span>
                    <span className={styles.linkText}>{name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact with Enchanted Form */}
          <div 
            className={`${styles.mysticalCard} ${styles.contactCard}`}
            onMouseEnter={() => setIsHovering('contact')}
            onMouseLeave={() => setIsHovering(null)}
          >
            <h3 className={styles.colTitle}>
              <span className={styles.titleGlow}>✦</span> Summoning Circle
            </h3>
            
            {/* Magical Contact Info */}
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <span className={styles.contactIcon}>📧</span>
                <a href={`mailto:${EMAIL}`} className={`${styles.footerLink} ${styles.contactLink}`}>
                  {EMAIL}
                </a>
              </li>
              <li className={styles.contactItem}>
                <span className={styles.contactIcon}>📞</span>
                <a href={`tel:${PHONE.replace(/[^+\d]/g, '')}`} className={`${styles.footerLink} ${styles.contactLink}`}>
                  {PHONE}
                </a>
              </li>
            </ul>

            {/* Enchanted Newsletter */}
            <div className={styles.newsletter}>
              <p className={styles.newsletterText}>
                <span className={styles.newsletterGlow}>✨</span> 
                Receive Magical Updates
              </p>
              <form onSubmit={handleSubscribe} className={styles.newsletterForm}>
                <div className={styles.inputWrapper}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className={styles.magicalInput}
                    aria-label="Email for newsletter"
                    required
                  />
                  <span className={styles.inputGlow}></span>
                </div>
                <button 
                  type="submit" 
                  className={styles.magicalButton}
                  aria-label="Subscribe"
                >
                  <span className={styles.buttonText}>Cast</span>
                  <span className={styles.buttonGlow}>✨</span>
                </button>
              </form>
              <p className={styles.newsletterDisclaimer}>
                Join the inner circle • No tricks, only treats
              </p>
            </div>
          </div>
        </div>

        {/* Mystical Bottom Section */}
        <div className={styles.mysticalBottom}>
          {/* Animated Separator */}
          <div className={styles.magicRope}>
            <span className={styles.ropeSegment}></span>
            <span className={styles.ropeKnot}>✧</span>
            <span className={styles.ropeSegment}></span>
            <span className={styles.ropeKnot}>✦</span>
            <span className={styles.ropeSegment}></span>
            <span className={styles.ropeKnot}>✧</span>
            <span className={styles.ropeSegment}></span>
          </div>

          {/* Bottom Content */}
          <div className={styles.bottomContent}>
            <p className={styles.copyright}>
              <span className={styles.copyrightGlow}>©</span> {year} {SITE_NAME}
              <span className={styles.mysticalSeparator}>•</span>
              <span className={styles.motto}>Where Reality Bends</span>
            </p>
            
            <div className={styles.legalLinks}>
              <Link to="/privacy" className={`${styles.legalLink} ${styles.mysticalLink}`}>
                <span className={styles.linkContent}>Crystal Ball</span>
                <span className={styles.linkHoverGlow}>🔮</span>
              </Link>
              <span className={styles.mysticalDot}>✦</span>
              <Link to="/terms" className={`${styles.legalLink} ${styles.mysticalLink}`}>
                <span className={styles.linkContent}>Sacred Terms</span>
                <span className={styles.linkHoverGlow}>📜</span>
              </Link>
            </div>
          </div>

          {/* Floating Magic Words */}
          <div className={styles.floatingWords}>
            <span>Abracadabra</span>
            <span>✦</span>
            <span>Presto</span>
            <span>✦</span>
            <span>Hocus Pocus</span>
          </div>
        </div>
      </div>
    </footer>
  )
}