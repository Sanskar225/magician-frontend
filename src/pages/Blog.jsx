// src/pages/Blog.jsx
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useVanta } from "../hooks/useVanta";
import { blogAPI } from "../utils/api";
import styles from "./Blog.module.css";
import lineart1 from "../assets/lineart_1.png";
import group5 from "../assets/Group-5.png";

const blogPosts = [
  {
    id: "1",
    title: "How Magician Parth Turns Live Performances into Shared Moments of Amazement",
    excerpt: "Discover the secrets behind creating unforgettable shared experiences that leave audiences spellbound and connected through the power of magic.",
    category: "Performance",
    slug: "live-performances-shared-moments",
    createdAt: "2024-02-15",
    readingTime: 8,
    isFeatured: true,
    content: `
## The Magic of Shared Experience

When you witness magic alone, it's impressive. When you experience it with others, it becomes unforgettable. This is the fundamental principle that guides every Parth performance.

### The Collective Wonder

There's something uniquely powerful about a room full of people gasping simultaneously. That shared moment of disbelief creates a bond between strangers, a collective memory that transcends the performance itself.

### Building Connection

My approach focuses on involving multiple audience members in ways that create ripples of wonder throughout the room. When one person experiences something impossible, everyone around them shares in that moment of awe.

> "Magic is the only art form that requires witnesses to fully exist. Without an audience, it's just a secret." — Parth

### Creating Memories

The goal isn't just to entertain—it's to create memories that people will talk about for years. That's why every performance is designed to be interactive, engaging, and deeply personal.
    `
  },
  {
    id: "2",
    title: "Designing Magical Experiences That Feel Personal – Inside Magician Parth's Approach",
    excerpt: "How custom-tailored illusions create intimate connections with audience members, making each show feel like it was designed just for them.",
    category: "Craft",
    slug: "designing-personal-magical-experiences",
    createdAt: "2024-02-08",
    readingTime: 6,
    isFeatured: false,
    content: `
## The Art of Personal Magic

Every person who walks into a show carries their own story, their own hopes, their own skepticism. The magician's task is to meet them where they are.

### Reading the Room

Years of experience have taught me to read audiences like books. The subtle shifts in energy, the collective breath, the moments of doubt—all inform how a performance unfolds.

### Custom Moments

No two shows are exactly alike. I adapt each performance to the specific energy of the room, creating moments that feel spontaneous and personal.

### The After-Show Connection

Some of the most powerful magic happens after the curtain falls—the conversations, the questions, the moments of genuine connection that remind us why we love this art.
    `
  },
  {
    id: "3",
    title: "Magician Parth and the Science of Creating Real Audience Engagement Through Magic",
    excerpt: "Understanding the psychology behind what makes audiences lean in, gasp, and remember performances long after they've ended.",
    category: "Science",
    slug: "science-audience-engagement",
    createdAt: "2024-02-01",
    readingTime: 10,
    isFeatured: false,
    content: `
## The Psychology of Wonder

Engagement isn't accidental—it's engineered. Every gesture, every pause, every glance is calibrated to create maximum impact.

### Attention Economics

In a world of constant distraction, holding attention is the magician's greatest challenge. The solution lies in understanding how attention works and using it to guide the audience's experience.

### The Power of Surprise

The brain craves novelty. When something unexpected happens, it releases dopamine, creating pleasure and reinforcing memory. This is why magical moments stick with us.

> "The mind wants to be fooled. It's looking for patterns, for meaning, for moments that transcend the ordinary." — Parth

### Building Anticipation

The setup is as important as the payoff. Creating anticipation builds emotional investment, making the final revelation more powerful.
    `
  },
  {
    id: "4",
    title: "Magician Parth's Signature Style: Where Preparation Translates into Powerful Performances",
    excerpt: "Behind every seemingly effortless moment lies hours of dedicated practice and meticulous planning.",
    category: "Craft",
    slug: "signature-style-preparation",
    createdAt: "2024-01-20",
    readingTime: 7,
    isFeatured: false,
    content: `
## The Hidden Work

What looks like spontaneity is actually the result of thousands of hours of practice. Every movement, every word, every gesture has been refined through repetition.

### The Illusion of Effortlessness

The best performances look easy. This is the result of preparation so thorough that it becomes invisible. When you're watching me perform, you're seeing only the tip of the iceberg.

### Continuous Evolution

Magic never stands still. I'm constantly refining my craft, learning new techniques, and pushing the boundaries of what's possible.

### The Moment of Truth

When all the preparation comes together in a single moment of wonder—that's why I do this. That moment makes every hour of practice worthwhile.
    `
  },
  {
    id: "5",
    title: "Celebrating the Colors of Joy: Magician Parth Wishes Everyone a Happy Holi:-",
    excerpt: "Special Holi message celebrating the festival of colors with magical performances and community joy.",
    category: "Celebration",
    slug: "holi-celebration-colors-joy",
    createdAt: "2024-03-15",
    readingTime: 5,
    isFeatured: false,
    content: `
## A Magical Holi

Holi is the festival of colors, of joy, of community—values that resonate deeply with the spirit of magic. This year, I had the privilege of celebrating with audiences across the city.

### Colors and Wonder

There's something magical about the way colors transform our perception, just as magic transforms our understanding of what's possible. Both remind us to see the world with fresh eyes.

### Community Celebration

The best performances happen when communities come together to share wonder. This Holi, I was reminded why I love what I do—bringing joy to people's lives.

> "May your life be as colorful as Holi and as magical as the moments we share." — Parth

### Looking Forward

As we move through the year, I carry the spirit of Holi with me—the joy, the connection, the celebration of life itself.
    `
  },
  {
    id: "6",
    title: "How Magician Parth Builds Atmosphere and Energy with Thoughtful Live Magic",
    excerpt: "The techniques and approaches used to transform ordinary spaces into realms of wonder and possibility.",
    category: "Performance",
    slug: "building-atmosphere-energy",
    createdAt: "2024-01-10",
    readingTime: 8,
    isFeatured: false,
    content: `
## Creating the Atmosphere

Before the first trick, before the first word, the atmosphere must be set. This is where the magic truly begins.

### The Power of Space

Every venue has its own energy. Learning to read and work with that energy is essential to creating a successful performance. The space itself becomes part of the show.

### Lighting and Sound

Subtle elements create powerful effects. The way light falls, the way sound moves through a room—all of these factors influence how audiences experience magic.

### Building Energy

A performance is a journey. It has highs and lows, moments of intensity and moments of calm. Managing this journey is the art of building energy throughout the show.

### The Finale

The climax must feel earned. Every moment leading up to it contributes to the final revelation, creating a sense of culmination that leaves audiences breathless.
    `
  }
];

const cities = [
  "Lucknow", "Kanpur", "Agra", "Varanasi"
];

const categoryColors = {
  Performance: "#c9a227",
  Craft: "#8b1a2a",
  Science: "#1d3557",
  Celebration: "#6b2d8b",
  History: "#8b5e3c",
  Tips: "#2d6a4f",
  Guide: "#6b2d8b",
  Innovation: "#1a5276",
};

const recentPosts = blogPosts.slice(1, 6); // All except first for recent posts

function BlogCard({ blog, featured = false }) {
  return (
    <Link
      to={`/blog/${blog.slug}`}
      className={`card ${styles.blogCard} ${featured ? styles.blogFeatured : ""}`}
    >
      <div
        className={styles.blogImage}
        style={{
          background: `linear-gradient(135deg, ${categoryColors[blog.category] || "#1a1a2e"}44, var(--color-shadow))`,
        }}
      >
        <div className={styles.blogImageSymbol}>✦</div>
        <div className={styles.blogCategory}>{blog.category}</div>
      </div>
      <div className={styles.blogContent}>
        <h2 className={styles.blogTitle}>{blog.title}</h2>
        <p className={styles.blogExcerpt}>{blog.excerpt}</p>
        <div className={styles.blogMeta}>
          <span className={styles.blogDate}>
            {new Date(blog.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className={styles.blogRead}>{blog.readingTime} min read</span>
        </div>
        <span className={styles.blogReadMore}>
          Read More <span className={styles.readMoreArrow}>→</span>
        </span>
      </div>
    </Link>
  );
}

function BlogPost({ blog }) {
  const ref = useScrollReveal();

  return (
    <main className="page-transition">
      <article>
        <header className={styles.postHero}>
          <div
            className={styles.postHeroBg}
            style={{
              background: `linear-gradient(135deg, ${categoryColors[blog.category] || "#1a1a2e"}22, transparent)`,
            }}
          />
          <div className={styles.postParticles}>
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className={styles.postParticle}
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
            <div className={`${styles.postHeader} reveal`} ref={ref}>
              <Link to="/blog" className={styles.backLink}>
                <span className={styles.backArrow}>←</span> Back to Blog
              </Link>
              <div className={styles.postCategory}>{blog.category}</div>
              <h1 className={styles.postTitle}>{blog.title}</h1>
              <div className={styles.postMeta}>
                <span className={styles.metaIcon}>📅</span>
                <span>
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className={styles.metaDot}>✦</span>
                <span className={styles.metaIcon}>⏱️</span>
                <span>{blog.readingTime} min read</span>
                <span className={styles.metaDot}>✦</span>
                <span className={styles.metaIcon}>🎩</span>
                <span>By Parth</span>
              </div>
            </div>
          </div>
        </header>

        <div className="container">
          <div className={styles.postBody}>
            <div className={styles.postContent} ref={useScrollReveal()}>
              <p className={styles.postLead}>{blog.excerpt}</p>
              <div
                className={styles.prose}
                dangerouslySetInnerHTML={{
                  __html: blog.content
                    .replace(/##\s(.+)/g, "<h2>$1</h2>")
                    .replace(/###\s(.+)/g, "<h3>$1</h3>")
                    .replace(/>\s(.+)/g, "<blockquote>$1</blockquote>")
                    .split('\n\n').map(para => {
                      if (para.startsWith('<h2>') || para.startsWith('<h3>') || para.startsWith('<blockquote>')) {
                        return para;
                      }
                      return `<p>${para.replace(/\n/g, ' ')}</p>`;
                    }).join(''),
                }}
              />
            </div>
            <aside className={styles.postSidebar}>
              <div className={styles.sidebarCard}>
                <div className={styles.sidebarIcon}>🎩</div>
                <h3 className={styles.sidebarTitle}>About Parth</h3>
                <p className={styles.sidebarText}>
                  World-class magician and illusionist with 20+ years of
                  experience performing across 15 countries. Master of mentalism,
                  close-up magic, and grand illusions.
                </p>
                <Link
                  to="/contact"
                  className={styles.sidebarButton}
                >
                  <span>Book a Show</span>
                  <span className={styles.buttonSparkle}>✦</span>
                </Link>
              </div>

              <div className={styles.sidebarCard}>
                <div className={styles.sidebarIcon}>📚</div>
                <h3 className={styles.sidebarTitle}>Categories</h3>
                <div className={styles.categoryList}>
                  {Object.keys(categoryColors).map((cat) => (
                    <Link
                      to={`/blog?category=${cat}`}
                      key={cat}
                      className={styles.categoryTag}
                      style={{ '--cat-color': categoryColors[cat] }}
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>

              <div className={styles.sidebarCard}>
                <div className={styles.sidebarIcon}>✨</div>
                <h3 className={styles.sidebarTitle}>Recent Posts</h3>
                <div className={styles.recentPostsList}>
                  {recentPosts.map(post => (
                    <Link key={post.id} to={`/blog/${post.slug}`} className={styles.recentPostItem}>
                      <span className={styles.recentPostTitle}>{post.title}</span>
                      <span className={styles.recentPostDate}>
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </main>
  );
}

export default function Blog() {
  const { identifier } = useParams();
  const [blogs] = useState(blogPosts);
  const [featured] = useState(blogPosts[0]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const gridRef = useScrollReveal();
  const vantaHeroRef = useVanta("BIRDS", {
    color1: 0xc9a227,
    color2: 0x8b1a2a,
    colorMode: "lerp",
    birdSize: 1.2,
    wingSpan: 25.0,
    speedLimit: 3.0,
    separation: 50.0,
    alignment: 50.0,
    cohesion: 50.0,
    quantity: 3.0,
    backgroundColor: 0x0a0a0f,
  });

  if (identifier) {
    const blog = blogs.find((b) => b.slug === identifier) || blogs[0];
    return (
      <>
        <SEOHead
          title={blog.title}
          description={blog.excerpt}
          canonicalPath={`/blog/${identifier}`}
        />
        <div style={{ height: "var(--nav-height)" }} />
        <BlogPost blog={blog} />
      </>
    );
  }

  const categories = ["All", ...new Set(blogs.map((b) => b.category))];
  const filteredBlogs = blogs.filter((b) => {
    const matchSearch =
      !searchTerm ||
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = activeCategory === "All" || b.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <>
      <SEOHead
        title="Blog - Magician Parth | Stories & Insights from the World of Magic"
        description="Explore magical stories, performance insights, and behind-the-scenes secrets from Magician Parth. Discover the art of illusion and wonder."
        canonicalPath="/blog"
        keywords="magic blog, illusionist stories, magic performance tips, behind the scenes magic, magician parth blog"
      />

      <main className="page-transition">
        {/* Skip to content link for accessibility */}
        <a href="#main-content" className={styles.skipLink}>
          Skip to content
        </a>

        {/* Hero Section */}
        <section className={styles.hero} ref={vantaHeroRef}>
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
            <div className={styles.heroContent}>
              <img src={lineart1} alt="" className={styles.heroLineArt} />
              <div className="text-center reveal">
                <div className="section-label">Stories & Insights</div>
                <h1 className="section-title">
                  <span className="shimmer-text">Behind the Curtain</span>
                </h1>
                <p className={styles.heroSubtitle}>
                  Magical stories, performance insights, and the secrets of
                  showmanship — told by someone who has lived it.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.scrollIndicator}>
            <span className={styles.scrollText}>Explore Stories</span>
            <span className={styles.scrollArrow}>↓</span>
          </div>
        </section>

        {/* Main Content */}
        <div id="main-content" className={styles.mainContent}>
          {/* Featured Post */}
          {featured && !loading && (
            <section className={`section ${styles.featuredSection}`}>
              <div className="container">
                <div className={styles.featuredLabel}>
                  <span className={styles.featuredIcon}>✦</span>
                  <span>Featured Story</span>
                  <span className={styles.featuredIcon}>✦</span>
                </div>
                <BlogCard blog={featured} featured />
              </div>
            </section>
          )}

          {/* Filters */}
          <section className={styles.filters}>
            <div className="container">
              <div className={styles.filtersInner}>
                <div className={styles.searchWrap}>
                  <input
                    type="search"
                    placeholder="Search stories..."
                    className={styles.searchInput}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label="Search blog posts"
                  />
                  <span className={styles.searchIcon}>🔍</span>
                </div>
                <div
                  className={styles.categoryFilters}
                  role="group"
                  aria-label="Filter by category"
                >
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterActive : ""}`}
                      onClick={() => setActiveCategory(cat)}
                      aria-pressed={activeCategory === cat}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Blog Grid */}
          <section className={`section ${styles.blogSection}`}>
            <div className="container">
              {loading ? (
                <div className={styles.loadingContainer}>
                  <div className={styles.loadingSymbol}>✦</div>
                </div>
              ) : filteredBlogs.length === 0 ? (
                <div className={styles.noResults}>
                  <div className={styles.noResultsSymbol}>✦</div>
                  <p>No stories found matching your search.</p>
                  <button 
                    className={styles.clearSearch}
                    onClick={() => {
                      setSearchTerm("");
                      setActiveCategory("All");
                    }}
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <>
                  <div className={`${styles.blogGrid} stagger`} ref={gridRef}>
                    {filteredBlogs
                      .filter((b) => b.id !== featured?.id)
                      .map((blog) => (
                        <BlogCard key={blog.id} blog={blog} />
                      ))}
                  </div>
                  
                  {/* Pagination */}
                  <div className={styles.pagination}>
                    <button className={styles.paginationBtn} disabled>
                      <span className={styles.paginationArrow}>←</span> Previous
                    </button>
                    <span className={styles.paginationCurrent}>Page 1 of 1</span>
                    <button className={styles.paginationBtn} disabled>
                      Next <span className={styles.paginationArrow}>→</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </section>

          {/* Recent Posts Sidebar (Mobile) */}
          <section className={styles.recentMobile}>
            <div className="container">
              <div className={styles.recentMobileHeader}>
                <span className={styles.recentMobileIcon}>✨</span>
                <h3>Recent Post</h3>
              </div>
              <div className={styles.recentMobileList}>
                {recentPosts.map(post => (
                  <Link key={post.id} to={`/blog/${post.slug}`} className={styles.recentMobileItem}>
                    <span className={styles.recentMobileTitle}>{post.title}</span>
                    <span className={styles.recentMobileDate}>
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Get in Touch Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaBackground}>
            <img src={group5} alt="" className={styles.ctaDeco} />
            <div className={styles.ctaParticles}>
              {[...Array(15)].map((_, i) => (
                <div key={i} className={styles.ctaParticle}>
                  {['✦', '✧', '⚡'][Math.floor(Math.random() * 3)]}
                </div>
              ))}
            </div>
          </div>

          <div className="container">
            <div className={styles.ctaContent}>
              <div className="reveal">
                <h2 className={styles.ctaTitle}>Get in touch</h2>
                <div className={styles.ctaSubtitle}>
                  <span className={styles.ctaDeco}>✦</span>
                  <span>Magician Parth</span>
                  <span className={styles.ctaDeco}>✦</span>
                </div>
                <p className={styles.ctaDescription}>
                  The world is full of magic things, patiently waiting for our senses to grow sharper
                </p>

                <div className={styles.ctaSocial}>
                  <span className={styles.ctaSocialText}>Follow us on social</span>
                  <div className={styles.ctaSocialIcons}>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.ctaSocialIcon}>
                      <span className={styles.socialIcon}>Instagram</span>
                      <span className={styles.socialGlow}></span>
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.ctaSocialIcon}>
                      <span className={styles.socialIcon}>Facebook-f</span>
                      <span className={styles.socialGlow}></span>
                    </a>
                    <a href="https://x.com" target="_blank" rel="noopener noreferrer" className={styles.ctaSocialIcon}>
                      <span className={styles.socialIcon}>X-twitter</span>
                      <span className={styles.socialGlow}></span>
                    </a>
                  </div>
                  <p className={styles.ctaSocialTagline}>Get the magicial essence.</p>
                </div>

                <div className={styles.ctaCities}>
                  {cities.map(city => (
                    <Link key={city} to={`/services?city=${city.toLowerCase()}`} className={styles.ctaCity}>
                      Best Magician In {city}
                    </Link>
                  ))}
                </div>

                <div className={styles.copyright}>
                  © Copyright 2026 | Magician Parth | All rights reserved.
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}