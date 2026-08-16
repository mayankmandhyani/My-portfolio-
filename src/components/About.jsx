import { useRef, useEffect, useState } from 'react';
import { personal } from '../data/portfolio';
import './About.css';

function useInView(ref, threshold = 0.2) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

const traits = [
  { icon: '🛸', label: 'Space Enjoyer', desc: 'Has strong opinions about whether Pluto counts.' },
  { icon: '🎮', label: 'Minecraft Resident', desc: 'Builds things that collapse. Learns. Rebuilds.' },
  { icon: '🚗', label: 'Hot Wheels Archivist', desc: 'Curating a collection since before it was ironic.' },
  { icon: '⚡', label: 'Vibe Coder', desc: "Code works. Why? Unclear. Shipping anyway." },
  { icon: '🦸', label: 'Avengers Fan', desc: 'The multiverse is complicated. So is CSS.' },
  { icon: '📈', label: 'Digital Marketer', desc: 'Learning how to make the internet notice things.' },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref);

  return (
    <section id="about" className={`section about${inView ? ' in-view' : ''}`} ref={ref} aria-label="About Mayank">

      <div className="about__header">
        <span className="section-label">System Profile</span>
        <h2 className="about__heading">WHO IS THIS GUY</h2>
        <div className="about__heading-line" aria-hidden="true" />
      </div>

      <div className="about__grid">
        {/* Profile image slot */}
        <div className="about__profile-slot" aria-label="Profile image — coming soon">
          <div className="profile-frame">
            <div className="profile-scanline" aria-hidden="true" />
            <div className="profile-content">
              <div className="profile-placeholder-icon">◉</div>
              <div className="profile-label">PROFILE.JPG</div>
              <div className="profile-sublabel">[ TRANSMISSION PENDING ]</div>
            </div>
            <div className="profile-corner profile-corner--tl" aria-hidden="true" />
            <div className="profile-corner profile-corner--tr" aria-hidden="true" />
            <div className="profile-corner profile-corner--bl" aria-hidden="true" />
            <div className="profile-corner profile-corner--br" aria-hidden="true" />
          </div>

          <div className="about__stats">
            <div className="stat-row">
              <span className="stat-key">CLASS 10</span>
              <span className="stat-val">80%</span>
            </div>
            <div className="stat-row">
              <span className="stat-key">CLASS 12</span>
              <span className="stat-val stat-val--highlight">90%</span>
            </div>
            <div className="stat-row">
              <span className="stat-key">LOCATION</span>
              <span className="stat-val">Surat, GJ</span>
            </div>
            <div className="stat-row">
              <span className="stat-key">STATUS</span>
              <span className="stat-val stat-val--green">ONLINE</span>
            </div>
          </div>
        </div>

        {/* Bio text */}
        <div className="about__bio">
          <div className="about__bio-lines">
            {personal.bio.map((line, i) => (
              <p key={i} className="about__bio-line" style={{ animationDelay: `${i * 0.1}s` }}>
                {line}
              </p>
            ))}
          </div>

          <div className="about__divider">
            <span className="divider-text">{'// traits.log'}</span>
          </div>

          <div className="about__traits">
            {traits.map((t, i) => (
              <div key={i} className="trait-card" tabIndex={0} aria-label={`${t.label}: ${t.desc}`}>
                <span className="trait-icon">{t.icon}</span>
                <div>
                  <div className="trait-label">{t.label}</div>
                  <div className="trait-desc">{t.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="about__manifesto">
            <div className="manifesto-header">{'> readme.md'}</div>
            <p className="manifesto-text">
              I'm at the start. That's the honest version. Class 12 done, internet partially figured out,
              rest of it — work in progress. I like building things more than talking about building things,
              which is why this portfolio exists instead of a LinkedIn post.
            </p>
            <p className="manifesto-text">
              Not every project is finished. Not every idea works. That's fine.
              The interesting part is what you figure out along the way.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
