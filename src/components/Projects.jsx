import { useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { projects } from '../data/portfolio';
import styles from './Projects.module.css';

function PlaceholderLink({ label }) {
  return (
    <span className={styles.placeholder}>
      [ {label} — COMING SOON ]
    </span>
  );
}

function ProjectCard({ project, index, visible }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      className={`${styles.card} reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 0.15}s` }}
    >
      {/* Header bar */}
      <div className={styles.cardHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.statusBadge} data-status={project.statusClass}>
            <span className={styles.statusDot} />
            {project.status}
          </div>
          <span className={styles.year}>{project.year}</span>
        </div>
        <div className={styles.headerDots} aria-hidden="true">
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
      </div>

      {/* Body */}
      <div className={styles.cardBody}>
        <h3 className={styles.projectName}>{project.name}</h3>
        <p className={styles.projectTagline}>{project.tagline}</p>

        {/* Roles */}
        <div className={styles.roles}>
          {project.role.map(r => (
            <span key={r} className={styles.roleTag}>{r}</span>
          ))}
        </div>

        <p className={styles.projectDesc}>{project.description}</p>

        {/* Tech tags */}
        <div className={styles.techTags}>
          {project.tags.map(t => (
            <span key={t} className={styles.techTag}>{t}</span>
          ))}
        </div>

        {/* Links */}
        <div className={styles.links}>
          {project.links.website
            ? <a href={project.links.website} target="_blank" rel="noopener noreferrer" className="btn-pixel">↗ WEBSITE</a>
            : <PlaceholderLink label="WEBSITE" />
          }
          {project.links.instagram
            ? <a href={project.links.instagram} target="_blank" rel="noopener noreferrer" className="btn-pixel">↗ INSTAGRAM</a>
            : <PlaceholderLink label="INSTAGRAM" />
          }
        </div>
      </div>

      {/* Corner accent */}
      <div className={styles.cornerAccent} aria-hidden="true" />
    </article>
  );
}

function EmptySlot({ index, visible }) {
  return (
    <div
      className={`${styles.emptySlot} reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${(index + 1) * 0.15}s` }}
      aria-hidden="true"
    >
      <div className={styles.emptyContent}>
        <span className={styles.emptyIcon}>?</span>
        <span className={styles.emptyLabel}>NEXT PROJECT</span>
        <span className={styles.emptySubLabel}>UNIDENTIFIED OBJECT</span>
      </div>
    </div>
  );
}

export default function Projects() {
  const [ref, visible] = useIntersectionObserver();

  return (
    <section id="projects" className={styles.projectsSection} ref={ref}>
      <div className="section">
        <div className={`section-label reveal ${visible ? 'visible' : ''}`}>
          MISSION LOG
        </div>
        <h2 className={`section-title reveal ${visible ? 'visible' : ''} reveal-delay-1`}>
          ACTIVE PROJECTS
        </h2>

        <p className={`${styles.intro} reveal ${visible ? 'visible' : ''} reveal-delay-2`}>
          One down. More incoming. This isn't an empty section — it's a launch pad.
        </p>

        <div className={styles.grid}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} visible={visible} />
          ))}
          {/* Future project slots */}
          <EmptySlot index={projects.length} visible={visible} />
          <EmptySlot index={projects.length + 1} visible={visible} />
        </div>

        <p className={`${styles.addNote} reveal ${visible ? 'visible' : ''} reveal-delay-4`}>
          <span className={styles.noteArrow}>→</span>
          More projects get added here as they happen. The grid scales automatically.
        </p>
      </div>
    </section>
  );
}
