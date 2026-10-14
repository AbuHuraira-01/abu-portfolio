import { useEffect, useState } from 'react';

// Copy text. Must be called directly from a click handler.
// If the clipboard is blocked, selects the given element so the user can copy by hand.
export async function copyText(text, fallbackEl) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    if (fallbackEl) {
      const range = document.createRange();
      range.selectNodeContents(fallbackEl);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
    return false;
  }
}

const THEME_KEY = 'ah-theme';

function systemDark() {
  return !!window.matchMedia?.('(prefers-color-scheme: dark)').matches;
}

function effectiveDark() {
  const t = document.documentElement.dataset.theme;
  if (t === 'dark') return true;
  if (t === 'light') return false;
  return systemDark();
}

export function useTheme() {
  const [isDark, setIsDark] = useState(() => effectiveDark());

  useEffect(() => {
    let saved = null;
    try {
      saved = localStorage.getItem(THEME_KEY);
    } catch {
      /* storage blocked: follow system */
    }
    if (saved === 'dark' || saved === 'light') document.documentElement.dataset.theme = saved;
    setIsDark(effectiveDark());

    const mq = window.matchMedia?.('(prefers-color-scheme: dark)');
    const sync = () => setIsDark(effectiveDark());
    mq?.addEventListener?.('change', sync);
    const mo = new MutationObserver(sync);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => {
      mq?.removeEventListener?.('change', sync);
      mo.disconnect();
    };
  }, []);

  const toggle = () => {
    const next = effectiveDark() ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* ignore */
    }
    setIsDark(next === 'dark');
  };

  return { isDark, toggle };
}

// Tiny syntax highlighter for the project code views.
const TOKEN_RE =
  /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`)|(<\/?[A-Za-z][\w.]*)|\b(const|let|var|return|async|await|if|for|of|try|catch|export|function|import|from|new|default)\b|(\b\d+(?:\.\d+)?(?:rem|px|fr|em|%)?\b)|(@media|[.#][a-z][\w-]*(?=\s*[{,]))/g;

const TOKEN_CLASS = ['', 'tk-com', 'tk-str', 'tk-tag', 'tk-key', 'tk-num', 'tk-sel'];

export function highlight(code) {
  const out = [];
  let last = 0;
  let m;
  let i = 0;
  TOKEN_RE.lastIndex = 0;
  while ((m = TOKEN_RE.exec(code))) {
    if (m.index > last) out.push(code.slice(last, m.index));
    const group = m.findIndex((g, idx) => idx > 0 && g !== undefined);
    out.push({ text: m[0], cls: TOKEN_CLASS[group], key: i++ });
    last = m.index + m[0].length;
  }
  if (last < code.length) out.push(code.slice(last));
  return out;
}
