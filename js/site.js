/* =====================================================================
   AL-AMIN — one script for every page.
   Language engine · contact engine · nav · reveals · back-to-top.
   Copy lives in data/i18n.js and data/services.js — never in here.
   ===================================================================== */
(() => {
  'use strict';

  const ROOT = document.documentElement;
  const UP   = ROOT.dataset.up || '';          // '' at site root, '../' inside /services
  const KEY  = 'alamin.lang';                  // shared across the site

  let DICT = {};
  let LANG = 'ar';

  /* ---------- the dictionary ---------- */
  const t = k => {
    const row = DICT[k];
    if (!row) return '';
    return row[LANG] != null ? row[LANG] : (row.ar || '');
  };

  /* ---------- apply a language to the whole document ---------- */
  function apply(lang) {
    LANG = (lang === 'en') ? 'en' : 'ar';
    ROOT.lang = LANG;
    ROOT.dir  = (LANG === 'en') ? 'ltr' : 'rtl';
    try { localStorage.setItem(KEY, LANG); } catch (e) {}

    // text nodes
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const v = t(el.dataset.i18n);
      if (v) el.textContent = v;
    });
    // attributes
    [['data-i18n-ph', 'placeholder'], ['data-i18n-title', 'title'],
     ['data-i18n-alt', 'alt'], ['data-i18n-aria', 'aria-label']].forEach(([d, a]) => {
      document.querySelectorAll('[' + d + ']').forEach(el => {
        const v = t(el.getAttribute(d));
        if (v) el.setAttribute(a, v);
      });
    });
    // CONTROLLED VOCABULARY: the label follows the language, the VALUE never moves —
    // the value is what gets emailed, so translating it would translate the data.
    document.querySelectorAll('option[data-i18n-opt]').forEach(o => {
      const v = t(o.dataset.i18nOpt);
      if (v) o.textContent = v;                       // o.value untouched, always canonical
    });
    // page title + meta description follow the language
    const fn = t('firm_name');
    const h1 = document.querySelector('h1[data-i18n]');
    document.title = h1 ? (t(h1.dataset.i18n) + ' — ' + fn) : fn;
    const md = document.querySelector('meta[name=description]');
    if (md && DICT.meta_home) md.setAttribute('content', t('meta_home'));

    // the toggle always names the OTHER language
    const tg = document.getElementById('langToggle');
    if (tg) { tg.textContent = t('lang_other'); tg.lang = (LANG === 'ar') ? 'en' : 'ar'; }

    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: LANG } }));
  }

  /* ---------- boot ----------
     data/*.js set these globals via <script>, so the site works from a bare folder
     with no server — no fetch, which file:// would block anyway. */
  const start = d => {
    DICT = d || {};
    let saved = 'ar';
    try { saved = localStorage.getItem(KEY) || 'ar'; } catch (e) {}
    apply(saved);
    ROOT.classList.add('i18n-ready');
  };
  start(window.I18N);   // data/i18n.js sets this before we run

  const toggle = document.getElementById('langToggle');
  if (toggle) toggle.addEventListener('click', e => {
    e.preventDefault();
    apply(LANG === 'ar' ? 'en' : 'ar');
  });

  /* ---------- nav ---------- */
  const nav = document.getElementById('nav');
  if (nav && nav.dataset.overHero === 'true') {
    addEventListener('scroll', () => nav.classList.toggle('solid', scrollY > 80), { passive: true });
  }
  const burger = document.getElementById('burger');
  if (burger) {
    burger.addEventListener('click', () => {
      const open = document.body.classList.toggle('menu-open');
      burger.setAttribute('aria-expanded', open);
    });
    document.querySelectorAll('#menu a').forEach(a =>
      a.addEventListener('click', () => document.body.classList.remove('menu-open')));
  }

  /* ---------- reveals ---------- */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: .08, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.io').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.io').forEach(el => el.classList.add('in'));
  }

  /* ---------- back to top ---------- */
  const top = document.getElementById('toTop');
  if (top) {
    addEventListener('scroll', () => top.classList.toggle('show', scrollY > 700), { passive: true });
    top.addEventListener('click', e => { e.preventDefault(); scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  /* ---------- client logos (manifest-driven; no 404s when none exist) ---------- */
  const slots = document.querySelectorAll('.proof .name[data-logo]');
  if (slots.length) {
    // A logo replaces its set name only once the file has actually decoded. The old
    // code emptied the slot first, so a missing or slow file left a blank gap where a
    // client's name had been — the one place on this page that must never look broken.
    Promise.resolve(window.CLIENT_LOGOS || [])
      .then(list => slots.forEach(slot => {
        const src = slot.dataset.logo;
        // entries are {f, ar} since the build measures them; plain strings still work
        const entry = list.find(x => src.endsWith(typeof x === 'string' ? x : x.f));
        if (!entry || (typeof entry === 'object' && !entry.ar)) return;  // absent: keep the name
        const mark = slot.querySelector('.mark');
        const img  = new Image();
        img.className = 'logo-in';
        // the logo replaces a NAME, so its alt must carry that name in the language
        // being read — otherwise an English page announces Arabic to a screen reader
        const nameAr = slot.querySelector('.ar')?.textContent || '';
        // the caption carries the company's full English name; .en inside the mark is
        // only the short wordmark shown when no logo exists
        const nameEn = slot.querySelector('.cap-en')?.textContent
                    || slot.querySelector('.en')?.textContent || '';
        const setAlt = () => { img.alt = (LANG === 'en' ? (nameEn || nameAr) : (nameAr || nameEn)); };
        setAlt();
        document.addEventListener('langchange', setAlt);
        img.src = UP + src + (entry.v ? '?v=' + entry.v : '');   // content-stamped, like css/js
        const show = () => {
          mark.replaceChildren(img);
          // a ground only where the artwork cannot be read without one
          if (entry.tile) mark.classList.add('has-logo');
          slot.classList.add('has-mark');   // the caption names the logo, so it waits for one
          requestAnimationFrame(() => img.classList.add('in'));
        };
        (img.decode ? img.decode() : Promise.resolve()).then(show).catch(() => {
          if (img.complete && img.naturalWidth) show();          // decode() unsupported
        });
      }))
      .catch(() => {});
  }

  /* =====================================================================
     CONTACT ENGINE — one form, swappable mail route, honest states.
     The route is chosen in data/config.js; nothing is hardcoded here.
     ===================================================================== */
  const form = document.getElementById('consultForm');
  const cfgReady = Promise.resolve(window.CFG || {});
  if (form) cfgReady.then(cfg => {
    const note = document.getElementById('formNote');
    const btn  = form.querySelector('button[type=submit]');
    const mail = cfg.mail || {};
    const to   = (cfg.contact && cfg.contact.email) || '';

    // contact details live in ONE place (config) — and must FOLLOW the language,
    // so this runs again on every switch, not once at load.
    const dig = path => { let v = cfg; path.split('.').forEach(k => { v = (v || {})[k]; }); return v; };
    const val = v => (v && typeof v === 'object') ? (v[LANG] || v.ar || '') : (v || '');

    // Contact details live in ONE place (config) and FOLLOW the language.
    // Anything with no value in config hides its own row — no "coming soon" placeholders.
    const fillCfg = () => {
      document.querySelectorAll('[data-cfg]').forEach(el => {
        const v = val(dig(el.dataset.cfg));
        const holder = el.closest('.ch') || el;
        if (v) {
          if (el.dataset.cfgAs === 'href') { el.setAttribute('href', el.dataset.cfgHref + v); }
          else {
            el.textContent = v;
            if (el.dataset.cfgHref) el.setAttribute('href', el.dataset.cfgHref + v);
          }
          el.hidden = false;
        } else {
          el.hidden = true;
          if (el.tagName === 'A') el.removeAttribute('href');
        }
      });
      // a value shown next to a href-only anchor (the WhatsApp number)
      document.querySelectorAll('[data-cfg-show]').forEach(el => {
        const v = val(dig(el.dataset.cfgShow)); el.textContent = v ? '+' + v : ''; el.hidden = !v;
      });
      // a link whose href comes from config but whose TEXT is a dictionary string (the map link)
      document.querySelectorAll('[data-cfg-href-only]').forEach(el => {
        const v = val(dig(el.dataset.cfgHrefOnly));
        if (v) { el.setAttribute('href', v); el.hidden = false; }
        else { el.removeAttribute('href'); el.hidden = true; }
      });
      // a whole channel card with nothing left in it disappears
      document.querySelectorAll('.ch').forEach(card => {
        const alive = [...card.querySelectorAll('.ch-v, .ch-map')].some(e => !e.hidden && e.textContent.trim());
        card.classList.toggle('empty', !alive);
      });
    };
    fillCfg();
    document.addEventListener('langchange', fillCfg);

    // remember WHICH message is showing, not the words — so it retranslates on a switch
    // the message box starts at two lines and grows with what is typed, up to a ceiling
    const box = form.querySelector('textarea');
    const GROW_MAX = 320;
    const grow = () => {
      if (!box) return;
      box.style.height = 'auto';
      const h = Math.min(box.scrollHeight, GROW_MAX);
      box.style.height = h + 'px';
      box.style.overflowY = box.scrollHeight > GROW_MAX ? 'auto' : 'hidden';
    };
    if (box) {
      box.addEventListener('input', grow);
      grow();
      document.addEventListener('langchange', () => setTimeout(grow, 50));  // direction flip reflows
    }

    const say = (key, kind) => {
      note.dataset.key = key;
      note.textContent = t(key);
      note.className = 'form-note ' + kind;
      note.hidden = false;
    };

    async function send(payload) {
      const p = mail.provider;
      if (p === 'formsubmit') {
        if (!to) throw new Error('no destination email');
        const r = await fetch('https://formsubmit.co/ajax/' + encodeURIComponent(to), {
          method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            ...payload,
            _subject:  (mail.subject || {})[LANG] || 'Website request',
            _template: 'table',        // a readable table, not one run-on line
            _replyto:  payload.email   // Reply in the inbox answers the client directly
          })
        });
        if (!r.ok) throw new Error('formsubmit ' + r.status);
        // FormSubmit answers 200 even when it did NOT send — an unactivated
        // destination, a rate limit. The truth is in the body, not the status
        // code, and a false "we received it" is the worst failure this form has.
        const j = await r.json().catch(() => ({}));
        if (String(j.success) !== 'true') throw new Error('formsubmit: ' + (j.message || 'not sent'));
        return;
      }
      if (p === 'web3forms') {
        const r = await fetch('https://api.web3forms.com/submit', {
          method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ access_key: mail.key, ...payload })
        });
        if (!r.ok) throw new Error('web3forms ' + r.status);
        const j = await r.json().catch(() => ({}));       // same trap as formsubmit
        if (j.success === false) throw new Error('web3forms: ' + (j.message || 'not sent'));
        return;
      }
      if (p === 'supabase') {
        const s = mail.supabase || {};
        const r = await fetch(s.url + '/rest/v1/' + s.table, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', apikey: s.anonKey,
                     Authorization: 'Bearer ' + s.anonKey, Prefer: 'return=minimal' },
          body: JSON.stringify(payload)
        });
        if (!r.ok) throw new Error('supabase ' + r.status);
        return;
      }
      // mailto — always available, never silently fails
      const body = Object.entries(payload).map(([k, v]) => k + ': ' + v).join('\n');
      location.href = 'mailto:' + to + '?subject=' +
        encodeURIComponent((mail.subject || {})[LANG] || '') + '&body=' + encodeURIComponent(body);
    }

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const f = new FormData(form);
      const name  = (f.get('name')  || '').toString().trim();
      const email = (f.get('email') || '').toString().trim();
      const phone = (f.get('phone') || '').toString().trim();
      if (!name)  { say('c_need_name', 'bad');  form.name.focus();  return; }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { say('c_need_email', 'bad'); form.email.focus(); return; }
      if (!phone) { say('c_need_phone', 'bad'); form.phone.focus(); return; }

      btn.disabled = true;
      say('c_sending', '');
      try {
        await send({
          name,
          email,
          phone,
          company: (f.get('company') || '').toString(),
          message: (f.get('message') || '').toString(),
          lang: LANG
        });
        form.reset();
        grow();                      // reset() leaves the grown height behind
        say('c_sent', 'good');
      } catch (err) {
        say('c_failed', 'bad');
      } finally {
        btn.disabled = false;
      }
    });

    document.addEventListener('langchange', () => {
      if (note.dataset.key) note.textContent = t(note.dataset.key);
    });
  }).catch(() => {});

  /* ---------- year ---------- */
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
