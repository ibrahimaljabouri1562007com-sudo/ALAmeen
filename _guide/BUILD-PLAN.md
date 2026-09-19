# BUILD PLAN — homepage rebuilt on the client's own words
Agreed 2026-09-18. Source of truth = `ELITE CV.docx` (the firm's own profile).
Rule: **every sentence about the firm comes from the docx.** Only section labels and the
historic timeline are ours, and they are marked 🔴 below.

## The docx blocks (our agreed names)
`الاسم` · `تعريف` · `رؤية` · `رسالة` · `الخدمات ال ٩` · `الخبرة` ·
`شركات مثلها المكتب قانونيا` · `شركات قدم المكتب خدمات لها` · `النص البنفسجي` (3 paragraphs)

## The homepage sections (our agreed names), final order
| # | Section | id | Source block | Status |
|---|---|---|---|---|
| 1 | the bar | `nav` | الاسم | menu relabelled |
| 2 | homepic | `top` | النص البنفسجي ¶3 | new headline + lead |
| 3 | **proof** | `proof` | الخبرة + both company blocks | 🆕 NEW — takes the cuneiform band's slot |
| 4 | Alameen | `amin` | تعريف + النص البنفسجي ¶1 | all invented copy replaced |
| 5 | أعمدة عملنا | `pillars` | النص البنفسجي ¶2 | becomes 3 literal columns |
| 6 | **الخدمات** | `services` | الخدمات ال ٩ | 🆕 NEW — 9-line index, clickable |
| 7 | historic timeline | `line` | 🔴 ours | heading moved in, 4th stop deleted |
| 8 | **رؤية ورسالة** | `vision` | رؤية + رسالة | 🆕 NEW — on ink, quoted whole |
| 9 | Contact | `consult` | — | unchanged, pending real details |
| 10 | the footer | `foot` | الاسم | unchanged |

**`steps` / `.process` is DELETED** — its three words (الدقة·السرعة·السرية) move into
`أعمدة عملنا`, because 3 load-bearing words ARE pillars and 9 service cards were a grid.

## Steps
1. **CSS** — add `.proof`, `.services`, `.vision`; rework `.pillars` into 3 large columns;
   keep `.process` rules out. Tokens only, no new hex.
2. **HTML** — rewrite sections 2–8 with the exact text from the spec (see ROADMAP/chat).
   Absorb the standalone `.frieze` + `.meander` into `.proof` as its frame.
3. **Links** — the 9 service names link to `services.html#s1…#s9` (page built later; these
   404 until then — deliberate, agreed).
4. **Logos** — client logo files NOT supplied yet. Interim = typographic name wall (Latin
   display serif on ink). Socket left so files drop in without layout change.
5. **Verify (ASVL)** — run it, screenshot every section, console clean, mobile 375px.

## Spelling
Their file has hamza/tanween slips (`سابعآ`, `لاكثر`, `الافراد`, `حاصلين`). We publish the
**corrected** spelling — meaning untouched. Ibrahim was told; reversible on request.

## Gates still open (do NOT ship without)
- ✅ approved by Ibrahim: naming the 5 companies (they are real clients; ICCMC precedent).
- ⛔ **الاسم** — docx says «الخدمات القانونية», logo says «الاستشارات القانونية». Unresolved.
- ⛔ Real phone / email / address for `Contact` and the footer.
- ⛔ Client logo image files.


---

# ADDENDUM — services pages (2026-09-18)

**Generated, not hand-written.** `data/services.json` is the only copy source (37 items, verbatim
from the docx). `build/build_services.py` renders `/services/index.html` + `s1…s9.html`.
⚠️ Editing a generated `.html` by hand will be lost on the next run — edit the JSON and re-run.

**Per-page anatomy**
1. shared bar (always `.solid` — there is no transparent hero to sit over)
2. breadcrumb: الرئيسية / الخدمات القانونية / <service>
3. quiet ink header band with the cuneiform texture — deliberately NOT a second photo hero
4. the service's items, numbered, on marble
5. inline CTA «هل تخصُّك هذه الخدمة؟» → homepage `#consult`
6. the other 8 services (lateral movement without going back to the index)
7. RTL pager: «السابقة» sits RIGHT and points right, «التالية» sits LEFT and points left

**Homepage** now links `services/s1.html` … `s9.html` (was `services.html#sN`).


---

# ADDENDUM 2 — name · contact engine · bilingual · device pass (2026-09-18)

## الاسم — DECIDED
**«الأمين للمحاماة والاستشارات القانونية»** (the LOGO's wording), everywhere. The docx's
«الخدمات القانونية» is no longer used. Gate closed.

## Contact engine — `js/site.js` + `data/config.json`
`data/config.json` is the ONLY place contact details and the mail route live. Nothing else
hardcodes an email, a phone or an endpoint; the contact lines are filled from it at render
and **re-filled on every language switch**.
Providers: `formsubmit` (default, zero signup — submit once, click the confirm link that
arrives at contact.email) · `web3forms` (paste key) · `supabase` (the private route — use
this for production, confidential intake never leaves the firm's own store) · `mailto`.
Verified live: refuses an empty name and a missing phone · posts the right payload to the
right endpoint · shows sending/sent/failed · clears the form on success.

## Bilingual — Arabic first, EN toggle
Classification per the `bilingual` skill:
- **CHROME** → `data/i18n.json` (90 keys), both languages.
- **The firm's own copy** → also in the dictionary / `services.json` (`title_en`, `items_en`).
  ⚠️ **The English is Claude's translation of their Arabic profile, NOT text the firm supplied.
  It needs the firm's sign-off before the site is public.**
- **CONTROLLED VOCABULARY** → the consultation `<select>`: the LABEL translates, the
  `value` stays canonical (`s1…s9`, `other`). That value is what gets emailed, so translating
  it would translate the data. Verified: payload carried `topic:"s1"` with English labels shown.
- **FREE TEXT** → client company names, the email address. Never translated.
- Typography is scoped by language: `letter-spacing` / `uppercase` / the Latin display face are
  removed under `:root[lang="ar"]` (spacing breaks Arabic letter joins); the Arabic display face
  is swapped for the serif under `:root[lang="en"]`. Numerals stay tabular in both.
- Choice persists in `localStorage` under `alamin.lang`.
- **Standing rule, run in BOTH directions and passing:** no Arabic left in the English pass;
  the only Latin left in the Arabic pass is the email address (correct — free text).

## Device pass
No horizontal overflow at 375px on the homepage or a service page. Nothing readable under
14px. Touch targets ≥44px under `pointer:coarse`. Hero scrim re-centred for narrow screens,
pillars/creds/vision all collapse to one column, the fold-out menu scrolls.

## Service-page changes Ibrahim asked for
CTA block removed · the empty pager cell removed (a one-sided pager now fills the row) ·
breadcrumb enlarged with gold underlined back-links · item numbers 22–30px · item text 18–22px.
Siblings are now **pills** (all 8, the exhaustive self-maintaining pattern) + an
"all services" link; the named prev/next stays as a supplement below them.

## Research applied (verified against lw.com · Clifford Chance · Freshfields · Baker McKenzie · AlGhazzawi)
- breadcrumb IS the back affordance, placed top — matches what we built.
- header band: flat colour, short, NO photo behind the title — matches.
- `/` separator is direction-neutral, so no RTL flipping needed — matches.
- siblings as an exhaustive pill block — ADOPTED (was a plain list).
- **no elite firm uses prev/next** on practice pages; kept only in the named form the research
  permits, as a supplement, never as the primary route.
- back-to-top control — ADOPTED.
- NOT adopted (no client material exists for them): a second-person promise line per service,
  named matters/outcomes, people with photos, insights.

## Gates still open
- ⛔ **English sign-off** from the firm on every translated string.
- ⛔ Real phone (and address) → `data/config.json`.
- ⛔ Confirm the FormSubmit destination, or switch `mail.provider` to `supabase`.
- ⛔ Client logo files → `assets/clients/` + list them in `manifest.json`.


---

# ADDENDUM 3 — English audit & the no-server fix (2026-09-18)

## Root cause of "the English is not working"
The site fetched its dictionary, services and config as **JSON over `fetch()`**. Chrome blocks
`fetch()` for `file://`, so **opening index.html by double-clicking left the page with no
translations, an empty services list and blank contact details** — the toggle did nothing.

**Fix:** `build/build_data.py` mirrors every `data/*.json` (plus the logo manifest) into a
`.js` file that sets a global (`window.I18N`, `window.SERVICES`, `window.CFG`,
`window.CLIENT_LOGOS`), loaded with `<script>` before `js/site.js`. The JSON files remain the
editable source; `fetch` stays only as a fallback inside the JS.
**Verified: 0 JSON requests on a load, all 4 globals present. The site runs from a bare folder.**
⚠️ Re-run `python build/build_data.py` after editing ANY file in `data/`.

## Bugs found by looking at the English page and fixed
1. **`.record li` used a PHYSICAL shorthand** (`padding:16px 26px 16px 0`) while its marker used
   a logical one — so in LTR the gold diamond sat **on top of the first letter** of every line.
   → `padding-inline:26px 0`. (Full stylesheet audit: this was the ONLY physical rule.)
2. **The timeline gradient ran gold→lapis physically**, so it pointed the wrong way in LTR.
   → a `:root[lang="en"]` override reverses it, keeping gold at 1754 in both directions.
3. **Footer links wrapped mid-phrase** in English → `flex-wrap` + `white-space:nowrap` per link.
4. **The form's status message kept its old language** after a switch. → `say()` now stores the
   KEY on the node and retranslates on `langchange`, instead of storing the words.
5. **Eyebrows fell to 13px on phones** → 14px floor (15px in Arabic).

## Verification actually run
- **Every one of the 11 pages audited by code**: all load the globals, all carry the toggle,
  **0 missing dictionary keys, 0 keys without an English value, 0 broken internal links.**
- **Two-direction language scan, passing**: no Arabic left in the English pass; the only Latin
  left in the Arabic pass is the email address (correct — free text).
- **Contact engine in English**: posts `topic:"s1"` (canonical) with `lang:"en"`, English
  status message, and the message retranslates when the language flips.
- **Seen with my own eyes in English**: hero · Alameen · pillars · services · timeline ·
  mission · contact · footer · service page · siblings + pager · phone at 375px.
- No horizontal overflow at 375px in either language.


---

# ADDENDUM 4 — services index retired · numbering swapped (2026-09-19)

## `/services/index.html` DELETED
Ibrahim spotted that the homepage already lists all nine services as links, so a separate
index page showed the same nine names twice — no navigational value, and duplicate content
counts against the site in search. The page is gone and the generator no longer emits it.
Everything that pointed at it now points at the homepage section `index.html#services`:
the service-page breadcrumb, the service-page nav item, and the homepage nav item.
The redundant «كل الخدمات القانونية» link is removed from the homepage AND the service pages
(the sibling pills already list every other service, which is the real lateral route).

## Numbering — the two markers SWAPPED
| Where | Was | Now |
|---|---|---|
| the nine services (homepage list) | Roman I…IX | **digits 1…9** |
| a service's own label | «خدمة V» | **«خدمة 5»** |
| the sub-points inside a service page | 01…09 | **Roman I…VI** |

⚠️ **Why this was a real bug, not taste:** in the serif display face the Roman **V** reads as
a **7** at list size — visible in Ibrahim's screenshot, where service five looked like item 7.
Digits at the top level remove the ambiguity; Roman survives inside a service because the
counts are small (max 6) and it visually subordinates the sub-point to its parent.

Marker styling follows the glyph: digits are `tabular-nums` with no letter-spacing (so 1 and 9
occupy the same width); Roman keeps letter-spacing and drops tabular.


---

# ADDENDUM 5 — the service-page footer simplified (2026-09-19)

Ibrahim: "other services, then next service and previous service — it seems a mess."
He is right, and he independently reached the conclusion the research had already reported.

**Three overlapping things were stacked at the bottom of every service page:**
an eyebrow «خدماتٌ أخرى» · an h2 «خدماتٌ أخرى يقدّمها المكتب» that repeated it ·
eight pills · and a prev/next pager naming two services **that were already in those pills**.
The same service name appeared twice on one screen.

**Now: one heading + the pills. Nothing else.**
- ❌ prev/next pager — DELETED (markup + all CSS). The verified research found **zero of five
  elite firms** using pagination on a practice page; the pills already reach every sibling.
- ❌ the duplicate eyebrow — DELETED.
- ✅ one `.siblings-h` heading, sized as a nav block rather than a content section.
- The block is now a navigation footer, not a third content section: lighter padding,
  smaller heading, 417px tall instead of the previous stack.

**Standing rule this leaves:** a service page has exactly ONE lateral route (the pills) and
ONE way back (the breadcrumb). If a third is ever proposed, it is redundancy, not helpfulness.


---

# ADDENDUM 6 — contact rebuilt to the researched standard (2026-09-19)

Research: 13 elite + regional firms read live (Latham, Clifford Chance, Freshfields, Baker
McKenzie, Skadden, A&O Shearman, Hogan Lovells, DLA Piper, Hadef Dubai, + 4 Baghdad firms).

**Details FIRST, form second** — 4 channel cards under gold rules (WhatsApp · phones · email ·
office) on the ink ground, then the form. WhatsApp leads because it is the verified live
Baghdad pattern; no global firm does it.

**Form: 4 fields → 6.** name* · **email*** · phone* · company (optional) · topic · message*.
The missing email field was the biggest gap — every firm with a form asks for it.
Dropdown grew to 12: the 9 services + **Careers + Media** (triage, so they never reach the partners).

**Deliberately NOT built** (each verified absent across all 13 sites): file upload ·
RFP/"propose a matter" flow · marketing-consent checkbox · mandatory disclaimer tick · fax row.

**Empty rows hide themselves.** Previously a blank phone printed «يُضاف قريبًا» on the live page —
a firm advertising that it has no phone number. Now any channel with no value in `config.json`
removes its own card.

## ⛔ THE DISCLAIMER IS A PLACEHOLDER — FOR THE LAWYERS TO WRITE
The live text is a **bracketed** note, styled with a **dashed border** so it can never be
mistaken for finished copy:
> `[ تُوضع هنا تنبيهاتُ الخصوصية، أو أيّ أمورٍ مهمّةٍ تتعلّقُ بالعلاقةِ مع الزبون، يحدّدُها الفريقُ القانونيُّ للمكتب، هنا أو في مكانٍ آخر يختارُه المحامون ]`

**The researched wording is PRESERVED, unused, in `data/i18n.json` under `c_disclaimer_suggested`.**
It is the Latham / Hogan Lovells formula (they use near-identical text) plus A&O Shearman's
instruction and Skadden's security point. Offer it to the firm as a starting draft:
> "Please do not send confidential information through this form. If your enquiry concerns a
> legal matter and you are not already a client of the firm, we must first determine whether we
> are able to assist you and agree the terms of engagement with you. Until those steps are
> complete no lawyer-client relationship exists between us, and we are under no duty to keep
> confidential the information you send."

To adopt it: copy `c_disclaimer_suggested` over `c_disclaimer`, re-run `build_data.py`.

## Asset cache-busting (fixed a real debugging cost)
Every `css`/`js` link now carries `?v=<md5 of the file>`. Stale cached scripts had twice made
correct fixes look broken. Stamps refresh on every `build_services.py` run; the homepage is
re-stamped by the same hash helper.

## Still needed from the firm
whatsapp (digits + country code, no `+`) · phone · phone2 · address · maps URL → `data/config.json`.
Plus their own disclaimer wording.
