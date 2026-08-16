import { useEffect, useState } from 'react';
import { useKonamiCode } from '../hooks/useKonamiCode';
import styles from './EasterEgg.module.css';

export default function EasterEgg() {
  const konami = useKonamiCode();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (konami) {
      setMessage('creeper... aw man.');
      setShow(true);
      const t = setTimeout(() => setShow(false), 3500);
      return () => clearTimeout(t);
    }
  }, [konami]);

  if (!show) return null;

  return (
    <div className={styles.overlay} role="alert" aria-live="polite">
      <div className={styles.box}>
        <div className={styles.header}>
          <span className={styles.dot} />
          <span className={styles.dot} style={{ background: 'var(--amber-bright)' }} />
          <span className={styles.dot} style={{ background: 'var(--green-pixel)' }} />
          <span className={styles.title}>easter_egg.exe</span>
        </div>
        <div className={styles.body}>
          <div className={styles.creeperArt} aria-hidden="true">
            <span>▀▀▀▀▀▀</span>
            <span>█░░░░█</span>
            <span>█████</span>
            <span>░█░█░</span>
            <span>░███░</span>
          </div>
          <p className={styles.message}>{message}</p>
          <p className={styles.sub}>konami code detected. nice try.</p>
        </div>
      </div>
    </div>
  );
}
