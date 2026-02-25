// src/App.jsx
import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import Cursor from './components/Cursor'
import MagicParticles from './components/MagicParticles'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      {/* Global UI */}
      <LoadingScreen />
      <Cursor />
      <MagicParticles count={20} />
      <div className="noise-overlay" aria-hidden="true" />

      {/* App */}
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:identifier" element={<Services />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:identifier" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  )
}
