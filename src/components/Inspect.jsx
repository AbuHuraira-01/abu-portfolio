import { useEffect, useRef, useState } from 'react';

// Figma-style inspect: hover (or tap) any element marked with data-layer
// to see its layer name and live size.
export default function InspectOverlay({ active, onExit }) {
  const [box, setBox] = useState(null);
  const target = useRef(null);

  useEffect(() => {
    if (!active) {
      target.current = null;
      setBox(null);
      return;
    }

    const measure = () => {
      const t = target.current;
      if (!t || !t.isConnected) return setBox(null);
      const r = t.getBoundingClientRect();
      setBox({ x: r.left, y: r.top, w: r.width, h: r.height, name: t.dataset.layer });
    };

    const pick = (el) => {
      const t = el && el.closest ? el.closest('[data-layer]') : null;
      target.current = t;
      measure();
    };

    const onMove = (e) => {
      if (e.pointerType === 'mouse') pick(e.target);
    };
    const onDown = (e) => {
      if (e.pointerType !== 'mouse') pick(e.target);
    };
    // In inspect mode, a click selects a layer instead of activating it
    // (links, buttons, tabs), like Figma's inspect. The header and the hint stay usable.
    const onClick = (e) => {
      if (e.target.closest('[data-inspect-safe]')) return;
      e.preventDefault();
      e.stopPropagation();
      pick(e.target);
    };
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerdown', onDown, { passive: true });
    document.addEventListener('click', onClick, true);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [active]);

  if (!active) return null;

  const labelAbove = box && box.y > 30;
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1000;

  return (
    <>
      {box && (
        <div
          className="inspect-box"
          style={{ transform: `translate(${box.x}px, ${box.y}px)`, width: box.w, height: box.h }}
          aria-hidden="true"
        >
          <span
            className={`inspect-box__label${labelAbove ? '' : ' is-inside'}`}
            style={box.x > vw - 220 ? { right: 0, left: 'auto' } : undefined}
          >
            {box.name}
          </span>
          <span className="inspect-box__size">
            {Math.round(box.w)} × {Math.round(box.h)}
          </span>
        </div>
      )}
      <div className="inspect-hint" data-inspect-safe role="status">
        <span className="inspect-hint__dot" aria-hidden="true" />
        <span className="inspect-hint__text">Inspect mode: hover or tap anything.</span>
        <button type="button" className="inspect-hint__exit" onClick={onExit}>
          Exit
        </button>
      </div>
    </>
  );
}
