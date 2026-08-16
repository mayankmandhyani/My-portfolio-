import { personal } from '../data/portfolioData';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="section-wrap footer__inner">
        <div className="footer__brand">
          <span className="footer__brand-mark" aria-hidden="true">◈</span>
          <div>
            <p className="footer__brand-name">{personal.brand}</p>
            <p className="footer__brand-sub">{personal.name} · {personal.location}</p>
          </div>
        </div>

        <div className="footer__center">
          <p className="footer__microcopy">
            Built by hand. Fueled by curiosity and an unreasonable amount of tab-switching.
          </p>
          <p className="footer__copyright">
            © {year} {personal.brand}. All rights reserved, mostly.
          </p>
        </div>

        <div className="footer__signal" aria-hidden="true">
          <div className="footer__signal-lines">
            {[1,2,3,4].map(n => (
              <div key={n} className="footer__signal-line" style={{ '--n': n }} />
            ))}
          </div>
          <span className="footer__signal-label">SIGNAL CLEAR</span>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bar" aria-hidden="true">
        <span className="footer__bar-text">
          ▶ ASTRA STUDIO &nbsp;/&nbsp; SURAT-IN &nbsp;/&nbsp; EARTH-SECTOR-1 &nbsp;/&nbsp;
          {year} &nbsp;/&nbsp; v0.1.0
        </span>
      </div>
    </footer>
  );
}
