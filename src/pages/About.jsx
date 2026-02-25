// src/pages/About.jsx
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useVanta } from "../hooks/useVanta";
import SEOHead from "../components/SEOHead";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./About.module.css";

import stagePerformer from "../assets/stage-performer.png";
import lineart1 from "../assets/lineart_1.png";
import group4 from "../assets/Group-4.png";
import group5 from "../assets/Group-5.png";

/* ===========================
   DATA
=========================== */

const cities = ["Lucknow", "Kanpur", "Agra", "Varanasi"];

const beliefs = [
  {
    title: "Storytelling First",
    description:
      "Every trick tells a tale. I believe magic is a narrative art that connects hearts.",
    icon: "📖",
  },
  {
    title: "Create Wonder",
    description:
      "My mission is to reignite the childlike wonder in every audience member.",
    icon: "✨",
  },
  {
    title: "Inspire Dreams",
    description:
      "Through impossibility, I inspire others to believe in their own potential.",
    icon: "💫",
  },
  {
    title: "Connect Globally",
    description:
      "Magic transcends language and culture, uniting people through shared awe.",
    icon: "🌐",
  },
];

const testimonials = [
  {
    name: "Surendra Tharu",
    rating: 5,
    text: "Bahut bhadiya jadugar hai bhai ne mast magic dikhaya maja aa gaya",
    date: "8 days ago",
  },
  {
    name: "Divyanshika Srivastava",
    rating: 5,
    text:
      "Had an unforgettable experience with Parth. If you're looking for a magician for events in Lucknow, highly recommended.",
    date: "3 months ago",
  },
];

/* ===========================
   COMPONENT
=========================== */

export default function About() {
  const heroRef = useScrollReveal();
  const philosophyRef = useScrollReveal();

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const vantaHeroRef = useVanta("FOG", {
    highlightColor: 0xc9a227,
    midtoneColor: 0x8b1a2a,
    lowlightColor: 0x0a0a0f,
    baseColor: 0x0a0a0f,
    blurFactor: 0.6,
    speed: 1.2,
    zoom: 1.0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(
        (prev) => (prev + 1) % testimonials.length
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  /* ===========================
     STRUCTURED DATA
  =========================== */

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Magician Parth",
    description:
      "Meet Parth, professional magician performing in Lucknow, Kanpur, Agra & Varanasi.",
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
    return () => document.head.removeChild(script);
  }, []);

  return (
    <>
      <SEOHead
        title="About Magician Parth | Best Magician In Lucknow & Nearby Cities"
        description="Professional magician specializing in corporate events, weddings, private parties and mentalism shows."
        canonicalPath="/about"
      />

      <main>

        {/* ================= HERO ================= */}
        <section className={styles.hero} ref={vantaHeroRef}>
          <div className="container">
            <div className={styles.heroInner} ref={heroRef}>
              <div className={styles.heroText}>
                <h1>
                  What the eyes see and the ears hear,
                  <span> the mind believes.</span>
                </h1>
                <p>
                  Step into a world where illusion meets storytelling and
                  wonder becomes unforgettable.
                </p>

                <Link to="/contact" className="btn btn-primary">
                  Book Now
                </Link>
              </div>

              <div className={styles.heroImage}>
                <img src={stagePerformer} alt="Magician Parth performing live" />
              </div>
            </div>
          </div>
        </section>

        {/* ================= WHO WE ARE ================= */}
        <section className={`section ${styles.whoWeAre}`}>
          <div className="container">
            <h3 className={styles.sectionSubHeading}>
              The Artist Behind The Illusion
            </h3>
            <h2>About Magician Parth</h2>

            <p>
              With years of experience performing across India,
              Magician Parth creates immersive magical experiences
              that blend illusion, psychology and storytelling.
            </p>

            <div className={styles.cityBadges}>
              {cities.map((city) => (
                <span key={city} className={styles.cityBadge}>
                  Best Magician in {city}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ================= BELIEFS ================= */}
        <section className={`section ${styles.beliefsSection}`}>
          <div className="container">
            <div ref={philosophyRef}>
              <h3 className={styles.sectionSubHeading}>
                The Mind Behind The Magic
              </h3>
              <h2>What I Believe</h2>
            </div>

            <div className={styles.beliefsGrid}>
              {beliefs.map((belief, index) => (
                <div key={index} className={styles.beliefCard}>
                  <div>{belief.icon}</div>
                  <h4>{belief.title}</h4>
                  <p>{belief.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= GALLERY ================= */}
        <section className={`section ${styles.gallerySection}`}>
          <div className="container">
            <h3 className={styles.sectionSubHeading}>
              Live Performances Across Uttar Pradesh
            </h3>
            <h2>Magical Moments Captured</h2>

            <div className={styles.galleryGrid}>
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className={styles.galleryItem}>
                  <span>Performance {item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= TESTIMONIALS ================= */}
        <section className={`section ${styles.testimonialsSection}`}>
          <div className="container">
            <h3 className={styles.sectionSubHeading}>
              Trusted By Hundreds
            </h3>
            <h2>What Clients Say</h2>

            <div className={styles.testimonialCard}>
              <p>{testimonials[activeTestimonial].text}</p>
              <strong>{testimonials[activeTestimonial].name}</strong>
              <div>{"★".repeat(testimonials[activeTestimonial].rating)}</div>
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className={`section ${styles.ctaSection}`}>
          <div className="container">
            <h3 className={styles.sectionSubHeading}>
              Ready To Experience The Impossible?
            </h3>
            <h2>Get In Touch</h2>
            <p>
              The world is full of magic things patiently waiting
              for our senses to grow sharper.
            </p>

            <Link to="/contact" className="btn btn-primary">
              Contact Now
            </Link>
          </div>
        </section>

      </main>
    </>
  );
}