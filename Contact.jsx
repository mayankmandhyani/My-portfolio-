import { useState } from 'react';
import { personal } from './portfolioData';
import './Contact.css';

function SocialLink({ label, url }) {
  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="contact__social-link"
      >
        <span className="contact__social-label">{label}</span>
        <span className="contact__social-url">↗ Open</span>
      </a>
    );
  }
  return (
    <div className="contact__social-link contact__social-link--pending">
      <span className="contact__social-label">{label}</span>
      <span className="contact__social-placeholder">[ LINK COMING SOON ]</span>
    </div>
  );
}

// Hot Wheels easter egg — hidden collectibles shelf
function CollectiblesEgg() {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="collectibles" aria-label="Hidden collectibles section">
      <button
        className="collectibles__trigger"
        onClick={() => setRevealed(v => !v)}
        aria-expanded={revealed}
        aria-label="Reveal hidden collectibles"
      >
        <span aria-hidden="true">🔒</span>
        <span className="collectibles__trigger-text">CLASSIFIED INVENTORY</span>
      </button>
      {revealed && (
        <div className="collectibles__shelf" role="list" aria-label="Hot Wheels and Bburago collection">
          {['🚗', '🏎', '🚙', '🏁', '🚓', '🚕'].map((car, i) => (
            <div key={i} className="collectibles__item" role="listitem" aria-label={`Collectible car ${i + 1}`}>
              <span aria-hidden="true">{car}</span>
              <span className="collectibles__item-label">Unit {String(i + 1).padStart(3, '0')}</span>
            </div>
          ))}
          <p className="collectibles__caption">
            Hot Wheels + Bburago. Classified. Non-negotiable.
          </p>
        </div>
      )}
    </div>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personal.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="contact" aria-labelledby="contact-heading">
      <div className="section-wrap">
        <p className="section-label">Contact</p>
        <h2 id="contact-heading" className="section-title">Open a transmission</h2>

        <div className="contact__grid">
          {/* Left: direct contact */}
          <div className="contact__primary">
            <div className="contact__signal" aria-hidden="true">
              <div className="contact__signal-ring contact__signal-ring--1" />
              <div className="contact__signal-ring contact__signal-ring--2" />
              <div className="contact__signal-ring contact__signal-ring--3" />
              <span className="contact__signal-icon">📡</span>
            </div>

            <h3 className="contact__email-label">Direct channel</h3>
            <a
              href={`mailto:${personal.email}`}
              className="contact__email"
            >
              {personal.email}
            </a>
            <button
              className="btn-pixel contact__copy"
              onClick={copyEmail}
              aria-label="Copy email to clipboard"
            >
              {copied ? '✓ Copied' : '⎘ Copy'}
            </button>

            <p className="contact__note">
              I do read emails. Response time: unpredictable but nonzero.
            </p>
          </div>

          {/* Right: socials */}
          <div className="contact__socials">
            <h3 className="contact__socials-title">Other channels</h3>
            <div className="contact__socials-list">
              {Object.entries(personal.socials).map(([key, { label, url }]) => (
                <SocialLink key={key} label={label} url={url} />
              ))}
            </div>

            <CollectiblesEgg />
          </div>
        </div>

        {/* Location */}
        <div className="contact__location">
          <span aria-hidden="true">🌏</span>
          <span>Broadcasting from {personal.location}</span>
        </div>
      </div>
    </section>
  );
}
