// src/pages/Home.jsx
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import { useScrollReveal, useCountUp } from "../hooks/useScrollReveal";
import { useVanta } from "../hooks/useVanta";
import { serviceAPI, blogAPI } from "../utils/api";
import styles from "./Home.module.css";

function Hero() {
  const titleRef = useRef(null);
  const vantaRef = useVanta("NET", {
    color: 0xc9a227,
    backgroundColor: 0x0a0a0f,
    points: 14.0,
    maxDistance: 22.0,
    spacing: 18.0,
    showDots: true,
  });

  useEffect(() => {
    const title = titleRef.current;
    if (title) {
      const text = title.textContent;
      title.innerHTML = text
        .split("")
        .map((char, i) =>
          char === " "
            ? " "
            : `<span style="animation-delay:${i * 0.06}s">${char}</span>`,
        )
        .join("");
    }
  }, []);

  return (
    <section className={styles.hero} aria-label="Hero" ref={vantaRef}>
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />
      <div className={`container ${styles.heroContent}`}>
        <div className={styles.heroLabel}>
          <span className={styles.labelLine} />
          <span>Est. 2005 · Las Vegas</span>
          <span className={styles.labelLine} />
        </div>
        <h1 ref={titleRef} className={`${styles.heroTitle} letter-animate`}>
          The Art of the Impossible
        </h1>
        <p className={styles.heroSub}>
          Parth the Illusionist transforms the ordinary into the extraordinary.
          Stage illusions. Close-up magic. Mind-bending mentalism.
        </p>
        <div className={styles.heroButtons}>
          <Link to="/contact" className="btn btn-primary">
            ✦ Book a Performance
          </Link>
          <Link to="/services" className="btn btn-ghost">
            Explore Shows →
          </Link>
        </div>
        <div className={styles.scrollIndicator} aria-hidden="true">
          <div className={styles.scrollLine} />
          <span>Scroll</span>
        </div>
      </div>
      <div className={styles.heroFade} aria-hidden="true" />
    </section>
  );
}

function Stats() {
  const count1 = useCountUp(500);
  const count2 = useCountUp(20);
  const count3 = useCountUp(15);
  const count4 = useCountUp(98);
  const stats = [
    { ref: count1, suffix: "+", label: "Shows Performed" },
    { ref: count2, suffix: "+", label: "Years of Magic" },
    { ref: count3, suffix: "", label: "Countries Toured" },
    { ref: count4, suffix: "%", label: "Client Satisfaction" },
  ];
  return (
    <section className={styles.stats}>
      <div className="container">
        <div className={`${styles.statsGrid} stagger`} ref={useScrollReveal()}>
          {stats.map(({ ref: countRef, label, suffix }) => (
            <div key={label} className={styles.statItem}>
              <div className={styles.statNumber}>
                <span ref={countRef}>0</span>
                {suffix}
              </div>
              <div className={styles.statLabel}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesPreview({ services }) {
  const titleRef = useScrollReveal();
  const gridRef = useScrollReveal();
  const defaultServices = [
    {
      id: 1,
      name: "Stage Illusions",
      shortDescription: "Grand-scale illusions that leave audiences speechless",
      icon: "🎭",
      slug: "stage-illusions",
    },
    {
      id: 2,
      name: "Close-up Magic",
      shortDescription: "Intimate wonder performed inches from your eyes",
      icon: "🃏",
      slug: "close-up-magic",
    },
    {
      id: 3,
      name: "Corporate Events",
      shortDescription:
        "Unforgettable entertainment for your business occasions",
      icon: "🏢",
      slug: "corporate-events",
    },
    {
      id: 4,
      name: "Wedding Shows",
      shortDescription: "Make your special day truly magical",
      icon: "💍",
      slug: "wedding-shows",
    },
    {
      id: 5,
      name: "Mentalism",
      shortDescription: "Mind-reading and psychological illusions",
      icon: "🔮",
      slug: "mentalism",
    },
    {
      id: 6,
      name: "Virtual Magic",
      shortDescription: "Online performances that defy the digital divide",
      icon: "💻",
      slug: "virtual-magic",
    },
  ];
  const displayServices = services?.length
    ? services.slice(0, 6)
    : defaultServices;
  return (
    <section className={`section ${styles.servicesPreview}`}>
      <div className="container">
        <div
          className={`text-center reveal ${styles.sectionHead}`}
          ref={titleRef}
        >
          <div className="section-label">What I Offer</div>
          <h2 className="section-title shimmer-text">Magical Experiences</h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            From intimate close-up magic to grand theatrical illusions, every
            performance is a unique journey into wonder.
          </p>
        </div>
        <div className={`grid-3 stagger`} ref={gridRef}>
          {displayServices.map((service) => (
            <Link
              to={`/services/${service.slug}`}
              key={service.id}
              className={`card ${styles.serviceCard}`}
            >
              <div className={styles.serviceIcon}>{service.icon || "✦"}</div>
              <h3 className={styles.serviceName}>{service.name}</h3>
              <p className={styles.serviceDesc}>{service.shortDescription}</p>
              <div className={styles.serviceArrow}>→</div>
            </Link>
          ))}
        </div>
        <div className="text-center" style={{ marginTop: "3rem" }}>
          <Link to="/services" className="btn btn-outline">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}

function ShowreelSection() {
  const ref = useScrollReveal();
  const vantaRef = useVanta("RINGS", {
    color: 0xc9a227,
    backgroundColor: 0x0d0d18,
  });
  return (
    <section className={`${styles.showreel}`} ref={vantaRef}>
      <div className="container">
        <div className={`reveal ${styles.showreelInner}`} ref={ref}>
          <div className={styles.showreelContent}>
            <div className="section-label">Watch & Believe</div>
            <h2 className="section-title">See the Magic Unfold</h2>
            <p className="section-subtitle">
              Watch highlights from over two decades of performances that have
              captivated audiences from Las Vegas to London.
            </p>
            <Link
              to="/contact"
              className="btn btn-primary"
              style={{ marginTop: "1.5rem" }}
            >
              Book Now ✦
            </Link>
          </div>
          <div className={styles.showreelVideo}>
            <div
              className={styles.videoPlaceholder}
              aria-label="Showreel video"
            >
              <div className={styles.playButton}>
                <span>▶</span>
              </div>
              <div className={styles.videoText}>Watch Showreel</div>
              <div className={styles.ring1} aria-hidden="true" />
              <div className={styles.ring2} aria-hidden="true" />
              <div className={styles.ring3} aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const ref = useScrollReveal();
  const [active, setActive] = useState(0);
  const testimonials = [
    {
      quote:
        "Parth left our entire corporate gala absolutely speechless. Even our most skeptical executives were completely baffled. An unforgettable evening.",
      name: "Sarah Chen",
      role: "Event Director, Fortune 500",
      rating: 5,
    },
    {
      quote:
        "Our wedding guests are still talking about Parth's performance a year later. He added a layer of pure magic to our special day that no other entertainer could.",
      name: "Michael & Emma Thornton",
      role: "Newlyweds",
      rating: 5,
    },
    {
      quote:
        "I've seen performers across four continents. Parth stands in a class entirely his own. The illusions were flawless; the showmanship, extraordinary.",
      name: "Roberto Alvarez",
      role: "Entertainment Producer",
      rating: 5,
    },
  ];
  useEffect(() => {
    const timer = setInterval(
      () => setActive((prev) => (prev + 1) % testimonials.length),
      5000,
    );
    return () => clearInterval(timer);
  }, [testimonials.length]);
  return (
    <section className={`section ${styles.testimonials}`}>
      <div className={styles.testimonialsGlow} aria-hidden="true" />
      <div className="container">
        <div className={`text-center reveal`} ref={ref}>
          <div className="section-label">What They Say</div>
          <h2 className="section-title">Words of Wonder</h2>
        </div>
        <div className={styles.testimonialSlider}>
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`${styles.testimonialCard} ${i === active ? styles.testimonialActive : ""}`}
              aria-hidden={i !== active}
            >
              <div className={styles.stars}>{"★".repeat(t.rating)}</div>
              <blockquote className={styles.quote}>
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar}>{t.name.charAt(0)}</div>
                <div>
                  <div className={styles.authorName}>{t.name}</div>
                  <div className={styles.authorRole}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
          <div
            className={styles.testimonialDots}
            role="tablist"
            aria-label="Testimonial navigation"
          >
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
                onClick={() => setActive(i)}
                role="tab"
                aria-selected={i === active}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BlogPreview({ blogs }) {
  const ref = useScrollReveal();
  const defaultBlogs = [
    {
      id: 1,
      title: "The Secret History of Stage Illusions",
      excerpt:
        "Explore the centuries-old traditions that shaped modern magic performance.",
      category: "History",
      slug: "history-of-illusions",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      title: "How to Amaze Corporate Audiences",
      excerpt:
        "Insights from 20 years of performing for Fortune 500 events worldwide.",
      category: "Tips",
      slug: "corporate-magic-tips",
      createdAt: "2024-01-08",
    },
    {
      id: 3,
      title: "The Psychology Behind Misdirection",
      excerpt:
        "Understanding how attention and perception create magical moments.",
      category: "Science",
      slug: "psychology-misdirection",
      createdAt: "2024-01-01",
    },
  ];
  const displayBlogs = blogs?.length ? blogs.slice(0, 3) : defaultBlogs;
  return (
    <section className={`section`}>
      <div className="container">
        <div className={`text-center reveal`} ref={ref}>
          <div className="section-label">Latest Stories</div>
          <h2 className="section-title">From Behind the Curtain</h2>
        </div>
        <div className="grid-3 stagger" ref={useScrollReveal()}>
          {displayBlogs.map((blog) => (
            <Link
              to={`/blog/${blog.slug}`}
              key={blog.id}
              className={`card ${styles.blogCard}`}
            >
              <div className={styles.blogCategory}>{blog.category}</div>
              <h3 className={styles.blogTitle}>{blog.title}</h3>
              <p className={styles.blogExcerpt}>{blog.excerpt}</p>
              <div className={styles.blogDate}>
                {blog.createdAt
                  ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  : ""}
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center" style={{ marginTop: "3rem" }}>
          <Link to="/blog" className="btn btn-outline">
            Read All Stories
          </Link>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const ref = useScrollReveal();
  const vantaRef = useVanta("HALO", {
    color: 0xc9a227,
    backgroundColor: 0x0a0a0f,
    amplitudeFactor: 1.5,
    size: 1.5,
  });
  return (
    <section className={styles.ctaSection} ref={vantaRef}>
      <div className="container">
        <div className={`text-center reveal`} ref={ref}>
          <div className="section-label">Ready to Be Amazed?</div>
          <h2 className={`section-title ${styles.ctaTitle}`}>
            Let&rsquo;s Create Something Magical
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto 2.5rem" }}>
            Whether it&rsquo;s an intimate gathering or a grand gala, Parth
            delivers moments that transcend the ordinary.
          </p>
          <div className={styles.ctaButtons}>
            <Link to="/contact" className="btn btn-primary">
              ✦ Book a Performance
            </Link>
            <Link to="/about" className="btn btn-ghost">
              Meet Parth →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [services, setServices] = useState([]);
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    serviceAPI
      .getAll("?limit=6")
      .then((r) => setServices(r?.data?.services || []))
      .catch(() => {});
    blogAPI
      .getFeatured()
      .then((r) => setBlogs(r?.data?.blogs || []))
      .catch(() => {});
  }, []);
  return (
    <>
      <SEOHead
        description="Experience world-class magic and illusions with Parth the Illusionist. Corporate events, weddings, private parties, and stage shows."
        keywords="magician, illusionist, magic shows, corporate entertainment, wedding magician, stage illusions"
        canonicalPath="/"
      />
      <main className={`page-transition`}>
        <Hero />
        <Stats />
        <ServicesPreview services={services} />
        <ShowreelSection />
        <Testimonials />
        <BlogPreview blogs={blogs} />
        <CTASection />
      </main>
    </>
  );
}
