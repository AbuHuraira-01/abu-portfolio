# Abu Huraira Portfolio

A portfolio built like a live Figma file. React 18 + Vite, no UI libraries.

## Run it

```bash
npm install
npm run dev        # local dev server
npm run build      # production build in /dist
```

## Edit content

All text lives in `src/data.js`:

- `PROFILE`: name, email, phone, WhatsApp, and empty `github` / `linkedin` fields. Fill those two in and buttons appear in the Contact section automatically.
- `PROJECTS`: the four project cards (summary, points, tags, code sample, wireframe type).
- `SKILL_GROUPS`: the Layers panel in the Skills section.
- `HISTORY`: the Version history timeline (oldest first; the site shows newest first).

## Deploy (free)

1. Push this folder to a GitHub repo.
2. Import it on vercel.com or netlify.com.
3. Build command `npm run build`, output folder `dist`.

## Features

- Inspect mode: press `I` (or the toggle) and hover/tap any element to see its layer name and size.
- Draggable hero canvas with a selection box, live size labels, arrow-key nudging and a reset.
- Design / Code switch on every project card.
- Figma-style Layers + Properties panel for skills.
- Filterable version-history timeline.
- Light and dark theme (follows the system, remembers the choice).
- Responsive from 320px phones to wide desktops, keyboard accessible, respects reduced motion.
