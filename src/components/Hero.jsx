import { useEffect, useRef, useState } from 'react';
import { personal } from '../data/portfolioData';
import './Hero.css';

// Tiny pixel spaceship made from ASCII blocks
function PixelShip({ className }) {
  return (
    <div className={`pixel-ship ${className || ''}`} aria-hidden="true">
      <pre className="pixel-ship__art">{`  ▲
 ███
█████
 ███
▲   ▲`}</pre>
    </div>
  );
}

// Pixel planet
function Planet({ size = 60, color = 'var(--purple)', style, label }) {
  return (
    <div
      className="pixel-planet"
      style={{ '--p-size': `${size}px`, '--p-color': color, ...style }}
      aria-label={label}
      role="img"
    />
  );
}

function TypeWriter({ text, speed = 60 }) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    let i = 0;
    setDisplayed('');
    const id = setInterval(() => {
      setDisplayed(text.slice(0, ++i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return (
    <span>
      {displayed}
      {displayed.length < text.length && <span className="cursor" aria-hidden="true">_</span>}
    </span>
  );
}

export default function Hero() {
  const scrollRef = useRef(null);

  const scrollDown = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero" aria-label="Introduction">
      {/* Decorative planets */}
      <Planet size={90} color="var(--purple)" style={{ top: '15%', right: '8%', animationDelay: '0s' }} label="Decorative pixel planet" />
      <Planet size={40} color="var(--orange)" style={{ top: '60%', right: '18%', animationDelay: '-2s' }} label="" />
      <Planet size={25} color="var(--cyan)" style={{ top: '30%', left: '5%', animationDelay: '-4s' }} label="" />

      {/* Floating spaceship */}
      <PixelShip className="hero__ship" />

      {/* Main content */}
      <div className="hero__content section-wrap">
        <div className="hero__sys-line" aria-hidden="true">
          <span className="hero__sys-blink">●</span>
          ASTRA SYS &nbsp;/&nbsp; SIGNAL ACQUIRED &nbsp;/&nbsp; SECTOR: SURAT-IN
        </div>

        <h1 className="hero__name">
          <span className="hero__name-label" aria-hidden="true">PILOT:</span>
          <br />
          Mayank<br />Madhyani
        </h1>

        <div className="hero__brand">◈ ASTRA Studio</div>

        <p className="hero__tagline">
          <TypeWriter text={personal.tagline} speed={45} />
        </p>

        <p className="hero__sub">{personal.subTagline}</p>

        <div className="hero__actions">
          <button className="btn-pixel" onClick={scrollDown}>
            <span aria-hidden="true">↓</span> Explore
          </button>
          <a
            href={`mailto:${personal.email}`}
            className="btn-pixel btn-pixel--ghost"
          >
            <span aria-hidden="true">✉</span> Hail ASTRA
          </a>
        </div>

        {/* Coordinates easter egg */}
        <div className="hero__coords" aria-label="Location coordinates">
          <span>21.1702° N</span>
          <span className="hero__coords-sep">·</span>
          <span>72.8311° E</span>
          <span className="hero__coords-sep">·</span>
          <span>EARTH-1</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll-hint" aria-hidden="true" onClick={scrollDown}>
        <span className="hero__scroll-arr">▼</span>
        <span className="hero__scroll-text">SCROLL TO ENTER THE VOID</span>
      </div>

      {/* Pixel grid overlay at bottom */}
      <div className="hero__fade" aria-hidden="true" />
    </section>
  );
}
