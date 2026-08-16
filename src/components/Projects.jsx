import { useState, useEffect, useRef } from 'react';
import { projects } from '../data/portfolioData';
import './Projects.css';

function StatusBadge({ status }) {
  const color = status === 'In Progress' ? 'var(--yellow)' : 'var(--green)';
  return (
    <span className="status-badge" style={{ '--badge-color': color }}>
      <span className="status-badge__dot" aria-hidden="true" />
      {status}
    </span>
  );
}

function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) e.target.classList.add('project-card--visible'); },
      { threshold: 0.1 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <article ref={ref} className="project-card">
      {/* Pixel decoration */}
      <div className="project-card__decoration" aria-hidden="true">
        <div className="project-card__orbit">
          <div className="project-card__satellite" />
        </div>
      </div>

      <div className="project-card__inner">
        <header className="project-card__header">
          <div className="project-card__type tag" aria-label={`Project type: ${project.type}`}>
            {project.type}
          </div>
          <StatusBadge status={project.status} />
        </header>

        <h3 className="project-card__name">{project.name}</h3>

        <p className="project-card__desc">{project.description}</p>

        <div className="project-card__roles">
          <span className="project-card__roles-label">Role:</span>
          {project.role.map(r => (
            <span key={r} className="tag project-card__role-tag">{r}</span>
          ))}
        </div>

        <div className="project-card__links">
          {project.website !== null ? (
            <a href={project.website} target="_blank" rel="noopener noreferrer" className="btn-pixel">
              ↗ Website
            </a>
          ) : (
            <span className="project-card__placeholder">[ WEBSITE COMING SOON ]</span>
          )}
          {project.instagram !== null ? (
            <a href={project.instagram} target="_blank" rel="noopener noreferrer" className="btn-pixel btn-pixel--ghost">
              📲 Instagram
            </a>
          ) : (
            <span className="project-card__placeholder">[ INSTAGRAM COMING SOON ]</span>
          )}
        </div>

        <div className="project-card__tags">
          {project.tags.map(t => (
            <span key={t} className="tag" style={{ color: 'var(--cyan)', borderColor: 'var(--cyan)' }}>{t}</span>
          ))}
          <span className="project-card__year">{project.year}</span>
        </div>
      </div>
    </article>
  );
}

// Empty state — where more projects will go
function FutureSlot() {
  return (
    <div className="future-slot" aria-label="Future project slot">
      <div className="future-slot__inner">
        <span className="future-slot__icon" aria-hidden="true">+</span>
        <p className="future-slot__text">Next project.<br />In progress<span className="cursor" aria-hidden="true">_</span></p>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading">
      <div className="section-wrap">
        <p className="section-label">Projects</p>
        <h2 id="projects-heading" className="section-title">Things I&apos;ve actually built</h2>
        <p className="projects__note">
          One project so far. But every codebase starts somewhere.
        </p>

        <div className="projects__grid">
          {projects.map(p => (
            <ProjectCard key={p.id} project={p} />
          ))}
          <FutureSlot />
        </div>

        {/* Avengers easter egg */}
        <div className="projects__avengers-hint" aria-label="Easter egg reference">
          <span aria-hidden="true">⚡</span>
          <span className="projects__avengers-text">
            "Part of the journey is the end." — Some guy in a red suit
          </span>
        </div>
      </div>
    </section>
  );
}
