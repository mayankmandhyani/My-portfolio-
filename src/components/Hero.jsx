import { useEffect, useRef, useState } from 'react';
import { personal } from '../data/portfolio';
import styles from './Hero.module.css';

// Pixel art spacecraft drawn with CSS
function PixelShip() {
  return (
    <div className={styles.shipWrapper} aria-hidden="true">
      <div className={styles.ship}>
        {/* Body */}
        <div className={styles.shipRow}>
          <span /><span /><span className={styles.b} /><span /><span />
        </div>
        <div className={styles.shipRow}>
          <span /><span className={styles.b} /><span className={styles.bw} /><span className={styles.b} /><span />
        </div>
        <div className={styles.shipRow}>
          <span className={styles.b} /><span className={styles.bw} /><span className={styles.bc} /><span className={styles.bw} /><span className={styles.b} />
        </div>
        <div className={styles.shipRow}>
          <span className={styles.b} /><span className={styles.b} /><span className={styles.b} /><span className={styles.b} /><span className={styles.b} />
        </div>
        <div className={styles.shipRow}>
          <span /><span className={styles.ba} /><span /><span className={styles.ba} /><span />
        </div>
      </div>
      <div className={styles.thruster} aria-hidden="true" />
    </div>
  );
}

function TypeWriter({ text, speed = 60, delay = 0 }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;
    const t = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [displayed, started, text, speed]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && <span className={styles.cursor}>▮</span>}
    </span>
  );
}

// Floating pixel planets
function Planet({ x, y, size, color, delay }) {
  return (
    <div
      className={styles.planet}
      aria-hidden="true"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        background: color,
        animationDelay: `${delay}s`,
      }}
    />
  );
}

export default function Hero() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="hero" className={styles.hero} aria-label="Hero">
      {/* Background decorative elements */}
      <div className={styles.bgLayer} aria-hidden="true">
        <Planet x={8} y={15} size={48} color="linear-gradient(135deg, #1a2050, #0d0d2b)" delay={0} />
        <Planet x={85} y={25} size={72} color="linear-gradient(135deg, #2a1050, #150830)" delay={1.2} />
        <Planet x={75} y={70} size={32} color="linear-gradient(135deg, #003344, #001a22)" delay={0.6} />
        <Planet x={15} y={72} size={24} color="linear-gradient(135deg, #442200, #221100)" delay={1.8} />

        {/* Grid lines */}
        <div className={styles.horizonGrid} />
      </div>

      <div className={styles.content}>
        {/* System status */}
        <div className={`${styles.systemStatus} ${ready ? styles.systemStatusVisible : ''}`}>
          <span className={styles.statusDot} />
          <span>ASTRA SYSTEM ONLINE</span>
          <span className={styles.statusSep}>·</span>
          <span>SURAT, INDIA</span>
          <span className={styles.statusSep}>·</span>
          <span>2025</span>
        </div>

        {/* Main identity block */}
        <div className={`${styles.identityBlock} ${ready ? styles.identityVisible : ''}`}>
          <div className={styles.brandLabel}>
            <TypeWriter text="ASTRA STUDIO" speed={80} delay={400} />
          </div>

          <h1 className={styles.name}>
            {ready && <TypeWriter text="MAYANK MADHYANI" speed={55} delay={1200} />}
          </h1>

          <div className={styles.rolesRow}>
            {['VIBE CODER', 'DIGITAL MARKETER', 'BUILDER'].map((role, i) => (
              <span key={role} className={styles.roleTag} style={{ animationDelay: `${2000 + i * 150}ms` }}>
                {role}
              </span>
            ))}
          </div>

          <p className={styles.tagline}>
            {ready && <TypeWriter text={personal.tagline} speed={30} delay={2600} />}
          </p>
        </div>

        {/* Pixel ship */}
        <div className={`${styles.shipContainer} ${ready ? styles.shipVisible : ''}`}>
          <PixelShip />
        </div>

        {/* Scroll hint */}
        <div className={`${styles.scrollHint} ${ready ? styles.scrollHintVisible : ''}`}>
          <div className={styles.scrollArrow} aria-hidden="true">▼</div>
          <span>SCROLL TO EXPLORE</span>
        </div>

        {/* Coordinates */}
        <div className={styles.coords} aria-hidden="true">
          <span>23.0225° N</span>
          <span>72.5714° E</span>
        </div>
      </div>
    </section>
  );
}
