// src/pages/Contact.jsx
import { useState } from "react";
import SEOHead from "../components/SEOHead";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useVanta } from "../hooks/useVanta";
import { contactAPI } from "../utils/api";
import { Link } from "react-router-dom";
import styles from "./Contact.module.css";
import group5 from "../assets/Group-5.png";

const EMAIL =
  import.meta.env.VITE_CONTACT_EMAIL || "contact@magicianparth.com";
const PHONE = import.meta.env.VITE_CONTACT_PHONE || "+91 98765 43210";
const INSTAGRAM = import.meta.env.VITE_INSTAGRAM_URL || "https://instagram.com/magicianparth";
const FACEBOOK = import.meta.env.VITE_FACEBOOK_URL || "https://facebook.com/magicianparth";
const X_TWITTER = import.meta.env.VITE_X_TWITTER_URL || "https://x.com/magicianparth";

const eventTypes = [
  "Corporate Event",
  "Wedding",
  "Private Party",
  "Birthday",
  "Festival / Conference",
  "Virtual Event",
  "Other",
];

const cities = [
  "Lucknow", "Kanpur", "Agra", "Varanasi"
];

export default function Contact() {
  const formRef = useScrollReveal();
  const infoRef = useScrollReveal();
  const vantaHeroRef = useVanta("WAVES", {
    color: 0x0a0a0f,
    shininess: 40.0,
    waveHeight: 15.0,
    waveSpeed: 0.75,
    zoom: 0.75,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    service: "",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.length < 2)
      errs.name = "Name is required (min 2 chars)";
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errs.email = "Valid email is required";
    if (!formData.subject.trim() || formData.subject.length < 3)
      errs.subject = "Subject is required";
    if (!formData.message.trim() || formData.message.length < 10)
      errs.message = "Message must be at least 10 characters";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      await contactAPI.submit(formData);
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        service: "",
      });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  };

  const contactInfo = [
    {
      icon: "✉",
      label: "Email",
      value: EMAIL,
      href: `mailto:${EMAIL}`,
    },
    {
      icon: "☎",
      label: "Phone",
      value: PHONE,
      href: `tel:${PHONE.replace(/[^+\d]/g, "")}`,
    },
    {
      icon: "⌖",
      label: "Location",
      value: "Based in Lucknow, UP\nAvailable worldwide",
      href: null,
    },
    {
      icon: "◷",
      label: "Response Time",
      value: "Within 24 hours\nfor all enquiries",
      href: null,
    },
  ];

  return (
    <>
      <SEOHead
        title="Contact & Bookings | Magician Parth - Best Magician In Lucknow, Kanpur, Agra & Varanasi"
        description="Book Magician Parth for your event. Get in touch for corporate events, weddings, private parties, and virtual shows. Available in Lucknow, Kanpur, Agra, Varanasi and worldwide."
        canonicalPath="/contact"
        keywords="book magician, contact magician, magician in lucknow, magician in kanpur, magician in agra, magician in varanasi, corporate magician, wedding magician"
      />

      <main className="page-transition">
        {/* Hero Section */}
        <section className={styles.hero} ref={vantaHeroRef}>
          <div className={styles.heroBg} aria-hidden="true" />
          <div className={styles.heroOverlay} />
          
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
            <div className="text-center reveal">
              <div className="section-label">Get in Touch</div>
              <h1 className={styles.heroTitle}>
                Let's Create
                <br />
                <span className="shimmer-text">Something Magical</span>
              </h1>
              <p className={styles.heroSubtitle}>
                Ready to bring wonder to your event? Share the details and I'll
                craft a performance tailored just for you.
              </p>
            </div>
          </div>

          <div className={styles.scrollIndicator}>
            <span className={styles.scrollText}>Reach Out</span>
            <span className={styles.scrollArrow}>↓</span>
          </div>
        </section>

        {/* Contact Section */}
        <section className={`section ${styles.contactSection}`}>
          <div className="container">
            <div className={styles.contactGrid}>
              {/* Form */}
              <div className={`${styles.formSection} reveal`} ref={formRef}>
                <div className={styles.formHeader}>
                  <span className={styles.formIcon}>✦</span>
                  <h2 className={styles.formTitle}>Send an Enquiry</h2>
                </div>

                {status === "success" ? (
                  <div className={styles.successMessage} role="alert">
                    <div className={styles.successIcon}>✦</div>
                    <h3 className={styles.successTitle}>Message Received!</h3>
                    <p className={styles.successText}>
                      Thank you for reaching out. Parth will personally review
                      your enquiry and respond within 24 hours. Prepare to be
                      amazed.
                    </p>
                    <button
                      className={styles.successButton}
                      onClick={() => setStatus("idle")}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className={styles.form}
                    noValidate
                    aria-label="Contact form"
                  >
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label htmlFor="name" className={styles.formLabel}>
                          Full Name <span className={styles.required}>*</span>
                        </label>
                        <div className={styles.inputWrapper}>
                          <span className={styles.inputIcon}>👤</span>
                          <input
                            id="name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`${styles.formInput} ${errors.name ? styles.inputError : ""}`}
                            placeholder="Your full name"
                            autoComplete="name"
                            aria-required="true"
                          />
                          <span className={styles.inputGlow}></span>
                        </div>
                        {errors.name && (
                          <span className={styles.errorMsg} role="alert">
                            {errors.name}
                          </span>
                        )}
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.formLabel}>
                          Email Address <span className={styles.required}>*</span>
                        </label>
                        <div className={styles.inputWrapper}>
                          <span className={styles.inputIcon}>📧</span>
                          <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`${styles.formInput} ${errors.email ? styles.inputError : ""}`}
                            placeholder="your@email.com"
                            autoComplete="email"
                            aria-required="true"
                          />
                          <span className={styles.inputGlow}></span>
                        </div>
                        {errors.email && (
                          <span className={styles.errorMsg} role="alert">
                            {errors.email}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label htmlFor="phone" className={styles.formLabel}>
                          Phone Number
                        </label>
                        <div className={styles.inputWrapper}>
                          <span className={styles.inputIcon}>📞</span>
                          <input
                            id="phone"
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={styles.formInput}
                            placeholder="+91 98765 43210"
                            autoComplete="tel"
                          />
                          <span className={styles.inputGlow}></span>
                        </div>
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="service" className={styles.formLabel}>
                          Event Type
                        </label>
                        <div className={styles.inputWrapper}>
                          <span className={styles.inputIcon}>🎪</span>
                          <select
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className={styles.formSelect}
                          >
                            <option value="">Select event type...</option>
                            {eventTypes.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                          <span className={styles.inputGlow}></span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="subject" className={styles.formLabel}>
                        Subject <span className={styles.required}>*</span>
                      </label>
                      <div className={styles.inputWrapper}>
                        <span className={styles.inputIcon}>📝</span>
                        <input
                          id="subject"
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className={`${styles.formInput} ${errors.subject ? styles.inputError : ""}`}
                          placeholder="e.g., Corporate Gala - January 2025"
                          aria-required="true"
                        />
                        <span className={styles.inputGlow}></span>
                      </div>
                      {errors.subject && (
                        <span className={styles.errorMsg} role="alert">
                          {errors.subject}
                        </span>
                      )}
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="message" className={styles.formLabel}>
                        Message <span className={styles.required}>*</span>
                      </label>
                      <div className={styles.inputWrapper}>
                        <span className={styles.inputIcon}>💬</span>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          className={`${styles.formTextarea} ${errors.message ? styles.inputError : ""}`}
                          placeholder="Tell us about your event — date, expected guests, venue, any special requirements..."
                          rows={6}
                          aria-required="true"
                        />
                        <span className={styles.inputGlow}></span>
                      </div>
                      {errors.message && (
                        <span className={styles.errorMsg} role="alert">
                          {errors.message}
                        </span>
                      )}
                    </div>

                    {status === "error" && (
                      <div className={styles.formError} role="alert">
                        <span className={styles.errorIcon}>⚠️</span>
                        {errorMsg}
                      </div>
                    )}

                    <button
                      type="submit"
                      className={styles.submitButton}
                      disabled={status === "loading"}
                    >
                      {status === "loading" ? (
                        <>
                          <span className={styles.spinner}>✦</span>
                          Sending Enquiry...
                        </>
                      ) : (
                        <>
                          <span>✦ Send Enquiry</span>
                          <span className={styles.buttonGlow}></span>
                        </>
                      )}
                    </button>

                    <p className={styles.formNote}>
                      All enquiries are responded to within 24 hours. We take
                      your privacy seriously.
                    </p>
                  </form>
                )}
              </div>

              {/* Info */}
              <div
                className={`${styles.infoSection} reveal-right`}
                ref={infoRef}
              >
                <div className={styles.infoHeader}>
                  <span className={styles.infoIcon}>🔮</span>
                  <h2 className={styles.infoTitle}>Get in Touch</h2>
                </div>

                <div className={styles.contactInfoList}>
                  {contactInfo.map(({ icon, label, value, href }) => (
                    <div key={label} className={styles.contactInfoItem}>
                      <div className={styles.contactInfoIcon}>{icon}</div>
                      <div>
                        <div className={styles.contactInfoLabel}>{label}</div>
                        {href ? (
                          <a
                            href={href}
                            className={styles.contactInfoValue}
                          >
                            {value}
                          </a>
                        ) : (
                          <div
                            className={styles.contactInfoValue}
                            style={{ whiteSpace: "pre-line" }}
                          >
                            {value}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.magicSeparator}>
                  <span>✦</span>
                  <span>✧</span>
                  <span>✦</span>
                </div>

                {/* City Badges */}
                <div className={styles.citySection}>
                  <h3 className={styles.citySectionTitle}>Service Areas</h3>
                  <div className={styles.cityBadges}>
                    {cities.map(city => (
                      <Link key={city} to={`/services?city=${city.toLowerCase()}`} className={styles.cityBadge}>
                        <span className={styles.cityIcon}>✦</span>
                        {city}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Social */}
                <div className={styles.socialSection}>
                  <h3 className={styles.socialTitle}>Follow the Magic</h3>
                  <div className={styles.socialLinks}>
                    {INSTAGRAM && (
                      <a
                        href={INSTAGRAM}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                        aria-label="Instagram"
                      >
                        <span className={styles.socialIcon}>Instagram</span>
                        <span className={styles.socialGlow}></span>
                      </a>
                    )}
                    {FACEBOOK && (
                      <a
                        href={FACEBOOK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                        aria-label="Facebook"
                      >
                        <span className={styles.socialIcon}>Facebook-f</span>
                        <span className={styles.socialGlow}></span>
                      </a>
                    )}
                    {X_TWITTER && (
                      <a
                        href={X_TWITTER}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                        aria-label="X Twitter"
                      >
                        <span className={styles.socialIcon}>X-twitter</span>
                        <span className={styles.socialGlow}></span>
                      </a>
                    )}
                  </div>
                  <p className={styles.socialTagline}>Get the magical essence.</p>
                </div>

                {/* Assurances */}
                <div className={styles.assurances}>
                  {[
                    { icon: "⚡", text: "24hr response guarantee" },
                    { icon: "🔒", text: "Your details stay private" },
                    { icon: "✦", text: "No obligation quote" },
                  ].map(({ icon, text }) => (
                    <div key={text} className={styles.assuranceItem}>
                      <span className={styles.assuranceIcon}>{icon}</span>
                      <span className={styles.assuranceText}>{text}</span>
                      <span className={styles.assuranceGlow}></span>
                    </div>
                  ))}
                </div>

                {/* Decorative Image */}
                <img src={group5} alt="" className={styles.infoDeco} />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className={`section ${styles.faqSection}`}>
          <div className={styles.faqBackground}>
            <div className={styles.faqParticles}>
              {[...Array(15)].map((_, i) => (
                <div key={i} className={styles.faqParticle}>
                  {['✦', '✧', '✨', '?'][Math.floor(Math.random() * 4)]}
                </div>
              ))}
            </div>
          </div>

          <div className="container">
            <div className={styles.faqHeader}>
              <div className="section-label">Common Questions</div>
              <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
              <p className={styles.faqSubtitle}>
                Everything you need to know about booking a magical experience
              </p>
            </div>

            <div className={styles.faqGrid}>
              {[
                {
                  q: "How far in advance should I book?",
                  a: "For larger events, 3-6 months is ideal. We recommend contacting us as soon as you have a date, as our calendar fills quickly — especially for weekends.",
                },
                {
                  q: "Do you travel internationally?",
                  a: "Absolutely. Parth has performed in 15+ countries. Travel and accommodation costs are discussed during the booking process.",
                },
                {
                  q: "How long is a typical performance?",
                  a: "Shows range from 30-minute close-up sessions to 2-hour theatrical productions, depending on your event and needs.",
                },
                {
                  q: "Can the show be customized?",
                  a: "Every performance is tailored to your event. Parth works closely with clients to incorporate themes, branding, and personal touches.",
                },
                {
                  q: "What age groups are suitable?",
                  a: "Magic is for everyone! Performances can be adapted for any age group, from children's parties to corporate executives.",
                },
                {
                  q: "Do you offer virtual shows?",
                  a: "Yes! Virtual mentalism and magic shows are available for online events, webinars, and remote gatherings worldwide.",
                },
              ].map(({ q, a }, index) => (
                <div key={index} className={styles.faqItem}>
                  <div className={styles.faqIconWrapper}>
                    <span className={styles.faqItemIcon}>✦</span>
                  </div>
                  <h3 className={styles.faqQ}>{q}</h3>
                  <p className={styles.faqA}>{a}</p>
                  <div className={styles.faqGlow}></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
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
                <h2 className={styles.ctaTitle}>Ready to Create Magic?</h2>
                <p className={styles.ctaDescription}>
                  Let's make your next event unforgettable with a performance
                  that will leave your guests spellbound.
                </p>
                <div className={styles.ctaButtons}>
                  <a href={`mailto:${EMAIL}`} className={styles.ctaButton}>
                    <span>Email Us</span>
                    <span className={styles.ctaSparkle}>✨</span>
                  </a>
                  <a href={`tel:${PHONE.replace(/[^+\d]/g, "")}`} className={styles.ctaButtonOutline}>
                    <span>Call Now</span>
                    <span className={styles.ctaArrow}>→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <div className={styles.footerNote}>
          <div className="container">
            <div className={styles.copyright}>
              © Copyright 2026 | Magician Parth | All rights reserved.
            </div>
          </div>
        </div>
      </main>
    </>
  );
}