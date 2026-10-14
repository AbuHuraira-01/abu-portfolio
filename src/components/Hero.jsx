import { useCallback, useEffect, useRef, useState } from 'react';
import { PROFILE } from '../data.js';
import { copyText } from '../lib.js';
import { ComponentIcon, CursorArrow, Arrow } from '../icons.jsx';

// Positions are percentages of the canvas so layers survive a resize.
// Tuned so nothing overlaps from a 288px wide canvas (320px phone) upwards.
const START = {
  note: { x: 5, y: 7 },
  button: { x: 58, y: 10 },
  type: { x: 7, y: 50 },
  swatch: { x: 52, y: 50 },
  code: { x: 22, y: 80 },
};

const LAYERS = [
  { id: 'note', name: 'Sticky note' },
  { id: 'button', name: 'Button / Primary' },
  { id: 'type', name: 'Type / Display' },
  { id: 'swatch', name: 'Color styles' },
  { id: 'code', name: '<Dev />' },
];

function LayerBody({ id }) {
  switch (id) {
    case 'note':
      return (
        <div className="sticky">
          <strong>TODO</strong>
          <span>Hire Abu Huraira before someone else does.</span>
          <em>Recruiter, probably</em>
        </div>
      );
    case 'button':
      return (
        <div className="comp">
          <span className="comp__label">
            <ComponentIcon /> Button
          </span>
          <span className="faux-btn">Let's talk</span>
        </div>
      );
    case 'type':
      return (
        <div className="type-card">
          <span className="type-card__aa">Aa</span>
          <span className="type-card__meta">Archivo · 800</span>
        </div>
      );
    case 'swatch':
      return (
        <div className="swatch-card">
          <span className="swatch-card__row">
            <i style={{ background: 'var(--ink)' }} />
            <i style={{ background: 'var(--select)' }} />
            <i style={{ background: 'var(--note)' }} />
            <i style={{ background: 'var(--comp)' }} />
          </span>
          <span className="swatch-card__meta">4 color styles</span>
        </div>
      );
    case 'code':
      return <code className="code-chip">{'<Dev name="Abu Huraira" />'}</code>;
    default:
      return null;
  }
}

function Canvas() {
  const ref = useRef(null);
  const drag = useRef(null);
  const youRef = useRef(null);
  const layerRefs = useRef({});
  const [pos, setPos] = useState(START);
  const [moved, setMoved] = useState(false);
  const [selected, setSelected] = useState('button');
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [selSize, setSelSize] = useState(null);

  // Keep every layer fully inside the canvas (after resizes, rotation, font swaps).
  const clampAll = useCallback(() => {
    const c = ref.current;
    if (!c) return;
    const cw = c.clientWidth;
    const ch = c.clientHeight;
    if (!cw || !ch) return;
    setPos((p) => {
      let changed = false;
      const next = { ...p };
      for (const id of Object.keys(p)) {
        const el = layerRefs.current[id];
        if (!el) continue;
        const maxX = Math.max(0, ((cw - el.offsetWidth) / cw) * 100);
        const maxY = Math.max(0, ((ch - el.offsetHeight) / ch) * 100);
        const x = Math.min(p[id].x, maxX);
        const y = Math.min(p[id].y, maxY);
        if (x !== p[id].x || y !== p[id].y) {
          changed = true;
          next[id] = { x, y };
        }
      }
      return changed ? next : p;
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setSize({ w: el.clientWidth, h: el.clientHeight });
      clampAll();
    });
    ro.observe(el);
    // Web fonts change layer sizes once they load.
    document.fonts?.ready?.then(clampAll).catch(() => {});
    return () => ro.disconnect();
  }, [clampAll]);

  useEffect(() => {
    const el = selected && layerRefs.current[selected];
    if (!el) return setSelSize(null);
    setSelSize({ w: Math.round(el.offsetWidth), h: Math.round(el.offsetHeight) });
  }, [selected, size]);

  // Canvas-relative origin (inside the border), matching how % positions resolve.
  const origin = () => {
    const c = ref.current;
    const r = c.getBoundingClientRect();
    return { x: r.left + c.clientLeft, y: r.top + c.clientTop, w: c.clientWidth, h: c.clientHeight };
  };

  const place = (id, xPx, yPx) => {
    const o = origin();
    const el = layerRefs.current[id];
    const x = Math.max(0, Math.min(o.w - el.offsetWidth, xPx));
    const y = Math.max(0, Math.min(o.h - el.offsetHeight, yPx));
    setPos((p) => ({ ...p, [id]: { x: (x / o.w) * 100, y: (y / o.h) * 100 } }));
    setMoved(true);
  };

  const onPointerDown = (e, id) => {
    if (e.button !== 0) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    drag.current = { id, dx: e.clientX - r.left, dy: e.clientY - r.top };
    try {
      el.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    setSelected(id);
  };

  const onPointerMove = (e, id) => {
    const d = drag.current;
    if (!d || d.id !== id) return;
    const o = origin();
    place(id, e.clientX - o.x - d.dx, e.clientY - o.y - d.dy);
  };

  const endDrag = () => {
    drag.current = null;
  };

  const onKeyDown = (e, id) => {
    const step = e.shiftKey ? 24 : 6;
    const moves = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
    const m = moves[e.key];
    if (!m) return;
    e.preventDefault();
    const el = layerRefs.current[id];
    place(id, el.offsetLeft + m[0], el.offsetTop + m[1]);
    setSelected(id);
  };

  // "You" multiplayer label follows the mouse without re-rendering the canvas.
  const onCanvasMove = (e) => {
    const you = youRef.current;
    if (!you || e.pointerType !== 'mouse') return;
    const o = origin();
    you.style.transform = `translate(${e.clientX - o.x + 14}px, ${e.clientY - o.y + 16}px)`;
    you.hidden = false;
  };

  const reset = () => {
    setPos(START);
    setMoved(false);
    requestAnimationFrame(clampAll);
  };

  return (
    <div className="canvas-wrap" data-layer="Frame / Hero">
      <div className="canvas-head">
        <span className="canvas-head__name">Frame / Hero</span>
        <span className="canvas-head__size" aria-label={`Canvas size ${size.w} by ${size.h} pixels`}>
          {size.w} × {size.h}
        </span>
      </div>
      <div
        className="canvas"
        ref={ref}
        onPointerMove={onCanvasMove}
        onPointerLeave={() => {
          if (youRef.current) youRef.current.hidden = true;
        }}
        onPointerDown={(e) => {
          if (e.target === ref.current) setSelected(null);
        }}
        role="group"
        aria-label="Design canvas. Drag the layers, or focus one and use the arrow keys."
      >
        {LAYERS.map(({ id, name }) => (
          <div
            key={id}
            ref={(el) => (layerRefs.current[id] = el)}
            className={`layer layer--${id}${selected === id ? ' is-selected' : ''}`}
            style={{ left: `${pos[id].x}%`, top: `${pos[id].y}%` }}
            tabIndex={0}
            role="button"
            aria-label={`${name} layer. Use arrow keys to move.`}
            aria-pressed={selected === id}
            onPointerDown={(e) => onPointerDown(e, id)}
            onPointerMove={(e) => onPointerMove(e, id)}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onLostPointerCapture={endDrag}
            onKeyDown={(e) => onKeyDown(e, id)}
            onFocus={() => setSelected(id)}
          >
            <LayerBody id={id} />
            {selected === id && (
              <span className="sel" aria-hidden="true">
                <i className="h tl" />
                <i className="h tr" />
                <i className="h bl" />
                <i className="h br" />
                {selSize && (
                  <span className="sel__size">
                    {selSize.w} × {selSize.h}
                  </span>
                )}
              </span>
            )}
          </div>
        ))}

        <div className="peer" aria-hidden="true">
          <CursorArrow />
          <span>Abu Huraira</span>
        </div>

        <div className="you" ref={youRef} hidden aria-hidden="true">
          You
        </div>
      </div>
      <div className="canvas-foot">
        <span>Drag the layers around.</span>
        <button type="button" className="link-btn" onClick={reset} disabled={!moved}>
          Reset layout
        </button>
      </div>
    </div>
  );
}

export default function Hero({ notify }) {
  return (
    <section className="hero" id="top">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <p className="status" data-layer="Badge / Status">
            <span className="status__dot" aria-hidden="true" />
            Available for work · Karachi
          </p>
          <h1 className="hero__title" data-layer="H1 / Name">
            <span className="hero__name">
              Abu Huraira
              <span className="hero__tag" aria-hidden="true">
                H1 / Name
              </span>
            </span>
          </h1>
          <p className="hero__role" data-layer="Text / Role">
            Frontend &amp; <span className="hero__mark">MERN stack</span> developer with a UI/UX design background.
          </p>
          <p className="hero__lead" data-layer="Text / Lead">
            I design clean interfaces in Figma and turn them into fast, responsive web apps with React, Node.js and
            MongoDB.
          </p>
          <div className="hero__actions">
            <a className="btn btn--primary" href="#work" data-layer="Button / Primary">
              See my work <Arrow />
            </a>
            <button
              type="button"
              className="btn btn--ghost"
              data-layer="Button / Secondary"
              onClick={async () => {
                const ok = await copyText(PROFILE.email);
                notify(ok ? 'Email copied' : `Couldn't copy. Email: ${PROFILE.email}`);
              }}
            >
              Copy email
            </button>
          </div>
          <dl className="hero__meta" data-layer="List / Meta">
            <div>
              <dt>Builds with</dt>
              <dd>MERN stack</dd>
            </div>
            <div>
              <dt>Designs in</dt>
              <dd>Figma</dd>
            </div>
            <div>
              <dt>Based in</dt>
              <dd>Karachi</dd>
            </div>
          </dl>
        </div>
        <Canvas />
      </div>
    </section>
  );
}
