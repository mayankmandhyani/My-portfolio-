import { useState } from 'react';
import { projects } from '../data/portfolio';
import './Projects.css';

function ProjectModal({ project, onClose }) {
  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`Project: ${project.name}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal">
        <div className="modal__header">
          <div className="modal__title-row">
            <div>
              <div className="modal__type">{project.type}</div>
              <h3 className="modal__title">{project.name}</h3>
            </div>
            <span className={`status-badge ${project.status === 'IN PROGRESS' ? 'loading' : 'done'}`}>
              {project.status}
            </span>
          </div>
          <button
            className="modal__close"
            onClick={onClose}
            aria-label="Close project"
          >
            [X]
          </button>
        </div>

        <div className="modal__body">
          <div className="modal__section">
            <div className="modal__section-label">{'> role'}</div>
            <div className="modal__roles">
              {project.role.map((r, i) => (
                <span key={i} className="modal__role-tag">{r}</span>
              ))}
            </div>
          </div>

          <div className="modal__section">
            <div className="modal__section-label">{'> description'}</div>
            <p className="modal__desc">{project.description}</p>
          </div>

          <div className="modal__section">
            <div className="modal__section-label">{'> tags'}</div>
            <div className="modal__tags">
              {project.tags.map((t, i) => (
                <span key={i} className="modal__tag">{t}</span>
              ))}
            </div>
          </div>

          <div className="modal__section">
            <div className="modal__section-label">{'> links'}</div>
            <div className="modal__links">
              {Object.entries(project.links).map(([key, link]) => (
                <div key={key} className="modal__link-row">
                  <span className="modal__link-label">{link.label}</span>
                  {link.url ? (
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="modal__link-value">
                      {link.url}
                    </a>
                  ) : (
                    <span className="modal__link-placeholder">{link.placeholder}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="project-card"
        style={{ animationDelay: `${index * 0.12}s` }}
        role="article"
      >
        {/* Decorative orbital ring */}
        <div className="project-card__orbit" aria-hidden="true">
          <div className="orbit-ring" />
          <div className="orbit-dot" />
        </div>

        <div className="project-card__inner">
          <div className="project-card__header">
            <span className="project-card__index">#{String(index + 1).padStart(2, '0')}</span>
            <span className={`status-badge ${project.status === 'IN PROGRESS' ? 'loading' : 'done'}`}>
              {project.status}
            </span>
          </div>

          <h3 className="project-card__name">{project.name}</h3>
          <div className="project-card__type">{project.type}</div>

          <div className="project-card__roles">
            {project.role.map((r, i) => (
              <span key={i} className="project-card__role">{r}</span>
            ))}
          </div>

          <p className="project-card__desc">{project.description}</p>

          <div className="project-card__tags">
            {project.tags.map((t, i) => (
              <span key={i} className="project-card__tag">{t}</span>
            ))}
          </div>

          <button
            className="btn-pixel project-card__btn"
            onClick={() => setOpen(true)}
            aria-label={`Open project details for ${project.name}`}
          >
            View Details
          </button>
        </div>
      </div>

      {open && <ProjectModal project={project} onClose={() => setOpen(false)} />}
    </>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section projects" aria-label="Projects">
      <span className="section-label">Deployed Objects</span>
      <h2 className="projects__heading">PROJECTS</h2>

      <p className="projects__sub">
        Currently one project in orbit. More incoming. The architecture is ready.
      </p>

      <div className="projects__grid">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}

        {/* Future project slot */}
        <div className="project-card project-card--ghost" aria-label="Future project slot">
          <div className="project-card__inner">
            <div className="ghost-label">[ NEXT OBJECT ]</div>
            <div className="ghost-sub">Coordinates unknown. ETA: soon™</div>
          </div>
        </div>
      </div>

      {/* // fun fact: "soon" is a relative concept in spacetime */}
    </section>
  );
}
