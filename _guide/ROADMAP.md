# Al-Amin website — ROADMAP

الأمين للمحاماة والاستشارات القانونية · Baghdad. A lawyer / legal-consultation site whose
home page must send ONE meaning: professionalism + the rule of law + Iraq's roots
("where law was first written" — Hammurabi, Babylon, 1754 BC).

Reference entrance: https://www.lw.com/ (full-bleed hero, transparent nav, eyebrow +
light heading + text CTA). Brand assets: `assets/logo.jpg` (original), `assets/hero-baghdad.jpg`.

Road = the Daleel road: **informational layer → brain sockets → server.**
Tags: 🟢 = lifted from / worth harvesting into `Productivity/TRANSFER-CATALOG.md` · ⚪ = project-only.

## Step 0 — Theme system  ✅ DONE 2026-09-06
- 🟢 Design tokens in `css/style.css :root` (ink · marble · gold · lapis; Amiri / IBM Plex Sans Arabic /
  Cormorant Garamond / Segoe UI Historic). Never hardcode a hex — read the token.
- 🟢 Logo extraction: `assets/logo-{full,icon,word}-{light,dark}.png` cut from the JPG by hue/luminance
  (gold kept, ink → ivory for the dark variant). Script lives in the session; re-runnable on any logo-on-white.
- ⚪ Motion rules: Ken Burns hero (26 s), staged reveal (.35/.6/.9/1.2 s), cuneiform frieze (60 s),
  IntersectionObserver `.io` reveals, `prefers-reduced-motion` kills all of it.
- ⚪ `theme-board.html` — palette + type specimens (dev page).

## Step 1 — Informational layer  🔄 IN PROGRESS
- ✅ Home page v1 skeleton (2026-09-06) — ALL copy was invented placeholder.
- ✅ **v2 REBUILT ON THE CLIENT'S OWN WORDS (2026-09-18).** Source of truth = `ELITE CV.docx`.
  Every invented sentence removed. Plan + full text-to-section map: `_guide/BUILD-PLAN.md`.
  Sections now: the bar · homepic · **proof** 🆕 · Alameen · أعمدة عملنا (3 columns) ·
  **الخدمات** 🆕 (9-line index) · historic timeline · **رؤية ورسالة** 🆕 · Contact · the footer.
  `steps`/`.process` deleted — its 3 words (الدقة·السرعة·السرية) became أعمدة عملنا.
- ✅ **Services pages BUILT (2026-09-18)** — `/services/s1…s9.html` (index page retired 2026-09-19 — the homepage list replaces it), GENERATED,
  never hand-typed: `data/services.json` (37 items extracted verbatim from the docx) →
  `build/build_services.py`. Re-run the script after any JSON edit; never edit the HTML by hand.
  Each page: breadcrumb · quiet ink header (NOT a 2nd photo hero) · numbered items · inline CTA ·
  the other 8 services · RTL-correct prev/next pager.
- ✅ **الاسم decided**: «الأمين للمحاماة والاستشارات القانونية» (the logo's wording).
- ⏳ Real phone/address → `data/config.json` (email placeholder is live).
- ⏳ Inner pages: practice-area detail, about/team, insights, contact. Same tokens, same nav/footer.
- ✅ **1b Bilingual DONE (2026-09-18)** — Arabic-first + EN toggle, `data/i18n.json` (90 keys) +
  `title_en`/`items_en` in `services.json`, engine in `js/site.js`. Two-direction scan passes.
  ⚠️ English is Claude's translation — needs the firm's sign-off.
- ⏳ SEO/meta, favicon from `logo-icon`, OG image from the hero.

## Step 2 — Brain sockets  🔄
- ✅ **`consultation-form` BUILT & verified** — provider-swappable mail engine + honest states.
- ✅ `lang-toggle` BUILT.
Marked in the HTML with `data-brain="…"` + a 🧠 comment:
- `consultation-form` — client-side validation + honest states (sending / sent / failed).
- `lang-toggle` — the bilingual switch.
- Later candidates: appointment booking, insights/news feed (admin-posted), AI legal-intake assistant.

## Step 3 — Server + deploy  ⏳ (decision pending — see the recommendation in chat 2026-09-06)
- Recommended: Flask (Daleel road, `production-hardening-playbook`) + **Postgres on Supabase** as the
  fridge, so the web service stays stateless (no persistent disk needed; Render free/starter works).
- Alternative: Flask + SQLite on a Render persistent disk (simplest, but a paid disk and a single instance).
- Deploy doc → `_guide/DEPLOY.md` when built.

## Verification notes
- Preview: `snake-web` server → `http://localhost:5757/Projects/Al-Amin%20website/`.
- The in-app Browser pane blanks on scrolled screenshots when the window is hidden; verify lower
  sections from Claude-in-Chrome (a real tab) — done 2026-09-06.
