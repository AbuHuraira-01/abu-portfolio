import { useEffect, useState } from 'react';
import { useTheme } from '../lib.js';
import { Sun, Moon, Menu, Close } from '../icons.jsx';

const LINKS = [
  ['work', 'Work'],
  ['skills', 'Skills'],
  ['history', 'Experience'],
  ['contact', 'Contact'],
];

export default function Topbar({ inspect, setInspect }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on Escape, a tap outside the header, or growing to desktop width.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onDown = (e) => {
      if (!e.target.closest('.topbar')) setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 760) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  return (
    <header className="topbar" data-scrolled={scrolled} data-inspect-safe>
      <div className="topbar__inner">
        <a href="#top" className="brand" data-layer="Logo" onClick={() => setOpen(false)}>
          <span className="brand__mark" aria-hidden="true">AH</span>
          <span className="brand__path">
            <span className="brand__dim">abu-huraira /</span> portfolio
          </span>
        </a>

        <nav className="nav" aria-label="Sections">
          {LINKS.map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>

        <div className="topbar__tools">
          <button
            type="button"
            className="inspect-toggle"
            aria-pressed={inspect}
            onClick={() => setInspect((v) => !v)}
            title="Toggle inspect mode (I)"
          >
            <span className="switch" aria-hidden="true">
              <span />
            </span>
            <span className="inspect-toggle__label">Inspect</span>
            <kbd>I</kbd>
          </button>
          <button
            type="button"
            className="icon-btn"
            onClick={toggle}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            title={isDark ? 'Light theme' : 'Dark theme'}
          >
            {isDark ? <Sun /> : <Moon />}
          </button>
          <button
            type="button"
            className="icon-btn menu-btn"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      <nav id="mobile-nav" className="mobile-nav" hidden={!open} aria-label="Sections">
        {LINKS.map(([id, label]) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
