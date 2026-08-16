import { useRef, useState } from 'react';
import { skills } from '../data/portfolio';
import './Skills.css';

const levelConfig = {
  LEARNING:   { color: '#ff9900', bar: 25,  label: 'LEARNING' },
  EXPLORING:  { color: '#9b5de5', bar: 45,  label: 'EXPLORING' },
  COMFORTABLE:{ color: '#39ff78', bar: 68,  label: 'COMFORTABLE' },
  BUILDING:   { color: '#00ffe0', bar: 80,  label: 'BUILDING' },
};

function SkillCard({ skill }) {
  const cfg = levelConfig[skill.level];
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`skill-card${hovered ? ' hovered' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      tabIndex={0}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      role="article"
      aria-label={`${skill.label}: ${skill.level}`}
    >
      <div className="skill-card__icon">{skill.icon}</div>

      <div className="skill-card__content">
        <div className="skill-card__header">
          <div>
            <div className="skill-card__name">{skill.label}</div>
            <div className="skill-card__sub">{skill.sublabel}</div>
          </div>
          <span className="status-badge" style={{ color: cfg.color, borderColor: cfg.color }}>
            {cfg.label}
          </span>
        </div>

        {/* Pixel progress bar */}
        <div className="skill-bar" aria-label={`${cfg.bar}% proficiency`}>
          <div className="skill-bar__track">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="skill-bar__block"
                style={{
                  background: i < Math.round(cfg.bar / 5) ? cfg.color : 'transparent',
                  borderColor: cfg.color,
                  opacity: i < Math.round(cfg.bar / 5) ? 1 : 0.2,
                  transitionDelay: `${i * 40}ms`,
                }}
              />
            ))}
          </div>
          <span className="skill-bar__label" style={{ color: cfg.color }}>{cfg.bar}%</span>
        </div>

        <p className="skill-card__desc">{skill.description}</p>
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);

  return (
    <section id="skills" className="section skills" ref={ref} aria-label="Skills">
      <div className="skills__bg-grid" aria-hidden="true" />

      <span className="section-label">Capabilities Matrix</span>
      <h2 className="skills__heading">WHAT I CAN DO<span className="skills__heading-blink">_</span></h2>

      <p className="skills__disclaimer">
        {'// '} Honest assessment. No "99% JavaScript" bars.
        These represent actual current levels, not aspiration.
      </p>

      <div className="skills__grid">
        {skills.map(skill => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>

      <div className="skills__footer">
        <div className="skills__level-legend">
          {Object.entries(levelConfig).map(([key, val]) => (
            <div key={key} className="legend-item">
              <span className="legend-dot" style={{ background: val.color }} />
              <span className="legend-label" style={{ color: val.color }}>{val.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hidden easter egg for source readers */}
      {/* // npm install everything // yarn add confidence // still figuring it out */}
    </section>
  );
}
