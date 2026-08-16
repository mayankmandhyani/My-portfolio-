import { useEffect, useRef } from 'react';
import { skills } from './portfolioData';
import './Skills.css';

const LEVEL_ORDER = ['Exploring', 'Learning', 'Developing', 'Comfortable', 'Natural Habitat'];
const LEVEL_FILL = {
  'Exploring': 1,
  'Learning': 2,
  'Developing': 3,
  'Comfortable': 4,
  'Natural Habitat': 5,
};

const COLOR_MAP = {
  cyan: 'var(--cyan)',
  green: 'var(--green)',
  orange: 'var(--orange)',
  purple: 'var(--purple)',
  yellow: 'var(--yellow)',
};

function SkillCard({ skill, delay }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) e.target.classList.add('skill-card--visible'); },
      { threshold: 0.1 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const fill = LEVEL_FILL[skill.level] || 1;
  const color = COLOR_MAP[skill.color] || 'var(--cyan)';

  return (
    <div
      ref={ref}
      className="skill-card"
      style={{ '--skill-color': color, animationDelay: `${delay}ms` }}
    >
      <div className="skill-card__top">
        <span className="skill-card__icon" aria-hidden="true">{skill.icon}</span>
        <div className="skill-card__meta">
          <h3 className="skill-card__name">{skill.category}</h3>
          <span className="skill-card__level">{skill.level}</span>
        </div>
      </div>
      <p className="skill-card__desc">{skill.description}</p>
      {/* Pixel meter */}
      <div className="skill-card__meter" role="meter" aria-label={`${skill.category} level: ${skill.level}`} aria-valuenow={fill} aria-valuemin={1} aria-valuemax={5}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`skill-card__pip${i < fill ? ' skill-card__pip--filled' : ''}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading">
      {/* Decorative terminal header */}
      <div className="skills__terminal-bar section-wrap" aria-hidden="true">
        <span className="skills__tb-dot skills__tb-dot--r" />
        <span className="skills__tb-dot skills__tb-dot--y" />
        <span className="skills__tb-dot skills__tb-dot--g" />
        <span className="skills__tb-title">ASTRA_SKILLS.SYS — CURRENT LOADOUT</span>
      </div>

      <div className="section-wrap">
        <p className="section-label">Skills</p>
        <h2 id="skills-heading" className="section-title">What I&apos;m working with</h2>
        <p className="skills__note">
          Honest skill levels. No fake 97% JavaScript bars.
          These are states, not percentages.
        </p>

        <div className="skills__grid">
          {skills.map((skill, i) => (
            <SkillCard key={skill.category} skill={skill} delay={i * 80} />
          ))}
        </div>

        {/* Level legend */}
        <div className="skills__legend" aria-label="Skill level legend">
          <span className="skills__legend-label">Level guide:</span>
          {LEVEL_ORDER.map((l, i) => (
            <span key={l} className="skills__legend-item">
              <span className={`skills__legend-pip${i < 5 ? ' filled' : ''}`} style={{ '--n': i + 1 }} />
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
