import { useEffect, useRef } from 'react';
import { personal } from '../data/portfolioData';
import './About.css';

// Retro pixel profile placeholder
function ProfileSlot() {
  return (
    <div className="profile-slot" aria-label="Profile photo — coming soon">
      <div className="profile-slot__frame">
        <div className="profile-slot__screen">
          <div className="profile-slot__scanline" aria-hidden="true" />
          <div className="profile-slot__content">
            <div className="profile-slot__icon" aria-hidden="true">👤</div>
            <p className="profile-slot__label">PROFILE_IMG.EXE</p>
            <p className="profile-slot__sub">[ NOT FOUND ]</p>
            <p className="profile-slot__hint">Arriving soon.<br />Probably.</p>
          </div>
        </div>
        <div className="profile-slot__corner profile-slot__corner--tl" aria-hidden="true" />
        <div className="profile-slot__corner profile-slot__corner--tr" aria-hidden="true" />
        <div className="profile-slot__corner profile-slot__corner--bl" aria-hidden="true" />
        <div className="profile-slot__corner profile-slot__corner--br" aria-hidden="true" />
      </div>
      <p className="profile-slot__caption">
        UNIT: <span>MADHYANI, M.</span><br />
        STATUS: <span style={{color:'var(--green)'}}>ONLINE</span>
      </p>
    </div>
  );
}

// Minecraft easter egg hidden as "coordinates"
function EasterEgg() {
  return (
    <div className="about__easter" title="CREEPER? AW MAN." aria-label="Easter egg">
      <span aria-hidden="true">🧱</span>
      <span className="about__easter-text">coords: x=21 y=12 z=90</span>
    </div>
  );
}

export default function About() {
  const paraRef = useRef(null);

  useEffect(() => {
    if (!paraRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('about__bio--visible'); },
      { threshold: 0.15 }
    );
    observer.observe(paraRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" aria-labelledby="about-heading">
      <div className="section-wrap about__grid">
        {/* Left: profile */}
        <div className="about__profile">
          <ProfileSlot />
          <EasterEgg />
        </div>

        {/* Right: text */}
        <div className="about__text">
          <p className="section-label">About</p>
          <h2 id="about-heading" className="section-title">
            Who&apos;s transmitting?
          </h2>

          <div ref={paraRef} className="about__bio">
            <p>
              Recently wrapped up Class 12 with a 90%. Before that, Class 10 with an 80%.
              Both at <strong>Scholar English Academy</strong>, Surat.
            </p>
            <p>
              Right now I&apos;m at the part of the story where the protagonist doesn&apos;t
              have a plan yet, but has definitely started doing things. Those things include:
              building websites, learning digital marketing, running social media for
              a real business, and occasionally staring at my Hot Wheels collection while
              thinking about CSS.
            </p>
            <p>
              I call myself a <em>vibe coder</em> — which means I learn by building
              something until it breaks, figure out why it broke, and then build something
              slightly less broken. It&apos;s working. Mostly.
            </p>
            <p>
              Located in Surat, Gujarat, India. Interested in space, the internet,
              how things work, and why most portfolio websites look the same.
              (Hence this one.)
            </p>
          </div>

          <div className="about__stats">
            <div className="about__stat">
              <span className="about__stat-val">Class 10</span>
              <span className="about__stat-label">80%</span>
            </div>
            <div className="about__stat">
              <span className="about__stat-val">Class 12</span>
              <span className="about__stat-label">90%</span>
            </div>
            <div className="about__stat">
              <span className="about__stat-val">Status</span>
              <span className="about__stat-label" style={{color:'var(--green)'}}>Building</span>
            </div>
          </div>

          <div className="about__location">
            <span aria-hidden="true">📡</span>
            <span>Signal origin: {personal.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
