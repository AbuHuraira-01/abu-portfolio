import { useState } from 'react';
import { SKILL_GROUPS } from '../data.js';
import { Caret, Eye, FrameIcon, ComponentIcon } from '../icons.jsx';
import SectionHead from './SectionHead.jsx';

export default function Skills() {
  const [open, setOpen] = useState({ frontend: true, backend: true, design: true, soft: false });
  const [hidden, setHidden] = useState({});
  const [sel, setSel] = useState({ g: 'frontend', name: 'React' });

  const group = SKILL_GROUPS.find((g) => g.id === sel.g);
  const skill = group.items.find((s) => s.name === sel.name);
  const total = SKILL_GROUPS.reduce((n, g) => n + g.items.length, 0);

  return (
    <section className="section" id="skills">
      <div className="wrap">
        <SectionHead page="Skills" title="What's in my toolkit" lead="Open a layer group and pick a skill to see where I used it." />
        <div className="skills">
          <div className="panel" data-layer="Panel / Layers">
            <div className="panel__title">
              <span>Layers</span>
              <span className="panel__count">{total}</span>
            </div>
            <ul className="layers">
              {SKILL_GROUPS.map((g) => {
                const isOpen = !!open[g.id];
                const isHidden = !!hidden[g.id];
                return (
                  <li key={g.id} className={`lgroup${isHidden ? ' is-hidden' : ''}`}>
                    <div className="lrow lrow--group">
                      <button
                        type="button"
                        className="lrow__main"
                        aria-expanded={isOpen}
                        aria-controls={`lg-${g.id}`}
                        onClick={() => setOpen((o) => ({ ...o, [g.id]: !o[g.id] }))}
                      >
                        <Caret open={isOpen} />
                        <span className="lrow__icon">
                          <FrameIcon />
                        </span>
                        <span className="lrow__name">{g.name}</span>
                        <span className="lrow__count">{g.items.length}</span>
                      </button>
                      <button
                        type="button"
                        className="eye"
                        aria-pressed={!isHidden}
                        aria-label={`${isHidden ? 'Show' : 'Hide'} ${g.name}`}
                        onClick={() => setHidden((h) => ({ ...h, [g.id]: !h[g.id] }))}
                      >
                        <Eye off={isHidden} />
                      </button>
                    </div>
                    <ul id={`lg-${g.id}`} className="lchildren" hidden={!isOpen}>
                      {g.items.map((s) => {
                        const active = sel.g === g.id && sel.name === s.name;
                        return (
                          <li key={s.name}>
                            <button
                              type="button"
                              className={`lrow lrow--item${active ? ' is-active' : ''}`}
                              aria-current={active ? 'true' : undefined}
                              onClick={() => setSel({ g: g.id, name: s.name })}
                            >
                              <span className="lrow__icon lrow__icon--comp">
                                <ComponentIcon />
                              </span>
                              <span className="lrow__name">{s.name}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </div>

          <p className="sr-only" aria-live="polite">
            {skill.name} selected. {skill.note}
          </p>
          <div className="panel props" data-layer="Panel / Properties">
            <div className="panel__title">
              <span>Properties</span>
              <span className="panel__count">Skill</span>
            </div>
            <div className="props__body">
              <p className="props__eyebrow">
                <ComponentIcon /> {group.name}
              </p>
              <h3 className="props__name">{skill.name}</h3>
              <dl className="props__list">
                <div>
                  <dt>Where I used it</dt>
                  <dd>{skill.note}</dd>
                </div>
                <div>
                  <dt>Also in this group</dt>
                  <dd className="props__siblings">
                    {group.items
                      .filter((s) => s.name !== skill.name)
                      .map((s) => (
                        <button key={s.name} type="button" className="chip" onClick={() => setSel({ g: group.id, name: s.name })}>
                          {s.name}
                        </button>
                      ))}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
