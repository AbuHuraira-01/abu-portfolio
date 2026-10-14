import { useState } from 'react';
import { PROJECTS } from '../data.js';
import { highlight } from '../lib.js';
import SectionHead from './SectionHead.jsx';

function Wireframe({ variant }) {
  if (variant === 'app') {
    return (
      <div className="wf wf--app" aria-hidden="true">
        <div className="wf__side">
          <i className="wf__logo" />
          <i />
          <i className="is-on" />
          <i />
          <i />
        </div>
        <div className="wf__main">
          <div className="wf__top">
            <i className="wf__search" />
            <i className="wf__avatar" />
          </div>
          {[0, 1, 2, 3].map((n) => (
            <div className="wf__row" key={n}>
              <i className={`wf__check${n < 2 ? ' is-on' : ''}`} />
              <i className="wf__text" style={{ width: `${70 - n * 12}%` }} />
              <i className="wf__pill" />
            </div>
          ))}
          <div className="wf__toast">201 Created</div>
        </div>
      </div>
    );
  }
  if (variant === 'system') {
    return (
      <div className="wf wf--system" aria-hidden="true">
        <span className="wf__complabel">◆ Button</span>
        <div className="wf__btns">
          <b className="b1">Primary</b>
          <b className="b2">Secondary</b>
          <b className="b3">Disabled</b>
        </div>
        <span className="wf__complabel">◆ Input</span>
        <div className="wf__input">
          <i />
        </div>
        <span className="wf__complabel">◆ Toggle · Chip</span>
        <div className="wf__misc">
          <i className="wf__toggle" />
          <i className="wf__toggle is-off" />
          <b className="wf__chip">React</b>
          <b className="wf__chip">Figma</b>
        </div>
      </div>
    );
  }
  if (variant === 'store') {
    const rows = [
      ['#1042', 'Paid', 'Fulfilled'],
      ['#1041', 'Paid', 'Fulfilled'],
      ['#1040', 'Paid', 'Packing'],
      ['#1039', 'Pending', 'Unfulfilled'],
    ];
    return (
      <div className="wf wf--store" aria-hidden="true">
        <div className="wf__thead">
          <span>Order</span>
          <span>Payment</span>
          <span>Status</span>
        </div>
        {rows.map(([id, pay, st]) => (
          <div className="wf__trow" key={id}>
            <span className="mono">{id}</span>
            <span>
              <b className={`pill pill--${pay === 'Paid' ? 'ok' : 'wait'}`}>{pay}</b>
            </span>
            <span>
              <b className={`pill pill--${st === 'Fulfilled' ? 'ok' : st === 'Packing' ? 'info' : 'wait'}`}>{st}</b>
            </span>
          </div>
        ))}
      </div>
    );
  }
  // landing: desktop + phone frames
  return (
    <div className="wf wf--landing" aria-hidden="true">
      <div className="wf__desk">
        <div className="wf__bar">
          <i />
          <i />
          <i />
        </div>
        <div className="wf__hero">
          <i className="wf__h" />
          <i className="wf__p" />
          <i className="wf__cta" />
        </div>
        <div className="wf__cards">
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className="wf__phone">
        <div className="wf__hero">
          <i className="wf__h" />
          <i className="wf__p" />
          <i className="wf__cta" />
        </div>
        <div className="wf__cards wf__cards--stack">
          <i />
          <i />
        </div>
      </div>
    </div>
  );
}

function CodeBlock({ code, file }) {
  const parts = highlight(code);
  return (
    <div className="code">
      <div className="code__bar">
        <span className="code__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="code__file">{file}</span>
      </div>
      <pre tabIndex={0} aria-label={`Code sample: ${file}`}>
        <code>
          {parts.map((p, i) =>
            typeof p === 'string' ? (
              p
            ) : (
              <span key={i} className={p.cls}>
                {p.text}
              </span>
            )
          )}
        </code>
      </pre>
    </div>
  );
}

function ProjectCard({ p }) {
  const [view, setView] = useState('design');
  const tabId = (v) => `${p.id}-tab-${v}`;
  const panelId = `${p.id}-panel`;
  return (
    <article className="project" data-layer={`Card / ${p.title}`}>
      <header className="project__head">
        <div className="project__titles">
          <p className="project__kind">{p.kind}</p>
          <h3>{p.title}</h3>
        </div>
        <div className="seg" role="tablist" aria-label={`${p.title} view`}>
          {['design', 'code'].map((v) => (
            <button
              key={v}
              type="button"
              role="tab"
              id={tabId(v)}
              aria-selected={view === v}
              aria-controls={panelId}
              tabIndex={view === v ? 0 : -1}
              onClick={() => setView(v)}
              onKeyDown={(e) => {
                if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
                e.preventDefault();
                const next = e.key === 'Home' ? 'design' : e.key === 'End' ? 'code' : v === 'design' ? 'code' : 'design';
                setView(next);
                document.getElementById(tabId(next))?.focus();
              }}
            >
              {v === 'design' ? 'Design' : 'Code'}
            </button>
          ))}
        </div>
      </header>
      <div className="project__stage" id={panelId} role="tabpanel" aria-labelledby={tabId(view)}>
        {view === 'design' ? <Wireframe variant={p.wire} /> : <CodeBlock code={p.code} file={p.file} />}
      </div>
      <div className="project__body">
        <p className="project__sum">{p.summary}</p>
        <ul className="project__points">
          {p.points.map((pt) => (
            <li key={pt}>{pt}</li>
          ))}
        </ul>
        <ul className="tags" aria-label="Tools used">
          {p.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function Work() {
  return (
    <section className="section" id="work">
      <div className="wrap">
        <SectionHead
          page="Work"
          title="Selected work"
          lead="Every project has two sides. Flip each card between the design and the code behind it."
        />
        <div className="projects">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
