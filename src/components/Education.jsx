import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { education, achievements } from '../data/portfolio';
import styles from './Education.module.css';

function EduRecord({ record, index, visible }) {
  return (
    <div
      className={`${styles.record} ${record.highlight ? styles.recordHighlight : ''} reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${(index + 1) * 0.15}s` }}
    >
      <div className={styles.recordLeft}>
        <div className={styles.recordIndex}>
          {String(index + 1).padStart(2, '0')}
        </div>
        <div className={styles.recordLine} />
      </div>
      <div className={styles.recordContent}>
        <div className={styles.recordHeader}>
          <span className={styles.recordLevel}>{record.level}</span>
          <span className={`${styles.recordStatus} ${record.highlight ? styles.statusHighlight : ''}`}>
            {record.status}
          </span>
        </div>
        <div className={styles.recordInstitution}>{record.institution}</div>
        <div className={styles.recordResult}>
          <span className={styles.resultLabel}>RESULT</span>
          <span className={`${styles.resultValue} ${record.highlight ? styles.resultHighlight : ''}`}>
            {record.result}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Education() {
  const [ref, visible] = useIntersectionObserver();

  return (
    <section id="education" className={styles.eduSection} ref={ref}>
      <div className="section">
        <div className={`section-label reveal ${visible ? 'visible' : ''}`}>
          ACADEMIC ARCHIVE
        </div>
        <h2 className={`section-title reveal ${visible ? 'visible' : ''} reveal-delay-1`}>
          EDUCATION LOG
        </h2>

        {/* Terminal header */}
        <div className={`${styles.terminalHeader} reveal ${visible ? 'visible' : ''} reveal-delay-2`}>
          <div className={styles.thBar}>
            <span className={styles.thDot} style={{ background: 'var(--red-pixel)' }} />
            <span className={styles.thDot} style={{ background: 'var(--amber-bright)' }} />
            <span className={styles.thDot} style={{ background: 'var(--green-pixel)' }} />
            <span className={styles.thTitle}>edu_archive.sys</span>
          </div>
          <div className={styles.thBody}>
            <div className={styles.thLine}>
              <span className={styles.thPrompt}>&gt;</span>
              <span>QUERYING ACADEMIC RECORDS...</span>
            </div>
            <div className={styles.thLine}>
              <span className={styles.thPrompt}>&gt;</span>
              <span className={styles.thGreen}>2 RECORDS FOUND</span>
            </div>
          </div>
        </div>

        <div className={styles.records}>
          {education.map((record, i) => (
            <EduRecord key={record.id} record={record} index={i} visible={visible} />
          ))}
        </div>

        {/* Achievements */}
        <div className={`${styles.achievementsBlock} reveal ${visible ? 'visible' : ''} reveal-delay-4`}>
          <div className={styles.achHeader}>
            <span className={styles.achIcon}>🏆</span>
            <span className={styles.achTitle}>ACHIEVEMENTS</span>
          </div>
          <div className={styles.achBody}>
            <div className={styles.achMessage}>{achievements.message}</div>
            <div className={styles.loadingBar}>
              <div className={styles.loadingFill} />
            </div>
            <p className={styles.achSubtext}>{achievements.subtext}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
