import { useCallback, useEffect, useRef, useState } from 'react';
import Topbar from './components/Topbar.jsx';
import Hero from './components/Hero.jsx';
import Work from './components/Work.jsx';
import Skills from './components/Skills.jsx';
import History from './components/History.jsx';
import Contact from './components/Contact.jsx';
import InspectOverlay from './components/Inspect.jsx';
import { PROFILE } from './data.js';

export default function App() {
  const [inspect, setInspect] = useState(false);
  const [toast, setToast] = useState('');
  const timer = useRef(0);

  const notify = useCallback((msg) => {
    setToast(msg);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(''), 2400);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.repeat) return;
      const el = e.target;
      if (el && el.closest && el.closest('input, textarea, select, [contenteditable="true"]')) return;
      if (e.key === 'i' || e.key === 'I') setInspect((v) => !v);
      else if (e.key === 'Escape') setInspect(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('is-inspecting', inspect);
  }, [inspect]);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Topbar inspect={inspect} setInspect={setInspect} />
      <main id="main" tabIndex={-1}>
        <Hero notify={notify} />
        <Work />
        <Skills />
        <History />
        <Contact notify={notify} />
      </main>
      <footer className="footer">
        <div className="wrap footer__inner">
          <span>
            © {new Date().getFullYear()} {PROFILE.name}. Designed in Figma, built with React.
          </span>
          <span className="footer__tip">
            Tip: press <kbd>I</kbd> to inspect this page.
          </span>
        </div>
      </footer>
      <InspectOverlay active={inspect} onExit={() => setInspect(false)} />
      <div className="toast" role="status" aria-live="polite" data-show={toast ? 'true' : 'false'}>
        {toast}
      </div>
    </>
  );
}
