// src/pages/Blog.jsx
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useVanta } from '../hooks/useVanta'
import { blogAPI } from '../utils/api'
import styles from './Blog.module.css'

const defaultBlogs = [
  { id: '1', title: 'The Secret History of Stage Illusions', excerpt: 'Explore the centuries-old traditions that shaped modern magic performance, from ancient Egypt to Las Vegas.', category: 'History', slug: 'history-of-illusions', createdAt: '2024-01-15', readingTime: 8, isFeatured: true },
  { id: '2', title: 'How to Amaze Corporate Audiences', excerpt: 'Insights from 20 years of performing for Fortune 500 events worldwide — what works and why.', category: 'Tips', slug: 'corporate-magic-tips', createdAt: '2024-01-08', readingTime: 6, isFeatured: false },
  { id: '3', title: 'The Psychology Behind Misdirection', excerpt: 'Understanding how attention and perception create the foundation for every magical moment.', category: 'Science', slug: 'psychology-misdirection', createdAt: '2024-01-01', readingTime: 10, isFeatured: false },
  { id: '4', title: 'Magic for Weddings: A Complete Guide', excerpt: 'Everything couples need to know about incorporating magic into their wedding celebration.', category: 'Guide', slug: 'wedding-magic-guide', createdAt: '2023-12-20', readingTime: 12, isFeatured: false },
  { id: '5', title: 'The Art of the Grand Reveal', excerpt: 'Crafting the perfect climactic moment that leaves audiences breathless and wanting more.', category: 'Craft', slug: 'art-of-grand-reveal', createdAt: '2023-12-10', readingTime: 7, isFeatured: false },
  { id: '6', title: 'Virtual Magic: Making the Impossible Digital', excerpt: 'How technology has opened new frontiers for magical performance in the digital age.', category: 'Innovation', slug: 'virtual-magic-digital', createdAt: '2023-12-01', readingTime: 9, isFeatured: false },
]

const categoryColors = {
  History: '#8b5e3c',
  Tips: '#2d6a4f',
  Science: '#1d3557',
  Guide: '#6b2d8b',
  Craft: '#8b1a2a',
  Innovation: '#1a5276',
}

function BlogCard({ blog, featured = false }) {
  return (
    <Link
      to={`/blog/${blog.slug}`}
      className={`card ${styles.blogCard} ${featured ? styles.blogFeatured : ''}`}
    >
      {/* Image placeholder */}
      <div className={styles.blogImage} style={{ background: `linear-gradient(135deg, ${categoryColors[blog.category] || '#1a1a2e'}44, var(--color-shadow))` }}>
        <div className={styles.blogImageSymbol}>✦</div>
        <div className={styles.blogCategory}>{blog.category}</div>
      </div>
      <div className={styles.blogContent}>
        <h2 className={styles.blogTitle}>{blog.title}</h2>
        <p className={styles.blogExcerpt}>{blog.excerpt}</p>
        <div className={styles.blogMeta}>
          <span className={styles.blogDate}>
            {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-US', {
              month: 'long', day: 'numeric', year: 'numeric'
            }) : ''}
          </span>
          {blog.readingTime && (
            <span className={styles.blogRead}>{blog.readingTime} min read</span>
          )}
        </div>
      </div>
    </Link>
  )
}

function BlogPost({ blog }) {
  const ref = useScrollReveal()

  const sampleContent = `
## The Beginning

Magic has fascinated humanity for millennia. From ancient ritual to modern performance, the art of illusion has evolved through centuries of innovation, secrecy, and showmanship.

### Ancient Origins

The earliest recorded magic performance dates to 2700 BCE in ancient Egypt, where a court magician named Dedi reportedly performed tricks for the Pharaoh. These early performances often blended genuine skill with deliberate mystery.

### The Golden Age

The 19th century brought what many consider magic's golden age. Performers like Jean Eugène Robert-Houdin and Harry Houdini transformed magic from street entertainment into theatrical art, creating elaborate stage productions and developing the conventions we still recognize today.

### Modern Illusion

Today's illusionists blend technology, psychology, and pure sleight-of-hand to create experiences that challenge our understanding of what's possible. The fundamental principles remain unchanged — it's the execution that has become extraordinary.

> "Magic is not about fooling people; it's about giving them permission to believe in something wonderful for a moment." — Magnus

### The Future of Magic

As technology advances, new possibilities emerge. Holographic illusions, augmented reality performances, and virtual magic shows have opened entirely new frontiers for the art form.
  `

  return (
    <main className="page-transition">
      <article>
        <header className={styles.postHero}>
          <div className={styles.postHeroBg} style={{ background: `linear-gradient(135deg, ${categoryColors[blog.category] || '#1a1a2e'}22, transparent)` }} />
          <div className="container">
            <div className={`${styles.postHeader} reveal`} ref={ref}>
              <Link to="/blog" className={styles.backLink}>← Back to Blog</Link>
              <div className={styles.postCategory}>{blog.category}</div>
              <h1 className={styles.postTitle}>{blog.title}</h1>
              <div className={styles.postMeta}>
                <span>{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}</span>
                {blog.readingTime && <span>·</span>}
                {blog.readingTime && <span>{blog.readingTime} min read</span>}
                <span>·</span>
                <span>By Magnus</span>
              </div>
            </div>
          </div>
        </header>

        <div className="container">
          <div className={styles.postBody}>
            <div className={styles.postContent} ref={useScrollReveal()}>
              <p className={styles.postLead}>{blog.excerpt}</p>
              <div className={styles.prose} dangerouslySetInnerHTML={{ __html: sampleContent.replace(/##\s(.+)/g, '<h2>$1</h2>').replace(/###\s(.+)/g, '<h3>$1</h3>').replace(/>\s(.+)/g, '<blockquote>$1</blockquote>').replace(/\n\n/g, '</p><p>').replace(/^/, '<p>').replace(/$/, '</p>') }} />
            </div>
            <aside className={styles.postSidebar}>
              <div className={styles.sidebarCard}>
                <div className="section-label">About Magnus</div>
                <p className={styles.sidebarText}>World-class magician and illusionist with 20+ years of experience performing across 15 countries.</p>
                <Link to="/contact" className="btn btn-primary" style={{ marginTop: '1rem', fontSize: '0.75rem', padding: '0.75rem 1.5rem' }}>
                  Book a Show ✦
                </Link>
              </div>
              <div className={styles.sidebarCard}>
                <div className="section-label">Categories</div>
                <div className={styles.categoryList}>
                  {Object.keys(categoryColors).map(cat => (
                    <Link to={`/blog?category=${cat}`} key={cat} className={styles.categoryTag}>
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </main>
  )
}

export default function Blog() {
  const { identifier } = useParams()
  const [blogs, setBlogs] = useState([])
  const [featured, setFeatured] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const gridRef = useScrollReveal()
  const vantaHeroRef = useVanta('BIRDS', {
    color1: 0xc9a227,
    color2: 0x8b1a2a,
    colorMode: 'lerp',
    birdSize: 1.2,
    wingSpan: 25.0,
    speedLimit: 3.0,
    separation: 50.0,
    alignment: 50.0,
    cohesion: 50.0,
    quantity: 3.0,
    backgroundColor: 0x0a0a0f,
  })
  useEffect(() => {
    Promise.all([
      blogAPI.getAll().catch(() => null),
      blogAPI.getFeatured().catch(() => null),
    ]).then(([allRes, featuredRes]) => {
      const allBlogs = allRes?.data?.blogs?.length ? allRes.data.blogs : defaultBlogs
      const feat = featuredRes?.data?.blogs?.[0] || defaultBlogs[0]
      setBlogs(allBlogs)
      setFeatured(feat)
    }).finally(() => setLoading(false))
  }, [])

  if (identifier) {
    const blog = blogs.find(b => b.slug === identifier) || defaultBlogs.find(b => b.slug === identifier) || defaultBlogs[0]
    return (
      <>
        <SEOHead title={blog.title} description={blog.excerpt} canonicalPath={`/blog/${identifier}`} />
        <div style={{ height: 'var(--nav-height)' }} />
        <BlogPost blog={blog} />
      </>
    )
  }

  const categories = ['All', ...new Set(blogs.map(b => b.category))]
  const filteredBlogs = blogs.filter(b => {
    const matchSearch = !searchTerm || b.title.toLowerCase().includes(searchTerm.toLowerCase()) || b.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchCat = activeCategory === 'All' || b.category === activeCategory
    return matchSearch && matchCat
  })

  return (
    <>
      <SEOHead
        title="Blog"
        description="Stories, insights, and behind-the-scenes looks at the world of magic from Magnus the Illusionist."
        canonicalPath="/blog"
      />
      <main className="page-transition">
        {/* Hero */}
        <section className={styles.hero} ref={vantaHeroRef}>
          <div className="container">
            <div className="text-center reveal" ref={useScrollReveal()}>
              <div className="section-label">Stories & Insights</div>
              <h1 className="section-title">
                <span className="shimmer-text">Behind the Curtain</span>
              </h1>
              <p className="section-subtitle" style={{ margin: '0 auto 2.5rem' }}>
                Magical stories, performance insights, and the secrets of showmanship
                — told by someone who has lived it.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featured && !loading && (
          <section className="section" style={{ paddingTop: 0 }}>
            <div className="container">
              <div className="section-label" style={{ marginBottom: '1.5rem' }}>Featured Story</div>
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
                  className="form-input"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  style={{ maxWidth: '300px' }}
                  aria-label="Search blog posts"
                />
              </div>
              <div className={styles.categoryFilters} role="group" aria-label="Filter by category">
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterActive : ''}`}
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
        <section className="section" style={{ paddingTop: '2rem' }}>
          <div className="container">
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
                <div className="loading-symbol">✦</div>
              </div>
            ) : filteredBlogs.length === 0 ? (
              <div className="text-center" style={{ padding: '4rem', color: 'var(--color-white-dim)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--color-gold)' }}>✦</div>
                <p>No stories found matching your search.</p>
              </div>
            ) : (
              <div className={`${styles.blogGrid} stagger`} ref={gridRef}>
                {filteredBlogs.filter(b => b.id !== featured?.id).map(blog => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  )
}
