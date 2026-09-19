# الأمين للمحاماة والاستشارات القانونية
**Al-Amin Advocates & Legal Consultants — Baghdad, Iraq**

🌐 **Live site: https://ibrahimaljabouri1562007com-sudo.github.io/ALAmeen/**

A bilingual (Arabic-first, RTL) website for an Iraqi law firm. Static pages, no server.

---

## What this is

Ten pages: a homepage and nine legal-service pages. Arabic is the source language; an
English edition ships alongside it and the whole layout mirrors RTL ⇄ LTR from one toggle.

**Every sentence about the firm comes from the firm's own profile document.** Nothing about
their services, experience or clients was invented. Section labels and the historical
timeline are the only editorial additions.

## Run it

No build step and no server needed — open `index.html` directly, or:

```bash
python -m http.server 5757
```

## Editing content

| To change | Edit | Then run |
|---|---|---|
| Any UI text, both languages | `data/i18n.json` | `python build/build_data.py` |
| Services and their items | `data/services.json` | `python build/build_services.py` |
| Phone, WhatsApp, address, email, mail route | `data/config.json` | `python build/build_data.py` |

⚠️ **Never edit a file in `services/` by hand** — it is generated and will be overwritten.
⚠️ **Re-run `build/build_data.py` after any change in `data/`** — the site reads JS mirrors of
those JSON files so it can run with no server.

## Structure

```
index.html            the homepage
services/s1..s9.html  generated, one per legal service
css/style.css         all styles; design tokens at :root — never hardcode a colour
js/site.js            language engine · contact engine · nav · reveals
data/*.json           the only source of copy  →  data/*.js are generated mirrors
build/                the two generators
_guide/               ROADMAP · BUILD-PLAN (how and why it was built)
```

## Before this goes public

- [ ] **Disclaimer wording** — the contact form carries a bracketed placeholder for the firm's
      lawyers. A suggested draft sits unused in `data/i18n.json` under `c_disclaimer_suggested`.
- [ ] **English review** — the English edition is a translation, not text the firm supplied.
      Legal terminology needs their sign-off.
- [ ] **Contact details** — phone, WhatsApp, address and map URL in `data/config.json`.
- [ ] **Mail route** — `formsubmit` by default; switch `mail.provider` to `supabase` for
      production so confidential intake stays in the firm's own store.
- [ ] **Client logos** — drop PNGs into `assets/clients/` and list them in `manifest.json`.

## Verified

No horizontal overflow and no text under 14px across 320px → 1920px, on the homepage and a
service page, in both languages. All tap targets clear 44px on touch devices.
