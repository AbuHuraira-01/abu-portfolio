const base = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
};

export const Sun = () => (
  <svg {...base}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const Moon = () => (
  <svg {...base}>
    <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
  </svg>
);

export const Menu = () => (
  <svg {...base}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const Close = () => (
  <svg {...base}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const Eye = ({ off }) => (
  <svg {...base} width={15} height={15}>
    {off ? (
      <path d="M3 3l18 18M10.6 6.2A9.7 9.7 0 0 1 12 6c5 0 8.5 4.3 9.5 6a14 14 0 0 1-3 3.6M6.6 6.7A14.4 14.4 0 0 0 2.5 12c1 1.7 4.5 6 9.5 6 1.5 0 2.9-.4 4.1-1M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    ) : (
      <>
        <path d="M2.5 12c1-1.7 4.5-6 9.5-6s8.5 4.3 9.5 6c-1 1.7-4.5 6-9.5 6s-8.5-4.3-9.5-6Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    )}
  </svg>
);

export const Caret = ({ open }) => (
  <svg {...base} width={12} height={12} style={{ transform: open ? 'rotate(90deg)' : 'none', transition: 'transform .15s' }}>
    <path d="M9 6l6 6-6 6" />
  </svg>
);

// Figma-style frame icon (#)
export const FrameIcon = () => (
  <svg {...base} width={14} height={14}>
    <path d="M8 3v18M16 3v18M3 8h18M3 16h18" />
  </svg>
);

// Figma-style component icon (diamond made of 4 diamonds)
export const ComponentIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor">
    <path d="M12 2l3.5 3.5L12 9 8.5 5.5zM12 15l3.5 3.5L12 22l-3.5-3.5zM5.5 8.5L9 12l-3.5 3.5L2 12zM18.5 8.5L22 12l-3.5 3.5L15 12z" />
  </svg>
);

export const Copy = () => (
  <svg {...base} width={16} height={16}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V5a2 2 0 0 1 2-2h8" />
  </svg>
);

export const Arrow = () => (
  <svg {...base} width={16} height={16}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const CursorArrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M4 2.5l15 8.2-6.6 1.6-3 6.2z" fill="currentColor" stroke="var(--surface)" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);
