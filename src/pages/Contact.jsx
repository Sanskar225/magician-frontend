// src/pages/Contact.jsx
import { useState } from "react";
import SEOHead from "../components/SEOHead";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useVanta } from "../hooks/useVanta";
import { contactAPI } from "../utils/api";
import styles from "./Contact.module.css";

const EMAIL =
  import.meta.env.VITE_CONTACT_EMAIL || "contact@Parththemagician.com";
const PHONE = import.meta.env.VITE_CONTACT_PHONE || "+1 (555) 000-0000";
const INSTAGRAM = import.meta.env.VITE_INSTAGRAM_URL;
const FACEBOOK = import.meta.env.VITE_FACEBOOK_URL;
const YOUTUBE = import.meta.env.VITE_YOUTUBE_URL;

const eventTypes = [
  "Corporate Event",
  "Wedding",
  "Private Party",
  "Birthday",
  "Festival / Conference",
  "Virtual Event",
  "Other",
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
      value: "Based in Las Vegas, NV\nAvailable worldwide",
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
        title="Contact & Bookings"
        description="Book Parth the Illusionist for your event. Contact us to discuss your requirements and create a truly magical experience."
        canonicalPath="/contact"
      />

      <main className="page-transition">
        {/* Hero */}
        <section className={styles.hero} ref={vantaHeroRef}>
          <div className={styles.heroBg} aria-hidden="true" />
          <div className="container">
            <div className="text-center reveal" ref={useScrollReveal()}>
              <div className="section-label">Get in Touch</div>
              <h1 className="section-title">
                Let&rsquo;s Create
                <br />
                <span className="shimmer-text">Something Magical</span>
              </h1>
              <p className="section-subtitle" style={{ margin: "0 auto" }}>
                Ready to bring wonder to your event? Share the details and Parth
                will craft a performance tailored just for you.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section">
          <div className="container">
            <div className={styles.contactGrid}>
              {/* Form */}
              <div className={`${styles.formSection} reveal`} ref={formRef}>
                <h2 className={styles.formTitle}>Send an Enquiry</h2>

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
                      className="btn btn-outline"
                      style={{ marginTop: "1.5rem" }}
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
                      <div className="form-group">
                        <label htmlFor="name" className="form-label">
                          Full Name *
                        </label>
                        <input
                          id="name"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`form-input ${errors.name ? styles.inputError : ""}`}
                          placeholder="Your full name"
                          autoComplete="name"
                          aria-required="true"
                          aria-describedby={
                            errors.name ? "name-error" : undefined
                          }
                        />
                        {errors.name && (
                          <span
                            id="name-error"
                            className={styles.errorMsg}
                            role="alert"
                          >
                            {errors.name}
                          </span>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="email" className="form-label">
                          Email Address *
                        </label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`form-input ${errors.email ? styles.inputError : ""}`}
                          placeholder="your@email.com"
                          autoComplete="email"
                          aria-required="true"
                          aria-describedby={
                            errors.email ? "email-error" : undefined
                          }
                        />
                        {errors.email && (
                          <span
                            id="email-error"
                            className={styles.errorMsg}
                            role="alert"
                          >
                            {errors.email}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className={styles.formRow}>
                      <div className="form-group">
                        <label htmlFor="phone" className="form-label">
                          Phone Number
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="form-input"
                          placeholder="+1 (555) 000-0000"
                          autoComplete="tel"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="service" className="form-label">
                          Event Type
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="form-select"
                        >
                          <option value="">Select event type...</option>
                          {eventTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="subject" className="form-label">
                        Subject *
                      </label>
                      <input
                        id="subject"
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`form-input ${errors.subject ? styles.inputError : ""}`}
                        placeholder="e.g., Corporate Gala - January 2025"
                        aria-required="true"
                        aria-describedby={
                          errors.subject ? "subject-error" : undefined
                        }
                      />
                      {errors.subject && (
                        <span
                          id="subject-error"
                          className={styles.errorMsg}
                          role="alert"
                        >
                          {errors.subject}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="message" className="form-label">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className={`form-textarea ${errors.message ? styles.inputError : ""}`}
                        placeholder="Tell us about your event — date, expected guests, venue, any special requirements..."
                        rows={6}
                        aria-required="true"
                        aria-describedby={
                          errors.message ? "message-error" : undefined
                        }
                      />
                      {errors.message && (
                        <span
                          id="message-error"
                          className={styles.errorMsg}
                          role="alert"
                        >
                          {errors.message}
                        </span>
                      )}
                    </div>

                    {status === "error" && (
                      <div className={styles.formError} role="alert">
                        {errorMsg}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={status === "loading"}
                      style={{
                        width: "100%",
                        justifyContent: "center",
                        padding: "1rem",
                      }}
                    >
                      {status === "loading" ? (
                        <>
                          <span className={styles.spinner} aria-hidden="true">
                            ✦
                          </span>
                          Sending Enquiry...
                        </>
                      ) : (
                        <>✦ Send Enquiry</>
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
                <h2 className={styles.infoTitle}>Get in Touch</h2>

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
                            style={{ color: "var(--color-white-dim)" }}
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

                <div className="magic-separator">
                  <span>✦</span>
                </div>

                {/* Social */}
                <div className={styles.socialSection}>
                  <div className="form-label">Follow the Magic</div>
                  <div className={styles.socialLinks}>
                    {INSTAGRAM && (
                      <a
                        href={INSTAGRAM}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                        aria-label="Instagram"
                      >
                        Instagram
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
                        Facebook
                      </a>
                    )}
                    {YOUTUBE && (
                      <a
                        href={YOUTUBE}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                        aria-label="YouTube"
                      >
                        YouTube
                      </a>
                    )}
                  </div>
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
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className={`section ${styles.faq}`}>
          <div className="container">
            <div className="text-center reveal" ref={useScrollReveal()}>
              <div className="section-label">Common Questions</div>
              <h2 className="section-title" style={{ fontSize: "2rem" }}>
                FAQ
              </h2>
            </div>
            <div className={`grid-2 stagger`} ref={useScrollReveal()}>
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
              ].map(({ q, a }) => (
                <div key={q} className={styles.faqItem}>
                  <h3 className={styles.faqQ}>
                    <span className={styles.faqIcon}>✦</span>
                    {q}
                  </h3>
                  <p className={styles.faqA}>{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
