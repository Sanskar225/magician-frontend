// src/pages/Services.jsx
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useVanta } from '../hooks/useVanta'
import { serviceAPI } from '../utils/api'
import styles from './Services.module.css'

const defaultServices = [
  {
    id: '1', name: 'Stage Illusions', slug: 'stage-illusions',
    shortDescription: 'Grand-scale illusions that leave audiences speechless',
    description: 'Transform your event into a theatrical experience with large-scale stage illusions. From levitation to disappearing acts, these performances command attention and create memories that last a lifetime.',
    icon: '🎭', features: ['Full stage setup', 'Theatrical lighting', 'Custom illusions', 'Audience participation', 'Professional sound design'], price: 'From $5,000', isPopular: true,
  },
  {
    id: '2', name: 'Close-up Magic', slug: 'close-up-magic',
    shortDescription: 'Intimate wonder performed inches from your eyes',
    description: 'Experience magic that happens right in your hands. Cards, coins, and everyday objects transform in ways that defy rational explanation, creating personal moments of wonder for each guest.',
    icon: '🃏', features: ['Table-to-table performance', 'Interactive effects', 'No setup required', 'Perfect for cocktail hours', 'Custom themed effects'], price: 'From $1,500', isPopular: false,
  },
  {
    id: '3', name: 'Corporate Events', slug: 'corporate-events',
    shortDescription: 'Unforgettable entertainment for your business occasions',
    description: 'Elevate your corporate gathering with tailored magic that incorporates your brand messaging. From product launches to annual galas, Magnus creates memorable moments that reinforce your company values.',
    icon: '🏢', features: ['Brand integration', 'Keynote-style performances', 'Team building options', 'Product reveals', 'Custom messaging'], price: 'From $3,500', isPopular: true,
  },
  {
    id: '4', name: 'Wedding Shows', slug: 'wedding-shows',
    shortDescription: 'Make your special day truly magical',
    description: 'Add an enchanting element to your wedding celebration. Magnus performs customized shows that reflect your love story, creating wonder-filled moments that guests talk about for years.',
    icon: '💍', features: ['Personalized routines', 'Cocktail hour magic', 'Ceremony enhancements', 'Reception show', 'Ring magic specialty'], price: 'From $2,500', isPopular: false,
  },
  {
    id: '5', name: 'Mentalism', slug: 'mentalism',
    shortDescription: 'Mind-reading and psychological illusions',
    description: 'Journey into the realm of the mind with Magnus\'s mentalism performances. Watch as he reads thoughts, predicts the future, and demonstrates seemingly impossible feats of psychological prowess.',
    icon: '🔮', features: ['Mind reading demonstrations', 'Psychological illusions', 'Prediction reveals', 'Remote viewing', 'Audience choice effects'], price: 'From $2,000', isPopular: true,
  },
  {
    id: '6', name: 'Virtual Magic', slug: 'virtual-magic',
    shortDescription: 'Online performances that defy the digital divide',
    description: 'Magic without boundaries. Magnus delivers astonishing performances directly through your screen, creating shared moments of wonder for remote teams, online events, and virtual gatherings.',
    icon: '💻', features: ['Zoom/Teams compatible', 'Screen magic effects', 'Interactive participation', 'Global reach', 'No equipment needed for viewers'], price: 'From $800', isPopular: false,
  },
]

function ServiceDetail({ service }) {
  const ref = useScrollReveal()

  return (
    <section className={styles.detail}>
      <div className="container">
        <div className={`${styles.detailInner} reveal`} ref={ref}>
          <div className={styles.detailContent}>
            <div className={styles.detailIcon}>{service.icon || '✦'}</div>
            <div className="section-label">Service</div>
            <h1 className="section-title">{service.name}</h1>
            <p className={styles.detailDesc}>{service.description}</p>
            <div className={styles.detailPrice}>{service.price || 'Contact for pricing'}</div>
            <div className={styles.detailButtons}>
              <Link to="/contact" className="btn btn-primary">Book This Show ✦</Link>
              <Link to="/services" className="btn btn-ghost">← All Services</Link>
            </div>
          </div>
          <div className={styles.detailFeatures}>
            <h3 className={styles.featuresTitle}>What&rsquo;s Included</h3>
            <ul className={styles.featuresList}>
              {(service.features || []).map(f => (
                <li key={f} className={styles.featureItem}>
                  <span className={styles.featureCheck}>✦</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Services() {
  const { identifier } = useParams()
  const [services, setServices] = useState([])
  const [selectedService, setSelectedService] = useState(null)
  const [loading, setLoading] = useState(true)
  const gridRef = useScrollReveal()
  const vantaHeroRef = useVanta('DOTS', {
    color: 0xc9a227,
    color2: 0x8b1a2a,
    backgroundColor: 0x0a0a0f,
    size: 3.0,
    spacing: 35.0,
    showLines: true,
  })

  useEffect(() => {
    serviceAPI.getAll().then(r => {
      const list = r?.data?.services?.length ? r.data.services : defaultServices
      setServices(list)
      if (identifier) {
        setSelectedService(list.find(s => s.slug === identifier || s.id === identifier) || null)
      }
    }).catch(() => {
      setServices(defaultServices)
      if (identifier) {
        setSelectedService(defaultServices.find(s => s.slug === identifier) || null)
      }
    }).finally(() => setLoading(false))
  }, [identifier])

  if (identifier && selectedService) {
    return (
      <>
        <SEOHead title={selectedService.name} description={selectedService.shortDescription} canonicalPath={`/services/${identifier}`} />
        <main className="page-transition">
          <div style={{ height: 'var(--nav-height)' }} />
          <ServiceDetail service={selectedService} />
          <section className="section">
            <div className="container">
              <div className="text-center reveal" ref={useScrollReveal()}>
                <h2 className="section-title" style={{ fontSize: '2rem' }}>Other Services</h2>
              </div>
              <div className="grid-3 stagger" ref={useScrollReveal()}>
                {services.filter(s => s.id !== selectedService.id).slice(0, 3).map(s => (
                  <Link to={`/services/${s.slug}`} key={s.id} className={`card ${styles.serviceCard}`}>
                    <div className={styles.cardIcon}>{s.icon}</div>
                    <h3 className={styles.cardName}>{s.name}</h3>
                    <p className={styles.cardDesc}>{s.shortDescription}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </main>
      </>
    )
  }

  return (
    <>
      <SEOHead
        title="Services"
        description="World-class magic services for every occasion — stage illusions, close-up magic, corporate events, weddings, mentalism, and virtual shows."
        canonicalPath="/services"
      />
      <main className="page-transition">
        {/* Hero */}
        <section className={styles.hero} ref={vantaHeroRef}>
          <div className={styles.heroBg} aria-hidden="true" />
          <div className="container">
            <div className={`text-center reveal`} ref={useScrollReveal()}>
              <div className="section-label">What Magnus Offers</div>
              <h1 className="section-title">
                Every Occasion Deserves<br />
                <span className="shimmer-text">a Touch of Magic</span>
              </h1>
              <p className="section-subtitle" style={{ margin: '0 auto' }}>
                From intimate close-up moments to grand theatrical spectacles,
                Magnus crafts each performance to perfectly suit your event.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section">
          <div className="container">
            {loading ? (
              <div className={styles.loading}>
                <div className="loading-symbol">✦</div>
              </div>
            ) : (
              <div className={`grid-3 stagger`} ref={gridRef}>
                {services.map(service => (
                  <Link
                    to={`/services/${service.slug}`}
                    key={service.id}
                    className={`card ${styles.serviceCard} ${service.isPopular ? styles.popular : ''}`}
                  >
                    {service.isPopular && (
                      <div className={styles.popularBadge}>Popular</div>
                    )}
                    <div className={styles.cardIcon}>{service.icon || '✦'}</div>
                    <h2 className={styles.cardName}>{service.name}</h2>
                    <p className={styles.cardDesc}>{service.shortDescription}</p>
                    {service.price && <div className={styles.cardPrice}>{service.price}</div>}
                    <div className={styles.cardCta}>Learn More →</div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Process */}
        <section className={`section ${styles.process}`}>
          <div className="container">
            <div className="text-center reveal" ref={useScrollReveal()}>
              <div className="section-label">How It Works</div>
              <h2 className="section-title">Simple Process, Magical Results</h2>
            </div>
            <div className={`grid-4 stagger`} ref={useScrollReveal()}>
              {[
                { step: '01', title: 'Enquire', desc: 'Share your event details and vision with us' },
                { step: '02', title: 'Consult', desc: 'We tailor the perfect performance for your needs' },
                { step: '03', title: 'Confirm', desc: 'Lock in the date with a simple booking process' },
                { step: '04', title: 'Be Amazed', desc: 'Experience magic that exceeds all expectations' },
              ].map(({ step, title, desc }) => (
                <div key={step} className={styles.processStep}>
                  <div className={styles.stepNumber}>{step}</div>
                  <h3 className={styles.stepTitle}>{title}</h3>
                  <p className={styles.stepDesc}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section text-center">
          <div className="container">
            <div className="reveal" ref={useScrollReveal()}>
              <h2 className="section-title">Ready to Book?</h2>
              <p className="section-subtitle" style={{ margin: '0 auto 2rem' }}>
                Contact Magnus to discuss your event and create something truly magical.
              </p>
              <Link to="/contact" className="btn btn-primary">Get in Touch ✦</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
