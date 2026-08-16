import { useEffect, useState } from 'react';
import styles from './Loader.module.css';

const BOOT_LINES = [
  { text: 'ASTRA SYSTEM v1.0', delay: 0, color: 'cyan' },
  { text: 'INITIALIZING...', delay: 300, color: 'dim' },
  { text: 'LOADING PORTFOLIO DATA...', delay: 700, color: 'dim' },
  { text: 'SCANNING SOLAR SYSTEM...', delay: 1100, color: 'dim' },
  { text: 'NO THREATS DETECTED.', delay: 1400, color: 'green' },
  { text: 'READY.', delay: 1700, color: 'cyan' },
];

export default function Loader({ onDone }) {
  const [lines, setLines] = useState([]);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    BOOT_LINES.forEach(({ text, delay, color }) => {
      setTimeout(() => {
        setLines(prev => [...prev, { text, color }]);
      }, delay);
    });

    setTimeout(() => {
      setExiting(true);
      setTimeout(onDone, 500);
    }, 2200);
  }, [onDone]);

  return (
    <div className={`${styles.loader} ${exiting ? styles.exiting : ''}`} aria-live="polite" role="status">
      <div className={styles.screen}>
        <div className={styles.brand}>
          <span className={styles.brandStar}>★</span>
          ASTRA
        </div>
        <div className={styles.bootLines}>
          {lines.map((line, i) => (
            <div key={i} className={`${styles.line} ${styles[`line_${line.color}`]}`}>
              {line.color !== 'cyan' && <span className={styles.prompt}>&gt; </span>}
              {line.text}
            </div>
          ))}
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${(lines.length / BOOT_LINES.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
