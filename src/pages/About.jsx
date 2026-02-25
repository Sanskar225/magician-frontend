// src/pages/About.jsx
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useVanta } from "../hooks/useVanta";
import SEOHead from "../components/SEOHead";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./About.module.css";

const milestones = [
  {
    year: "2015",
    event: "First Professional Performance",
    icon: "🌟",
    description: "Began the journey of mesmerizing audiences with the art of storytelling through magic"
  },
  {
    year: "2018",
    event: "International Debut",
    icon: "🌍",
    description: "First international performance, bringing wonder to audiences across borders"
  },
  {
    year: "2020",
    event: "Virtual Magic Revolution",
    icon: "💻",
    description: "Pioneered interactive online magic experiences during global lockdowns"
  },
  {
    year: "2022",
    event: "Corporate Entertainment Specialist",
    icon: "💼",
    description: "Became the go-to illusionist for Fortune 500 companies worldwide"
  },
  {
    year: "2024",
    event: "Global Recognition",
    icon: "🏆",
    description: "Celebrated as one of the most innovative illusionists of the decade"
  }
];

const beliefs = [
  {
    title: "Storytelling First",
    description: "Every trick tells a tale. I believe magic is a narrative art that connects hearts.",
    icon: "📖"
  },
  {
    title: "Create Wonder",
    description: "My mission is to reignite the childlike wonder in every audience member.",
    icon: "✨"
  },
  {
    title: "Inspire Dreams",
    description: "Through impossibility, I inspire others to believe in their own potential.",
    icon: "💫"
  },
  {
    title: "Connect Globally",
    description: "Magic transcends language and culture, uniting people through shared awe.",
    icon: "🌐"
  }
];

const stats = [
  { number: "50K+", label: "Audience Members", icon: "👥" },
  { number: "15+", label: "Countries Performed", icon: "🌍" },
  { number: "500+", label: "Shows Delivered", icon: "🎪" },
  { number: "100+", label: "Corporate Events", icon: "💼" }
];

export default function About() {
  const heroRef = useScrollReveal();
  const philosophyRef = useScrollReveal();
  const [activeMilestone, setActiveMilestone] = useState(null);
  
  const vantaHeroRef = useVanta("FOG", {
    highlightColor: 0xc9a227,
    midtoneColor: 0x8b1a2a,
    lowlightColor: 0x0a0a0f,
    baseColor: 0x0a0a0f,
    blurFactor: 0.6,
    speed: 1.2,
    zoom: 1.0,
  });

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Magician Parth",
    "description": "Meet Parth, an illusionist who combines classic tricks with modern theatrics to create awe-inspiring performances worldwide.",
    "mainEntity": {
      "@type": "Person",
      "name": "Parth",
      "description": "Professional Illusionist and Storyteller",
      "knowsAbout": ["Magic", "Illusion", "Storytelling", "Live Performance"],
      "performerIn": "International magic shows and corporate events"
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <SEOHead
        title="About Magician Parth | Storytelling Through Magic & Illusion"
        description="Meet Parth, an illusionist who transforms magic into storytelling. With years of experience mesmerizing audiences worldwide through intimate shows and grand performances."
        canonicalPath="/about"
        ogImage="/images/parth-about.jpg"
        ogType="profile"
        twitterCard="summary_large_image"
        keywords="magician biography, illusionist story, Parth magician, storytelling magic, live performance artist, corporate magician"
      />

      <main className="page-transition">
        {/* Hero Section - Who We Are */}
        <section className={styles.hero} ref={vantaHeroRef}>
          <div className={styles.heroBg} aria-hidden="true" />
          <div className={styles.heroOverlay} />
          
          {/* Floating magical particles */}
          <div className={styles.heroParticles}>
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className={styles.heroParticle}
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${10 + Math.random() * 10}s`
                }}
              >
                {['✦', '✧', '⚡', '✨'][Math.floor(Math.random() * 4)]}
              </div>
            ))}
          </div>

          <div className="container">
            <div className={`${styles.heroInner} reveal`} ref={heroRef}>
              <div className={styles.heroText}>
                <div className={styles.heroLabel}>
                  <span className={styles.labelLine}></span>
                  <span>Who We Are</span>
                  <span className={styles.labelLine}></span>
                </div>
                
                <h1 className={styles.heroTitle}>
                  About <span className={styles.titleHighlight}>Magician Parth</span>
                </h1>
                
                <div className={styles.heroDescription}>
                  <p className={styles.heroDesc}>
                    At <strong>Magician Parth</strong>, magic is more than a series of tricks—it's an art of 
                    <span className={styles.highlight}> storytelling, mystery, and awe</span>. With years of experience 
                    mesmerizing audiences worldwide, I combine classic illusions with modern theatrics to create 
                    performances that ignite your imagination and leave you questioning what's possible.
                  </p>
                  <p className={styles.heroDesc}>
                    Every show is a <span className={styles.highlight}>journey into the realm of the unbelievable</span>, 
                    where reality bends and wonder takes center stage.
                  </p>
                </div>

                {/* Quick Stats */}
                <div className={styles.heroStats}>
                  {stats.map((stat, index) => (
                    <div key={index} className={styles.heroStat}>
                      <span className={styles.statIcon}>{stat.icon}</span>
                      <div>
                        <div className={styles.statNumber}>{stat.number}</div>
                        <div className={styles.statLabel}>{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.heroCta}>
                  <Link to="/contact" className="btn btn-primary">
                    <span>Book a Show</span>
                    <span className={styles.ctaSparkle}>✦</span>
                  </Link>
                  <Link to="/services" className="btn btn-outline">
                    <span>Explore Magic</span>
                    <span className={styles.ctaArrow}>→</span>
                  </Link>
                </div>
              </div>

              <div className={styles.heroImage}>
                <div className={styles.imageWrapper}>
                  <div className={styles.imageOrb} />
                  <div className={styles.imageFrame}>
                    <div className={styles.imageContent}>
                      <div className={styles.imageSymbol}>✦</div>
                      <div className={styles.imageName}>Parth</div>
                      <div className={styles.imageTitle}>The Storyteller of Illusions</div>
                      <div className={styles.imageDeco}>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative frame corners */}
                  <div className={styles.frameCorner1} />
                  <div className={styles.frameCorner2} />
                  <div className={styles.frameCorner3} />
                  <div className={styles.frameCorner4} />
                  
                  {/* Floating badges */}
                  <div className={styles.floatingBadge} style={{ top: '20%', right: '-20px' }}>
                    <span>Storyteller</span>
                  </div>
                  <div className={styles.floatingBadge} style={{ bottom: '20%', left: '-20px' }}>
                    <span>Illusionist</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className={styles.scrollIndicator}>
            <span className={styles.scrollText}>Discover the Magic</span>
            <span className={styles.scrollArrow}>↓</span>
          </div>
        </section>

        {/* Magic Show & Live Performance Section */}
        <section className={`section ${styles.performanceSection}`}>
          <div className="container">
            <div className={styles.performanceGrid}>
              <div className={`${styles.performanceContent} reveal-left`}>
                <div className="section-label">The Experience</div>
                <h2 className="section-title">
                  Magic Show & <span className="shimmer-text">Live Performance</span>
                </h2>
                <div className={styles.performanceDescription}>
                  <p>
                    Whether on an intimate stage or a grand venue, each performance is carefully 
                    <span className={styles.highlight}> crafted to engage, inspire, and entertain</span>.
                  </p>
                  <p>
                    Using a blend of <strong>sleight-of-hand, mind-bending illusions, and interactive theatrics</strong>, 
                    my live shows invite audiences of all ages to experience the magic firsthand.
                  </p>
                  <p className={styles.performanceQuote}>
                    "Prepare for moments that will amaze and memories that will last a lifetime."
                  </p>
                </div>

                <div className={styles.performanceFeatures}>
                  <div className={styles.feature}>
                    <span className={styles.featureIcon}>🎭</span>
                    <div>
                      <h4>Intimate Shows</h4>
                      <p>Up-close magic that creates personal connections</p>
                    </div>
                  </div>
                  <div className={styles.feature}>
                    <span className={styles.featureIcon}>🎪</span>
                    <div>
                      <h4>Grand Productions</h4>
                      <p>Spectacular illusions for large audiences</p>
                    </div>
                  </div>
                  <div className={styles.feature}>
                    <span className={styles.featureIcon}>🎯</span>
                    <div>
                      <h4>Interactive Experiences</h4>
                      <p>Audience participation that creates shared wonder</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${styles.performanceVisual} reveal-right`}>
                <div className={styles.performanceCard}>
                  <div className={styles.performanceGlow}></div>
                  <div className={styles.performanceSymbols}>
                    <span>✦</span>
                    <span>🎩</span>
                    <span>✦</span>
                    <span>🃏</span>
                    <span>✦</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What I Believe Section */}
        <section className={`section ${styles.beliefsSection}`}>
          <div className={styles.beliefsBackground}>
            <div className={styles.beliefsParticles}>
              {[...Array(15)].map((_, i) => (
                <div key={i} className={styles.beliefParticle}>
                  {['✦', '✧', '✨', '💫'][Math.floor(Math.random() * 4)]}
                </div>
              ))}
            </div>
          </div>

          <div className="container">
            <div className={`${styles.beliefsHeader} reveal`} ref={philosophyRef}>
              <div className="section-label">My Philosophy</div>
              <h2 className="section-title">What I Believe?</h2>
              <div className={styles.beliefsVision}>
                <p className={styles.visionText}>
                  My vision is to create moments of pure magic that 
                  <span className={styles.visionHighlight}> inspire and captivate audiences around the globe</span>.
                </p>
              </div>
            </div>

            <div className={styles.beliefsGrid}>
              {beliefs.map((belief, index) => (
                <div 
                  key={index} 
                  className={`${styles.beliefCard} reveal-scale`}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className={styles.beliefIcon}>{belief.icon}</div>
                  <h3 className={styles.beliefTitle}>{belief.title}</h3>
                  <p className={styles.beliefDescription}>{belief.description}</p>
                  <div className={styles.beliefDeco}>
                    <span>✦</span>
                    <span>✦</span>
                    <span>✦</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Journey Timeline */}
        <section className={`section ${styles.journeySection}`}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <div className="section-label">The Journey</div>
              <h2 className="section-title">Years of Wonder</h2>
              <p className={styles.sectionSubtitle}>
                From first performance to global recognition — every step has been guided by passion and wonder.
              </p>
            </div>

            <div className={styles.timeline}>
              <div className={styles.timelineLine} aria-hidden="true" />
              
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`${styles.timelineItem} ${i % 2 === 0 ? styles.timelineLeft : styles.timelineRight} reveal`}
                  style={{ transitionDelay: `${i * 0.1}s` }}
                  onMouseEnter={() => setActiveMilestone(i)}
                  onMouseLeave={() => setActiveMilestone(null)}
                >
                  <div className={`${styles.timelineContent} ${activeMilestone === i ? styles.timelineContentActive : ''}`}>
                    <div className={styles.timelineYear}>
                      <span className={styles.yearNumber}>{m.year}</span>
                      <span className={styles.yearIcon}>{m.icon}</span>
                    </div>
                    <h3 className={styles.timelineEvent}>{m.event}</h3>
                    <p className={styles.timelineDescription}>{m.description}</p>
                  </div>
                  <div className={styles.timelineDot}>
                    <span className={styles.dotPulse}></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className={`section ${styles.ctaSection}`}>
          <div className={styles.ctaBackground}>
            <div className={styles.ctaParticles}>
              {[...Array(20)].map((_, i) => (
                <div key={i} className={styles.ctaParticle}>
                  {['✦', '✧', '⚡'][Math.floor(Math.random() * 3)]}
                </div>
              ))}
            </div>
          </div>

          <div className="container">
            <div className={styles.ctaContent}>
              <div className="reveal">
                <span className={styles.ctaPre}>Ready to Experience</span>
                <h2 className={styles.ctaTitle}>The Impossible?</h2>
                <p className={styles.ctaDescription}>
                  Let's create moments of pure magic for your next event — 
                  whether intimate or grand, every show becomes an unforgettable journey.
                </p>
                
                <div className={styles.ctaFeatures}>
                  <div className={styles.ctaFeature}>
                    <span>✓</span> Corporate Galas
                  </div>
                  <div className={styles.ctaFeature}>
                    <span>✓</span> Private Parties
                  </div>
                  <div className={styles.ctaFeature}>
                    <span>✓</span> Stage Shows
                  </div>
                  <div className={styles.ctaFeature}>
                    <span>✓</span> Virtual Events
                  </div>
                </div>

                <div className={styles.ctaButtons}>
                  <Link to="/contact" className="btn btn-primary btn-lg">
                    <span>Book a Show</span>
                    <span className={styles.ctaSparkle}>✨</span>
                  </Link>
                  <Link to="/services" className="btn btn-outline btn-lg">
                    <span>Discover More</span>
                    <span className={styles.ctaArrow}>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}