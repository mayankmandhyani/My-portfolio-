import { useState, useEffect } from 'react';
import './Nav.css';

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <a href="#hero" className="nav__brand" aria-label="ASTRA Studio — home">
        <span className="nav__brand-astra">ASTRA</span>
        <span className="nav__brand-sep"> // </span>
        <span className="nav__brand-sub">Studio</span>
      </a>

      {/* Desktop links */}
      <ul className="nav__links" role="list">
        {links.map(l => (
          <li key={l.href}>
            <a href={l.href} className="nav__link">{l.label}</a>
          </li>
        ))}
      </ul>

      {/* Mobile hamburger */}
      <button
        className={`nav__burger${open ? ' open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        <span /><span /><span />
      </button>

      {/* Mobile drawer */}
      {open && (
        <div className="nav__drawer" role="dialog" aria-label="Mobile menu">
          <ul role="list">
            {links.map(l => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="nav__drawer-link"
                  onClick={() => setOpen(false)}
                >
                  <span className="nav__drawer-arrow">{'>'}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="nav__drawer-sig">ASTRA STUDIO // SURAT, GJ</p>
        </div>
      )}
    </nav>
  );
}
