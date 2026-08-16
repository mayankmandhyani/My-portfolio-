import { useState } from 'react';
import { personal } from '../data/portfolio';
import './Contact.css';

const socialLinks = [
  {
    id: 'github',
    label: 'GitHub',
    icon: '{ }',
    color: 'var(--clr-pixel-white)',
    url: null,
    placeholder: '[ LINK COMING SOON ]',
    desc: 'Source code & experiments',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: 'in',
    color: '#0a7cc2',
    url: null,
    placeholder: '[ LINK COMING SOON ]',
    desc: 'Professional-ish presence',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    icon: '◈',
    color: '#e1306c',
    url: null,
    placeholder: '[ LINK COMING SOON ]',
    desc: 'Visual chaos, curated',
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personal.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="contact" className="section contact" aria-label="Contact">
      <span className="section-label">Open Channel</span>
      <h2 className="contact__heading">CONTACT</h2>

      <p className="contact__intro">
        Transmission available. Response rate: depends on how interesting the message is.
        Spam, cold pitches, and LinkedIn "networking" requests go to the void.
      </p>

      <div className="contact__grid">
        {/* Email block */}
        <div className="contact__email-block">
          <div className="contact__email-label">
            <span className="contact-key">{'>'} PRIMARY CHANNEL</span>
          </div>
          <div className="contact__email-row">
            <a
              href={`mailto:${personal.email}`}
              className="contact__email-link"
              aria-label={`Send email to ${personal.email}`}
            >
              {personal.email}
            </a>
            <button
              className="btn-pixel contact__copy-btn"
              onClick={copyEmail}
              aria-label="Copy email address"
            >
              {copied ? 'COPIED!' : 'COPY'}
            </button>
          </div>

          <div className="contact__transmission">
            <div className="transmission-header">
              <span className="t-dot t-dot--on" aria-hidden="true" />
              <span className="transmission-label">ASTRA COMMS // ACTIVE</span>
            </div>
            <div className="transmission-bars" aria-hidden="true">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="t-bar"
                  style={{
                    height: `${20 + Math.sin(i * 1.5) * 16}px`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Social links */}
        <div className="contact__socials">
          <div className="contact-key contact-socials-header">{'>'} OTHER CHANNELS</div>
          {socialLinks.map(social => (
            <div key={social.id} className="contact__social-row">
              <div className="social-icon" style={{ color: social.color }} aria-hidden="true">
                {social.icon}
              </div>
              <div className="social-info">
                <div className="social-label">{social.label}</div>
                <div className="social-desc">{social.desc}</div>
              </div>
              {social.url ? (
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pixel social-btn"
                  aria-label={`Visit ${social.label}`}
                >
                  Open
                </a>
              ) : (
                <span className="social-placeholder">{social.placeholder}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Easter egg: Konami-ish hidden message */}
      <div className="contact__easter" aria-hidden="true" title="👾 you found the easter egg. congrats. there's no prize.">
        {/* ↑↑↓↓←→←→BA = "nice portfolio" */}
      </div>
    </section>
  );
}
