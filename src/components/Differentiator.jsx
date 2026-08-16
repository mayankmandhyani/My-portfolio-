import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import styles from './Differentiator.module.css';

const traits = [
  {
    id: 'builds',
    icon: '⚒',
    title: 'Learns by Building',
    desc: 'Not waiting to feel "ready." Things get made, broken, fixed, and occasionally shown to people.',
  },
  {
    id: 'both-sides',
    icon: '◈',
    title: 'Both Sides of the Screen',
    desc: 'Interested in how things are built AND how people find them. Tech meets marketing.',
  },
  {
    id: 'honest',
    icon: '◉',
    title: 'Honest About the Skill Level',
    desc: 'No inflated titles. No fake expertise. Early-stage and saying so.',
  },
  {
    id: 'internet-native',
    icon: '⌘',
    title: 'Actually Online',
    desc: 'Understands how the internet actually works — memes, algorithms, vibes and all.',
  },
];

export default function Differentiator() {
  const [ref, visible] = useIntersectionObserver();

  return (
    <section className={styles.diffSection} ref={ref} aria-label="What makes Mayank different">
      <div className="section">
        <div className={`section-label reveal ${visible ? 'visible' : ''}`}>
          SIGNAL ANALYSIS
        </div>
        <h2 className={`section-title reveal ${visible ? 'visible' : ''} reveal-delay-1`}>
          WHAT'S DIFFERENT
        </h2>

        <div className={styles.grid}>
          {traits.map((trait, i) => (
            <div
              key={trait.id}
              className={`${styles.trait} reveal ${visible ? 'visible' : ''}`}
              style={{ transitionDelay: `${(i + 1) * 0.1}s` }}
            >
              <div className={styles.traitIcon} aria-hidden="true">{trait.icon}</div>
              <div className={styles.traitContent}>
                <h3 className={styles.traitTitle}>{trait.title}</h3>
                <p className={styles.traitDesc}>{trait.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
