import { education } from '../data/portfolio';
import './Education.css';

export default function Education() {
  return (
    <section id="education" className="section education" aria-label="Education">
      <span className="section-label">Academic Archive</span>
      <h2 className="education__heading">EDUCATION</h2>

      <div className="education__terminal">
        <div className="terminal-header">
          <span className="terminal-dot" />
          <span className="terminal-dot" style={{ background: 'var(--clr-orange)' }} />
          <span className="terminal-dot" style={{ background: 'var(--clr-green)' }} />
          <span className="terminal-title">academic_record.log</span>
        </div>

        <div className="edu-terminal-body">
          <div className="edu-prompt">{'>'} Loading academic records...</div>
          <div className="edu-prompt edu-prompt--ok">{'[OK]'} Records found.</div>
          <div className="edu-spacer" />

          {education.map((item, i) => (
            <div key={item.id} className="edu-record">
              <div className="edu-record__line">
                <span className="edu-record__index">[{String(i + 1).padStart(2, '0')}]</span>
                <span className="edu-record__institution">{item.institution}</span>
                <span className={`status-badge ${item.status === 'COMPLETED' ? 'done' : 'loading'}`}>
                  {item.status}
                </span>
              </div>
              <div className="edu-record__detail">
                <div className="edu-record__level">
                  <span className="edu-key">LEVEL</span>
                  <span className="edu-val">{item.level}</span>
                </div>
                <div className="edu-record__result">
                  <span className="edu-key">RESULT</span>
                  <span className="edu-val edu-val--highlight">{item.result}</span>
                </div>
              </div>
            </div>
          ))}

          <div className="edu-spacer" />
          <div className="edu-prompt edu-prompt--dim">{'>'} Ongoing: learning everything else that's not in a textbook.</div>
          <div className="edu-prompt edu-prompt--dim">{'>'} ETA: undefined.</div>
          <div className="edu-prompt edu-prompt--dim">{'>'} That's okay.</div>
          <div className="edu-cursor">█</div>
        </div>
      </div>

      {/* Achievements section */}
      <div className="edu-achievements">
        <div className="edu-achievements__header">
          <span className="section-label">Achievements Log</span>
        </div>
        <div className="edu-achievements__card">
          <div className="ach-icon">🏆</div>
          <div className="ach-content">
            <div className="ach-title">ACHIEVEMENTS</div>
            <div className="ach-status">[ CURRENTLY LOADING... ]</div>
            <div className="ach-progress">
              <div className="ach-bar">
                <div className="ach-bar__fill" style={{ width: '12%' }} />
              </div>
              <span className="ach-pct">12%</span>
            </div>
            <p className="ach-desc">
              Working on it. Check back when I've built more things.
              Or when Pluto gets its planet status back. Whichever comes first.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
