import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { skills } from '../data/portfolio';
import styles from './Skills.module.css';

const levelConfig = {
  learning: { color: 'cyan', bars: 2, total: 5 },
  exploring: { color: 'purple', bars: 3, total: 5 },
  comfortable: { color: 'green', bars: 4, total: 5 },
  building: { color: 'amber', bars: 3, total: 5 },
};

function SkillCard({ skill, index, visible }) {
  const lvl = levelConfig[skill.levelClass] || { color: 'cyan', bars: 2, total: 5 };

  return (
    <div
      className={`${styles.card} ${styles[`card_${lvl.color}`]} reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className={styles.cardHeader}>
        <span className={styles.cardIcon} aria-hidden="true">{skill.icon}</span>
        <div className={styles.cardTitle}>
          <h3 className={styles.cardName}>{skill.label}</h3>
          <span className={`${styles.cardLevel} ${styles[`level_${lvl.color}`]}`}>
            {skill.level}
          </span>
        </div>
      </div>

      {/* Pixel power bar */}
      <div className={styles.powerBar} aria-label={`Skill level: ${skill.level}`}>
        {Array.from({ length: lvl.total }, (_, i) => (
          <div
            key={i}
            className={`${styles.powerSegment} ${i < lvl.bars ? styles[`seg_${lvl.color}`] : styles.segEmpty}`}
          />
        ))}
      </div>

      <p className={styles.cardDesc}>{skill.description}</p>

      <div className={styles.cardTags}>
        {skill.tags.map(tag => (
          <span key={tag} className={styles.cardTag}>{tag}</span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const [ref, visible] = useIntersectionObserver();

  return (
    <section id="skills" className={styles.skillsSection} ref={ref}>
      <div className="section">
        <div className={`section-label reveal ${visible ? 'visible' : ''}`}>
          SKILL REGISTRY
        </div>
        <h2 className={`section-title reveal ${visible ? 'visible' : ''} reveal-delay-1`}>
          CURRENT LOADOUT
        </h2>

        <p className={`${styles.intro} reveal ${visible ? 'visible' : ''} reveal-delay-2`}>
          Honest skill levels. No "97% JavaScript" bars. These are things I'm actually working with.
        </p>

        <div className={styles.grid}>
          {skills.map((skill, i) => (
            <SkillCard key={skill.id} skill={skill} index={i} visible={visible} />
          ))}
        </div>

        {/* Terminal note */}
        <div className={`${styles.terminalNote} reveal ${visible ? 'visible' : ''} reveal-delay-4`}>
          <span className={styles.tnPrompt}>&gt;</span>
          <span className={styles.tnText}>
            more skills being acquired. stack subject to change. no guarantees.
          </span>
          <span className={styles.tnCursor} />
        </div>
      </div>
    </section>
  );
}
