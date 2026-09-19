# الأمين للمحاماة والاستشارات القانونية
**Al-Amin Advocates & Legal Consultants — Baghdad, Iraq**

🌐 **https://ibrahimaljabouri1562007com-sudo.github.io/ALAmeen/**

A bilingual (Arabic-first, RTL) website for an Iraqi law firm. Static pages, no server,
no build step, no dependencies.

---

## What is in this repo

**Only what the live site needs to run.** 24 files: the pages, one stylesheet, two scripts,
three data files and the images.

The working set — content sources, the generators that build the service pages, and the
internal build notes — is deliberately **not** here. It is kept locally by the maintainer.

| | Here | Local only |
|---|---|---|
| Pages | `index.html`, `services/s1…s9.html` | — |
| Styles / scripts | `css/`, `js/` | — |
| Data the browser reads | `data/*.js` | the `data/*.json` sources they are built from |
| Images | the ones the pages use | originals and unused variants |
| Tooling | — | `build/` |
| Docs | this file | `_guide/`, `CLAUDE.md` |

**Consequence to understand:** a clone of this repo runs the site perfectly but cannot
regenerate it. Editing content means editing the local sources and re-running the local
generators, then committing the rebuilt output. Keep the local working set backed up.

## Run it

Open `index.html` — that is all. Or serve the folder:

```bash
python -m http.server 5757
```

## Structure

```
index.html            the homepage
services/s1..s9.html  one page per legal service
css/style.css         all styles; design tokens at :root
js/site.js            language engine · contact engine · nav · reveals
js/services-page.js   swaps service copy on language change
data/*.js             the dictionary, the services and the contact config
```

## Contact configuration

`data/config.js` holds the phone, WhatsApp, address, email and the mail route.

⚠️ **It is fetched by the browser, so everything in it is public.** Never put a secret key
there. `formsubmit` needs none; Supabase's anon key is safe by design because row-level
security guards it. A Web3Forms key would be readable by anyone.

## Before this goes public

- [ ] **Disclaimer wording** — the contact form carries a bracketed placeholder for the firm's lawyers
- [ ] **English review** — the English is a translation, not text the firm supplied
- [ ] **Contact details** — phone, WhatsApp, address, map URL
- [ ] **Client logos** — PNGs into `assets/clients/`, listed in the manifest

## Content provenance

Every sentence about the firm comes from the firm's own profile document. Section labels and
the historical timeline are the only editorial additions.

## Verified

No horizontal overflow and no text under 14px from 320px to 1920px, on the homepage and a
service page, in both languages. All tap targets clear 44px on touch devices.
