import { useEffect, useRef, useState } from 'react';
import { personal } from '../data/portfolio';
import './Hero.css';

// Pixel spacecraft — rendered in CSS/SVG, no external assets
function PixelShip({ style }) {
  return (
    <div className="pixel-ship" style={style} aria-hidden="true">
      <div className="ship-body">
        {/* ASCII/pixel art spacecraft using divs */}
        <div className="ship-cockpit" />
        <div className="ship-hull" />
        <div className="ship-wing ship-wing--left" />
        <div className="ship-wing ship-wing--right" />
        <div className="ship-exhaust">
          <div className="exhaust-flame" />
          <div className="exhaust-flame exhaust-flame--2" />
          <div className="exhaust-flame exhaust-flame--3" />
        </div>
      </div>
    </div>
  );
}

function PixelPlanet({ size, color, ringColor, style }) {
  return (
    <div
      className="pixel-planet"
      style={{
        width: size, height: size,
        background: color,
        boxShadow: `inset -${size * 0.15}px -${size * 0.15}px 0 rgba(0,0,0,0.35), 0 0 ${size * 0.5}px ${color}30`,
        ...style,
      }}
      aria-hidden="true"
    >
      {ringColor && (
        <div
          className="planet-ring"
          style={{
            width: size * 2.2,
            height: size * 0.35,
            borderColor: ringColor,
            left: -(size * 0.6),
            top: size * 0.33,
          }}
        />
      )}
    </div>
  );
}

export default function Hero() {
  const [typed, setTyped] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [bootDone, setBootDone] = useState(false);
  const [shipPos, setShipPos] = useState({ x: -120, y: 0 });
  const bootLines = [
    'ASTRA SYSTEM v1.0',
    'SCANNING SECTOR 7G...',
    'SIGNAL DETECTED: MAYANK.MADHYANI',
    'PORTFOLIO LOADING...',
    'READY.',
  ];
  const bootRef = useRef([]);

  useEffect(() => {
    // Boot sequence
    let line = 0;
    let char = 0;
    let timeout;

    const type = () => {
      if (line >= bootLines.length) {
        setTimeout(() => setBootDone(true), 600);
        return;
      }
      const current = bootLines.slice(0, line).join('\n') + (line > 0 ? '\n' : '') + bootLines[line].slice(0, char);
      setTyped(current);
      char++;
      if (char > bootLines[line].length) {
        line++;
        char = 0;
        timeout = setTimeout(type, 180);
      } else {
        timeout = setTimeout(type, 28);
      }
    };
    type();

    return () => clearTimeout(timeout);
  }, []); // eslint-disable-line

  useEffect(() => {
    const id = setInterval(() => setShowCursor(c => !c), 530);
    return () => clearInterval(id);
  }, []);

  // Ship fly-in on boot done
  useEffect(() => {
    if (!bootDone) return;
    let start = null;
    const targetX = typeof window !== 'undefined' ? window.innerWidth * 0.55 : 400;
    const targetY = typeof window !== 'undefined' ? -window.innerHeight * 0.05 : 0;

    const anim = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / 1800, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setShipPos({
        x: -120 + (targetX + 120) * ease,
        y: targetY * ease,
      });
      if (progress < 1) requestAnimationFrame(anim);
    };
    requestAnimationFrame(anim);
  }, [bootDone]);

  return (
    <section id="hero" className="hero" aria-label="Hero — Introduction">
      {/* Background planets */}
      <PixelPlanet
        size={180}
        color="#1a0a3a"
        ringColor="#9b5de530"
        style={{ position: 'absolute', right: '8%', top: '12%' }}
      />
      <PixelPlanet
        size={70}
        color="#0a2010"
        style={{ position: 'absolute', left: '5%', top: '35%' }}
      />
      <PixelPlanet
        size={40}
        color="#1a0a18"
        style={{ position: 'absolute', right: '22%', bottom: '18%' }}
      />

      {/* Pixel Ship */}
      {bootDone && (
        <PixelShip
          style={{
            position: 'absolute',
            left: shipPos.x,
            top: `calc(50% + ${shipPos.y}px)`,
            transform: 'translateY(-50%)',
            transition: 'none',
            zIndex: 2,
          }}
        />
      )}

      {/* Boot terminal — shown before boot done */}
      {!bootDone && (
        <div className="hero__terminal" role="status" aria-live="polite">
          <div className="terminal-header">
            <span className="terminal-dot" />
            <span className="terminal-dot" style={{ background: 'var(--clr-orange)' }} />
            <span className="terminal-dot" style={{ background: 'var(--clr-green)' }} />
            <span className="terminal-title">astra_boot.sh</span>
          </div>
          <pre className="terminal-body">
            {typed}{showCursor ? '█' : ' '}
          </pre>
        </div>
      )}

      {/* Main hero content */}
      {bootDone && (
        <div className="hero__content">
          <div className="hero__label">
            <span className="section-label">TRANSMISSION RECEIVED</span>
          </div>

          <div className="hero__brand">
            <span className="hero__brand-text">ASTRA</span>
            <span className="hero__brand-studio"> STUDIO</span>
          </div>

          <h1 className="hero__name">
            <span className="name-glitch" data-text="Mayank Madhyani">Mayank Madhyani</span>
          </h1>

          <div className="hero__roles">
            <span className="role-tag">Student</span>
            <span className="role-sep">·</span>
            <span className="role-tag">Vibe Coder</span>
            <span className="role-sep">·</span>
            <span className="role-tag">Digital Marketer</span>
            <span className="role-sep">·</span>
            <span className="role-tag">Builder</span>
          </div>

          <p className="hero__tagline">"{personal.tagline}"</p>

          <div className="hero__location">
            <span className="hero__location-icon">◈</span>
            <span>Surat, Gujarat, India</span>
            <span className="hero__coords"> // 21.1702° N, 72.8311° E</span>
          </div>

          <div className="hero__cta">
            <a href="#projects" className="btn-pixel">View Projects</a>
            <a href="#contact" className="btn-pixel btn-pixel--ghost">Contact</a>
          </div>

          <div className="hero__scroll-hint" aria-hidden="true">
            <span>SCROLL TO EXPLORE</span>
            <span className="scroll-arrow">▼</span>
          </div>
        </div>
      )}

      {/* Hidden easter egg */}
      {/* // "with great power comes great electricity bill" */}
    </section>
  );
}
