// src/pages/NotFound.jsx
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <>
      <SEOHead title="Page Not Found" noIndex />
      <main className={styles.page}>
        <div className={styles.content}>
          <div className={styles.symbol}>✦</div>
          <h1 className={styles.code}>404</h1>
          <h2 className={styles.title}>The Magic Has Vanished</h2>
          <p className={styles.desc}>
            This page has disappeared — much like a coin in Magnus's hands.
            Perhaps it was never here, or maybe it's simply hiding.
          </p>
          <div className={styles.buttons}>
            <Link to="/" className="btn btn-primary">Return to the Show</Link>
            <Link to="/contact" className="btn btn-ghost">Contact Magnus</Link>
          </div>
        </div>
      </main>
    </>
  )
}
