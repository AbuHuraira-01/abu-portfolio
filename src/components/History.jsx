import { useState } from 'react';
import { HISTORY } from '../data.js';
import SectionHead from './SectionHead.jsx';

const FILTERS = ['All', 'Work', 'Learning', 'Volunteering'];

export default function History() {
  const [filter, setFilter] = useState('All');
  // Version numbers follow the real order things started in.
  const versions = HISTORY.map((h, i) => ({ ...h, v: i + 1 })).reverse();
  const shown = versions.filter((h) => filter === 'All' || h.type === filter);

  return (
    <section className="section" id="history">
      <div className="wrap history">
        <SectionHead
          page="Experience"
          title="Version history"
          lead="Every course, job and role is a saved version. Newest on top."
        />
        <div className="history__panel panel" data-layer="Panel / Version history">
          <div className="filters" role="group" aria-label="Filter history">
            {FILTERS.map((f) => (
              <button key={f} type="button" className="chip" aria-pressed={filter === f} onClick={() => setFilter(f)}>
                {f}
              </button>
            ))}
          </div>
          <ol className="versions">
            {shown.map((h) => (
              <li key={h.title} className={`ver ver--${h.type.toLowerCase()}`}>
                <span className="ver__dot" aria-hidden="true" />
                <div className="ver__body">
                  <div className="ver__top">
                    <span className="ver__num">v{h.v}</span>
                    <span className="ver__type">{h.type}</span>
                    {h.current && <span className="ver__current">In progress</span>}
                  </div>
                  <h3 className="ver__title">{h.title}</h3>
                  <p className="ver__org">{h.org}</p>
                  <p className="ver__note">{h.note}</p>
                </div>
                <span className="ver__dates">{h.dates}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
