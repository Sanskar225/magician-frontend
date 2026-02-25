// src/pages/About.jsx
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useVanta } from '../hooks/useVanta'
import SEOHead from '../components/SEOHead'
import { Link } from 'react-router-dom'
import styles from './About.module.css'

const milestones = [
  { year: '2005', event: 'First professional performance at The Palace Hotel, Las Vegas', icon: '🌟' },
  { year: '2009', event: 'Headlined at the Edinburgh International Magic Festival', icon: '🎭' },
  { year: '2013', event: 'World record for largest audience for a close-up magic show', icon: '🏆' },
  { year: '2016', event: 'Netflix Special "Impossible: The Magnus Chronicles"', icon: '🎬' },
  { year: '2019', event: 'Performed for 3 world leaders at the International Summit', icon: '🌍' },
  { year: '2024', event: 'Celebrating 20 years of magical performances worldwide', icon: '✦' },
]

const awards = [
  'Magic Circle Gold Medal 2012',
  'Las Vegas Entertainer of the Year 2015',
  'International Brotherhood of Magicians Award 2017',
  'FISM World Championship Finalist 2019',
]

export default function About() {
  const heroRef = useScrollReveal()
  const timelineRef = useScrollReveal()
  const philosophyRef = useScrollReveal()
  const vantaHeroRef = useVanta('FOG', {
    highlightColor: 0xc9a227,
    midtoneColor: 0x8b1a2a,
    lowlightColor: 0x0a0a0f,
    baseColor: 0x0a0a0f,
    blurFactor: 0.6,
    speed: 1.2,
    zoom: 1.0,
  })

  return (
    <>
      <SEOHead
        title="About Magnus"
        description="The story of Magnus the Illusionist — 20 years of world-class magic, from Las Vegas to London and beyond."
        canonicalPath="/about"
      />

      <main className="page-transition">
        {/* Hero */}
        <section className={styles.hero} ref={vantaHeroRef}>
          <div className={styles.heroBg} aria-hidden="true" />
          <div className="container">
            <div className={`${styles.heroInner} reveal`} ref={heroRef}>
              <div className={styles.heroText}>
                <div className="section-label">The Illusionist</div>
                <h1 className="section-title">
                  Twenty Years of<br />
                  <span className="shimmer-text">Making the Impossible</span>
                  <br />Possible
                </h1>
                <p className={styles.heroDesc}>
                  Magnus discovered his passion for magic at age seven, when a worn deck 
                  of cards became his first gateway into the extraordinary. Today, he stands 
                  as one of the world&rsquo;s most celebrated illusionists, having performed 
                  across 15 countries for over half a million people.
                </p>
                <p className={styles.heroDesc}>
                  His art transcends entertainment — it&rsquo;s an exploration of wonder, 
                  perception, and the magic that exists within every human connection.
                </p>
                <Link to="/contact" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                  Book Magnus ✦
                </Link>
              </div>
              <div className={styles.heroImage}>
                <div className={styles.imagePlaceholder}>
                  <div className={styles.imageOrb} />
                  <div className={styles.imageText}>Magnus</div>
                  <div className={styles.imageSubtext}>The Illusionist</div>
                  {/* Decorative frame */}
                  <div className={styles.frameCorner1} aria-hidden="true" />
                  <div className={styles.frameCorner2} aria-hidden="true" />
                  <div className={styles.frameCorner3} aria-hidden="true" />
                  <div className={styles.frameCorner4} aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className={`section ${styles.philosophy}`}>
          <div className="container">
            <div className={`${styles.philosophyInner} reveal`} ref={philosophyRef}>
              <div className={styles.philosophyQuote}>
                <div className={styles.quoteMark}>&ldquo;</div>
                <blockquote className={styles.quoteText}>
                  Magic is not about deception. It&rsquo;s about creating 
                  a moment where belief and reality dance together, 
                  and for a breath of time, anything becomes possible.
                </blockquote>
                <div className={styles.quoteAuthor}>— Magnus</div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className={`section`}>
          <div className="container">
            <div className="text-center reveal" ref={useScrollReveal()}>
              <div className="section-label">The Journey</div>
              <h2 className="section-title">A Life of Wonder</h2>
            </div>

            <div className={styles.timeline} ref={timelineRef}>
              <div className={styles.timelineLine} aria-hidden="true" />
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`${styles.timelineItem} ${i % 2 === 0 ? styles.timelineLeft : styles.timelineRight} reveal`}
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <div className={styles.timelineContent}>
                    <div className={styles.timelineYear}>{m.year}</div>
                    <div className={styles.timelineIcon}>{m.icon}</div>
                    <p className={styles.timelineEvent}>{m.event}</p>
                  </div>
                  <div className={styles.timelineDot} aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Awards */}
        <section className={`section ${styles.awards}`}>
          <div className="container">
            <div className="text-center reveal" ref={useScrollReveal()}>
              <div className="section-label">Recognition</div>
              <h2 className="section-title">Awards & Honours</h2>
            </div>
            <div className={`grid-2 stagger`} ref={useScrollReveal()}>
              {awards.map(award => (
                <div key={award} className={styles.awardItem}>
                  <span className={styles.awardIcon}>✦</span>
                  <span className={styles.awardText}>{award}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={`section ${styles.cta}`}>
          <div className="container text-center">
            <div className="reveal" ref={useScrollReveal()}>
              <h2 className="section-title">Ready to Experience the Magic?</h2>
              <p className="section-subtitle" style={{ margin: '0 auto 2rem' }}>
                Every event deserves a touch of the extraordinary.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn btn-primary">Book a Show</Link>
                <Link to="/services" className="btn btn-outline">View Services</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
