# Al-Amin website — project conventions

الأمين للمحاماة والاستشارات القانونية (Baghdad). Static informational site now; Daleel road
(HTML layer → brain sockets → server). Plan + status: `_guide/ROADMAP.md`.

## The one meaning
Every corner of the site says: professionalism · the rule of law · Iraqi roots.
Anchor line: **"حيثُ كُتِبَ القانونُ أوّلَ مرّة"** (Hammurabi, Babylon, 1754 BC). If a new element
does not serve that meaning, it does not go in.

## Files
- `index.html` — home page. `css/style.css` — ALL tokens + styles (tokens at `:root`).
- `assets/hero-baghdad.jpg` — the entrance image (never replace with a stock photo).
- `assets/logo-*.png` — extracted logo variants: `-dark` (ivory + gold) on ink surfaces,
  `-light` (original) on marble. Never redraw the logo; use these files.
- `theme-board.html` — dev-only palette/type sheet.

## Rules
- **Tokens only.** No raw hex in components; add a token if a color is missing.
- **Arabic first, RTL.** English is secondary (`lang="en"` spans use the Latin display face).
  Do not translate stored data, only chrome (see the `bilingual` skill).
- **Fonts:** Amiri (Arabic display) · IBM Plex Sans Arabic (Arabic UI) · Cormorant Garamond
  (English display, light) · Segoe UI Historic for the cuneiform frieze.
- **Motion is quiet.** Slow, staged, and fully disabled under `prefers-reduced-motion`.
- **Honest content.** No invented numbers (cases won, years). Placeholders are labeled as such
  until the firm's real data arrives.
- **Brain sockets** are marked `data-brain="…"` with a 🧠 comment; keep them backend-neutral until step 3.

## Verify
`snake-web` preview → `http://localhost:5757/Projects/Al-Amin%20website/`. Run ASVL: look at the
rendered page (real tab), console clean, then report. Lower-page screenshots may need Claude-in-Chrome.
