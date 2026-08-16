import { useState, useEffect } from 'react';
import styles from './Nav.module.css';

const navItems = [
  { id: 'hero', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'education', label: 'EDU' },
  { id: 'contact', label: 'CONTACT' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      const sections = navItems.map(item => document.getElementById(item.id)).filter(Boolean);
      const current = sections.findLast(el => el.getBoundingClientRect().top <= 120);
      if (current) setActive(current.id);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
        aria-label="Main navigation"
      >
        <div className={styles.brand} onClick={() => scrollTo('hero')} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && scrollTo('hero')}>
          <span className={styles.brandStar}>★</span>
          <span className={styles.brandName}>ASTRA</span>
        </div>

        {/* Desktop nav */}
        <ul className={styles.links} role="list">
          {navItems.map(item => (
            <li key={item.id}>
              <button
                className={`${styles.link} ${active === item.id ? styles.linkActive : ''}`}
                onClick={() => scrollTo(item.id)}
                aria-current={active === item.id ? 'page' : undefined}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen3 : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`} aria-hidden={!menuOpen}>
        <ul role="list">
          {navItems.map((item, i) => (
            <li key={item.id} style={{ transitionDelay: `${i * 40}ms` }}>
              <button
                className={`${styles.mobileLink} ${active === item.id ? styles.mobileLinkActive : ''}`}
                onClick={() => scrollTo(item.id)}
                tabIndex={menuOpen ? 0 : -1}
              >
                <span className={styles.mobileIndex}>0{i + 1}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
