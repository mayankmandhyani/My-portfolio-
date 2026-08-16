import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__brand-astra">ASTRA</span>
          <span className="footer__brand-sep"> // </span>
          <span className="footer__brand-studio">Studio</span>
        </div>

        <div className="footer__meta">
          <span className="footer__name">Mayank Madhyani</span>
          <span className="footer__sep">·</span>
          <span className="footer__location">Surat, Gujarat, India</span>
        </div>

        <div className="footer__sig">
          <span>Built with React + Vite + questionable life choices.</span>
          <span className="footer__year"> &copy; {new Date().getFullYear()}</span>
        </div>

        <div className="footer__coords">
          <span className="footer__coord-item">LAT: 21.1702° N</span>
          <span className="footer__coord-sep"> // </span>
          <span className="footer__coord-item">LNG: 72.8311° E</span>
          <span className="footer__coord-sep"> // </span>
          <span className="footer__coord-item">SECTOR: 7G</span>
        </div>
      </div>

      {/* Pixel divider */}
      <div className="footer__pixel-line" aria-hidden="true">
        {Array.from({ length: 60 }).map((_, i) => (
          <span key={i} className="footer__px" style={{ opacity: Math.random() > 0.3 ? 1 : 0.2 }} />
        ))}
      </div>
    </footer>
  );
}
