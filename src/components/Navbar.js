import Link from 'next/link'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className="container">
        <div className={styles.inner}>
          <Link className={styles.logo} href="/">
            REVIER<span className={styles.logoSub}>ACADEMY</span>
          </Link>
          <ul className={styles.links}>
            <li><Link className={styles.link} href="/#trilhas">Trilhas</Link></li>
            <li><Link className={styles.link} href="/#como-usar">Ritmo</Link></li>
            <li><span className={styles.badge}>Uso Interno</span></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
