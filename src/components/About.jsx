import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { about } from '../data/portfolio';
import styles from './About.module.css';

function ProfileSlot() {
  return (
    <div className={styles.profileSlot} aria-label="Profile image — coming soon">
      <div className={styles.profileFrame}>
        <div className={styles.profileCorner} data-pos="tl" />
        <div className={styles.profileCorner} data-pos="tr" />
        <div className={styles.profileCorner} data-pos="bl" />
        <div className={styles.profileCorner} data-pos="br" />
        <div className={styles.profileInner}>
          <div className={styles.profilePixelAvatar} aria-hidden="true">
            {/* Simple pixel person */}
            <div className={styles.avatarHead} />
            <div className={styles.avatarBody} />
            <div className={styles.avatarLegs} />
          </div>
          <div className={styles.profileLabel}>
            <span className={styles.terminalPrefix}>&gt;</span>
            PROFILE_IMG
            <span className={styles.profileStatus}>NOT YET TRANSMITTED</span>
          </div>
        </div>
      </div>
      <div className={styles.profileCaption}>
        [ Insert human here ]
      </div>
    </div>
  );
}

export default function About() {
  const [ref, visible] = useIntersectionObserver();

  return (
    <section id="about" className={styles.aboutSection} ref={ref}>
      <div className="section">
        {/* Section label */}
        <div className={`section-label reveal ${visible ? 'visible' : ''}`}>
          ABOUT
        </div>

        <div className={styles.grid}>
          {/* Profile image slot */}
          <div className={`${styles.profileCol} reveal ${visible ? 'visible' : ''}`}>
            <ProfileSlot />
          </div>

          {/* Text content */}
          <div className={styles.textCol}>
            <h2 className={`${styles.headline} reveal ${visible ? 'visible' : ''} reveal-delay-1`}>
              {about.headline}
            </h2>

            <div className={styles.paragraphs}>
              {about.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={`${styles.para} reveal ${visible ? 'visible' : ''}`}
                  style={{ transitionDelay: `${(i + 1) * 0.1}s` }}
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Fun fact */}
            <div className={`${styles.funFact} reveal ${visible ? 'visible' : ''} reveal-delay-4`}>
              <div className={styles.funFactHeader}>
                <span className={styles.funFactDot} />
                SYSTEM NOTE
              </div>
              <p>"{about.funFact}"</p>
            </div>

            {/* Personality tags */}
            <div className={`${styles.tags} reveal ${visible ? 'visible' : ''} reveal-delay-4`}>
              {['CURIOUS', 'EXPERIMENTAL', 'SOCIALLY SELECTIVE', 'SARCASTIC', 'SPACE-BRAINED'].map(tag => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
