import { useEffect, useRef } from 'react';
import { education } from './portfolioData';
import './Education.css';

function EducationEntry({ entry, index }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) e.target.classList.add('edu-entry--visible'); },
      { threshold: 0.15 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="edu-entry"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <div className="edu-entry__connector" aria-hidden="true">
        <div className="edu-entry__dot" />
        {index < education.length - 1 && <div className="edu-entry__line" />}
      </div>
      <div className="edu-entry__card">
        <div className="edu-entry__header">
          <span className="edu-entry__year">{entry.year}</span>
          <span className="edu-entry__result">{entry.result}</span>
        </div>
        <h3 className="edu-entry__degree">{entry.degree}</h3>
        <p className="edu-entry__institution">
          <span aria-hidden="true">▸</span> {entry.institution}
        </p>
        <p className="edu-entry__note">{entry.note}</p>
      </div>
    </div>
  );
}

// Retro "data archive" header row
function TerminalHeader() {
  return (
    <div className="edu__terminal" aria-hidden="true">
      <div className="edu__terminal-line">
        <span className="edu__t-cmd">$ query</span>
        <span className="edu__t-arg">--db ACADEMIC_ARCHIVE --user MADHYANI_M</span>
      </div>
      <div className="edu__terminal-line">
        <span className="edu__t-out">Found 2 records. Displaying...</span>
      </div>
    </div>
  );
}

// Achievements "loading" section
function Achievements() {
  return (
    <div className="achievements">
      <h3 className="achievements__title">Achievements</h3>
      <div className="achievements__body">
        <div className="achievements__bar">
          <div className="achievements__bar-fill" />
        </div>
        <p className="achievements__status">
          LOADING<span className="cursor" aria-hidden="true">_</span>
        </p>
        <p className="achievements__sub">
          Check back later. Or don&apos;t. No pressure.
        </p>
      </div>
    </div>
  );
}

export default function Education() {
  return (
    <section id="education" aria-labelledby="edu-heading">
      <div className="section-wrap">
        <p className="section-label">Education</p>
        <h2 id="edu-heading" className="section-title">The Academic Record</h2>

        <TerminalHeader />

        <div className="edu__entries">
          {education.map((e, i) => (
            <EducationEntry key={e.degree} entry={e} index={i} />
          ))}
        </div>

        <Achievements />
      </div>
    </section>
  );
}
