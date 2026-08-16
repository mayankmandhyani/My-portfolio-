import { useState, useEffect } from 'react';
import { personal } from '../data/portfolioData';
import './Nav.css';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      // Highlight active section
      const sections = NAV_LINKS.map(l => l.href.slice(1));
      let current = '';
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) current = id;
      });
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLink = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`} aria-label="Main navigation">
      <div className="nav__inner section-wrap">
        {/* Brand */}
        <a href="#hero" className="nav__brand" onClick={e => handleLink(e, '#hero')}>
          <span className="nav__brand-dot" aria-hidden="true">◈</span>
          <span>{personal.brand}</span>
        </a>

        {/* Desktop links */}
        <ul className="nav__links" role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className={`nav__link${active === href.slice(1) ? ' nav__link--active' : ''}`}
                onClick={e => handleLink(e, href)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className={`nav__toggle${menuOpen ? ' nav__toggle--open' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(v => !v)}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="nav__mobile" role="dialog" aria-label="Mobile navigation">
          <ul role="list">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="nav__mobile-link"
                  onClick={e => handleLink(e, href)}
                >
                  <span className="nav__mobile-arrow" aria-hidden="true">▶</span>
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="nav__mobile-footer">
            <span>ASTRA SYS v0.1</span>
          </div>
        </div>
      )}
    </nav>
  );
}
