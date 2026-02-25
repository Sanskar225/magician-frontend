// src/components/Navbar.jsx
import { useState, useEffect, useCallback } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <nav
      className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Logo */}
      <Link
        to="/"
        className={styles.logo}
        aria-label="Parth the Illusionist - Home"
      >
        <span className={styles.logoSymbol}>✦</span>
        <div className={styles.logoText}>
          <span className={styles.logoName}>Parth</span>
          <span className={styles.logoTag}>The Illusionist</span>
        </div>
      </Link>

      {/* Desktop nav */}
      <ul className={styles.navLinks} role="list">
        {navLinks.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
              end={to === "/"}
            >
              {label}
              <span className={styles.navUnderline} aria-hidden="true" />
            </NavLink>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link to="/contact" className={`btn btn-primary ${styles.cta}`}>
        Book a Show
      </Link>

      {/* Mobile hamburger */}
      <button
        className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Mobile menu */}
      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ""}`}
        aria-hidden={!menuOpen}
      >
        <ul role="list">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `${styles.mobileLink} ${isActive ? styles.active : ""}`
                }
                end={to === "/"}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
        <Link to="/contact" className="btn btn-primary">
          Book a Show
        </Link>
      </div>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className={styles.overlay}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </nav>
  );
}
