import { useRef } from 'react';
import { PROFILE } from '../data.js';
import { copyText } from '../lib.js';
import { Copy, Arrow } from '../icons.jsx';

function CopyRow({ label, value, notify }) {
  const valRef = useRef(null);
  return (
    <div className="crow">
      <span className="crow__label">{label}</span>
      <span className="crow__value" ref={valRef}>
        {value}
      </span>
      <button
        type="button"
        className="icon-btn"
        aria-label={`Copy ${label.toLowerCase()}`}
        onClick={async () => {
          const ok = await copyText(value, valRef.current);
          notify(ok ? `${label} copied` : `Couldn't copy automatically. ${label} is selected, copy it manually.`);
        }}
      >
        <Copy />
      </button>
    </div>
  );
}

export default function Contact({ notify }) {
  return (
    <section className="section contact" id="contact">
      <div className="wrap contact__grid">
        <div className="contact__copy" data-layer="Heading / Contact">
          <p className="shead__path">
            <span className="shead__file">portfolio.fig</span>
            <span aria-hidden="true">/</span>
            <span>Contact</span>
          </p>
          <h2 className="contact__title">Got a design that needs building?</h2>
          <p className="contact__lead">
            Send me the Figma file, or just the idea. I'll turn it into something that works on every screen.
          </p>
        </div>
        <div className="contact__card panel" data-layer="Card / Contact">
          <CopyRow label="Email" value={PROFILE.email} notify={notify} />
          <CopyRow label="Phone" value={PROFILE.phone} notify={notify} />
          <div className="crow">
            <span className="crow__label">Location</span>
            <span className="crow__value">{PROFILE.location}</span>
          </div>
          <div className="contact__actions">
            <a className="btn btn--primary" href={PROFILE.whatsapp} target="_blank" rel="noopener noreferrer">
              Message on WhatsApp <Arrow />
            </a>
            {PROFILE.linkedin && (
              <a className="btn btn--ghost" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            )}
            {PROFILE.github && (
              <a className="btn btn--ghost" href={PROFILE.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
