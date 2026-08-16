import { useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { personal } from '../data/portfolio';
import styles from './Contact.module.css';

const socialLinks = [
  {
    id: 'email',
    label: 'EMAIL',
    value: personal.email,
    href: `mailto:${personal.email}`,
    icon: '✉',
    available: true,
  },
  {
    id: 'github',
    label: 'GITHUB',
    value: personal.social.github.handle,
    href: personal.social.github.url,
    icon: '⌥',
    available: false,
  },
  {
    id: 'linkedin',
    label: 'LINKEDIN',
    value: personal.social.linkedin.handle,
    href: personal.social.linkedin.url,
    icon: '◈',
    available: false,
  },
  {
    id: 'instagram',
    label: 'INSTAGRAM',
    value: personal.social.instagram.handle,
    href: personal.social.instagram.url,
    icon: '◎',
    available: false,
  },
];

function TransmissionEffect() {
  return (
    <div className={styles.transmission} aria-hidden="true">
      <div className={styles.txRing} style={{ animationDelay: '0s' }} />
      <div className={styles.txRing} style={{ animationDelay: '0.6s' }} />
      <div className={styles.txRing} style={{ animationDelay: '1.2s' }} />
      <div className={styles.txCenter}>
        <span>✦</span>
      </div>
    </div>
  );
}

export default function Contact() {
  const [ref, visible] = useIntersectionObserver();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback — just open mailto
    }
  };

  return (
    <section id="contact" className={styles.contactSection} ref={ref}>
      <div className="section">
        <div className={`section-label reveal ${visible ? 'visible' : ''}`}>
          OPEN CHANNEL
        </div>
        <h2 className={`section-title reveal ${visible ? 'visible' : ''} reveal-delay-1`}>
          MAKE CONTACT
        </h2>

        <div className={styles.contactGrid}>
          {/* Left: message */}
          <div className={styles.messageCol}>
            <div className={`${styles.messagePanel} reveal ${visible ? 'visible' : ''} reveal-delay-2`}>
              <div className={styles.panelHeader}>
                <span className={styles.panelDot} />
                <span className={styles.panelDot} style={{ background: 'var(--amber-bright)' }} />
                <span className={styles.panelDot} style={{ background: 'var(--green-pixel)' }} />
                <span className={styles.panelTitle}>incoming_transmission.txt</span>
              </div>
              <div className={styles.panelBody}>
                <TransmissionEffect />
                <h3 className={styles.contactHeadline}>Got something interesting?</h3>
                <p className={styles.contactText}>
                  I'm not hard to reach. Not particularly hard to ignore either, but let's go with the first option.
                  Drop an email — I actually check it.
                </p>
                <p className={styles.contactText}>
                  If you're working on something weird, want to talk shop, or just want to say hi from the internet:
                  the channel is open.
                </p>
                <div className={styles.emailBlock}>
                  <a href={`mailto:${personal.email}`} className={styles.emailLink}>
                    {personal.email}
                  </a>
                  <button
                    className={styles.copyBtn}
                    onClick={copyEmail}
                    aria-label="Copy email address"
                  >
                    {copied ? '✓ COPIED' : 'COPY'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: social links */}
          <div className={styles.linksCol}>
            <div className={`${styles.linksPanel} reveal ${visible ? 'visible' : ''} reveal-delay-3`}>
              <div className={styles.linksPanelTitle}>SIGNAL SOURCES</div>
              <div className={styles.linksList}>
                {socialLinks.map((link, i) => (
                  <div
                    key={link.id}
                    className={`${styles.linkRow} ${!link.available ? styles.linkRowUnavailable : ''}`}
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className={styles.linkLeft}>
                      <span className={styles.linkIcon} aria-hidden="true">{link.icon}</span>
                      <div className={styles.linkInfo}>
                        <span className={styles.linkLabel}>{link.label}</span>
                        <span className={styles.linkValue}>{link.value}</span>
                      </div>
                    </div>
                    <div className={styles.linkRight}>
                      {link.available ? (
                        <a
                          href={link.href}
                          className={`btn-pixel ${styles.linkBtn}`}
                          target={link.id !== 'email' ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          aria-label={`${link.label}: ${link.value}`}
                        >
                          ↗
                        </a>
                      ) : (
                        <span className={styles.linkSoon}>SOON</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className={`${styles.locationCard} reveal ${visible ? 'visible' : ''} reveal-delay-4`}>
              <span className={styles.locationIcon} aria-hidden="true">◉</span>
              <div>
                <div className={styles.locationLabel}>CURRENTLY ORBITING</div>
                <div className={styles.locationValue}>{personal.location}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
