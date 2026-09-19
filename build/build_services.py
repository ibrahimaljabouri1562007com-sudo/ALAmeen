# -*- coding: utf-8 -*-
"""Generate /services/index.html + one page per service, BILINGUAL.

Copy comes only from data/services.json (verbatim Arabic from ELITE CV.docx + the English
edition) and data/i18n.json. Never edit a generated .html by hand — it is overwritten.
    python build/build_services.py
"""
import json, io, os, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SVC  = json.load(io.open(os.path.join(ROOT, 'data', 'services.json'), encoding='utf-8'))
I18N = json.load(io.open(os.path.join(ROOT, 'data', 'i18n.json'), encoding='utf-8'))
OUT  = os.path.join(ROOT, 'services')
os.makedirs(OUT, exist_ok=True)
ROMAN = ['I','II','III','IV','V','VI','VII','VIII','IX']
UP = '../'
ar = lambda k: I18N[k]['ar']

import hashlib
def _ver(rel):
    """hash-stamp css/js so a changed file is re-fetched and an unchanged one is not"""
    p = os.path.join(ROOT, rel)
    return hashlib.md5(io.open(p, 'rb').read()).hexdigest()[:8] if os.path.exists(p) else '0'
V_CSS = _ver('css/style.css'); V_SITE = _ver('js/site.js'); V_SVC = _ver('js/services-page.js')
V_I18N = _ver('data/i18n.js'); V_DATA = _ver('data/services.js'); V_CFG = _ver('data/config.js')

def head(title_ar):
    return f'''<!doctype html>
<html lang="ar" dir="rtl" data-up="{UP}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title_ar} — {ar('firm_name')}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600&family=IBM+Plex+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{UP}css/style.css?v={V_CSS}">
</head>
<body>

<header class="nav solid" id="nav">
  <a class="brand" href="{UP}index.html" data-i18n-aria="firm_name" aria-label="{ar('firm_name')}">
    <img class="brand-icon" src="{UP}assets/logo-icon-dark.png" alt="">
    <img class="brand-word" src="{UP}assets/logo-word-dark.png" data-i18n-alt="firm_name" alt="{ar('firm_name')}">
  </a>
  <nav class="menu" id="menu">
    <ul>
      <li><a href="{UP}index.html#amin" data-i18n="nav_about">{ar('nav_about')}</a></li>
      <li><a href="{UP}index.html#services" data-i18n="nav_services">{ar('nav_services')}</a></li>
      <li><a href="{UP}index.html#line" data-i18n="nav_line">{ar('nav_line')}</a></li>
      <li><a href="{UP}index.html#consult" data-i18n="nav_contact">{ar('nav_contact')}</a></li>
    </ul>
  </nav>
  <div class="nav-tools">
    <a class="lang" id="langToggle" href="#" lang="en" aria-label="English">EN</a>
    <button class="burger" id="burger" data-i18n-aria="nav_menu" aria-label="{ar('nav_menu')}" aria-expanded="false"><span></span><span></span></button>
  </div>
</header>'''

FOOT = f'''<footer class="foot">
  <div class="wrap foot-grid">
    <img class="foot-logo" src="{UP}assets/logo-full-light.png" data-i18n-alt="firm_name" alt="{ar('firm_name')}">
    <ul class="foot-links">
      <li><a href="{UP}index.html" data-i18n="nav_home">{ar('nav_home')}</a></li>
      <li><a href="{UP}index.html#amin" data-i18n="nav_about">{ar('nav_about')}</a></li>
      <li><a href="{UP}index.html#services" data-i18n="nav_services">{ar('nav_services')}</a></li>
      <li><a href="{UP}index.html#consult" data-i18n="nav_contact">{ar('nav_contact')}</a></li>
    </ul>
    <p class="foot-copy">© <span id="yr"></span> <span data-i18n="firm_full">{ar('firm_full')}</span> <span class="dot" aria-hidden="true">·</span> <span data-i18n="foot_rights">{ar('foot_rights')}</span></p>
  </div>
  <div class="meander" aria-hidden="true"></div>
</footer>

<a class="to-top" id="toTop" href="#" data-i18n-aria="to_top" aria-label="{ar('to_top')}"><span aria-hidden="true"></span></a>

<script src="{UP}data/i18n.js?v={V_I18N}"></script>
<script src="{UP}data/services.js?v={V_DATA}"></script>
<script src="{UP}data/config.js?v={V_CFG}"></script>
<script src="{UP}js/site.js?v={V_SITE}"></script>
<script src="{UP}js/services-page.js?v={V_SVC}"></script>
</body>
</html>
'''

def crumbs(current_ar, current_key=None):
    """Separator is '/' — direction-neutral, so it never needs flipping in LTR."""
    cur = (f'<span aria-current="page" data-i18n="{current_key}">{current_ar}</span>'
           if current_key else f'<span aria-current="page" data-svc-title>{current_ar}</span>')
    return f'''<nav class="crumbs" data-i18n-aria="svc_crumb" aria-label="{ar('svc_crumb')}">
      <a class="crumb-back" href="{UP}index.html" data-i18n="nav_home">{ar('nav_home')}</a>
      <span class="sep" aria-hidden="true">/</span>
      <a class="crumb-back" href="{UP}index.html#services" data-i18n="svc_eyebrow">{ar('svc_eyebrow')}</a>
      <span class="sep" aria-hidden="true">/</span>
      {cur}
    </nav>'''

# ──────────────────────────── one page per service ────────────────────────────
for i, s in enumerate(SVC):
    items = '\n'.join(
        f'      <li class="io"><span class="num" lang="en">{ROMAN[n-1]}</span>'
        f'<p data-svc-item="{n-1}">{txt}</p></li>'
        for n, txt in enumerate(s['items'], 1))

    pills = '\n'.join(
        f'        <li><a href="{o["slug"]}.html" data-i18n="svc_{o["n"]}">{o["title"]}</a></li>'
        for o in SVC if o['slug'] != s['slug'])

    html = f'''{head(s['title'])}

<main data-svc="{s['slug']}" data-svc-n="{s['n']}">
<section class="svc-head">
  <div class="wrap">
    {crumbs(s['title'], 'svc_%d' % s['n'])}
    <p class="eyebrow"><span data-i18n="svc_word">{ar('svc_word')}</span> <span lang="en">{s['n']}</span></p>
    <h1 data-i18n="svc_{s['n']}">{s['title']}</h1>
  </div>
</section>
<div class="meander" aria-hidden="true"></div>

<section class="section svc-body">
  <div class="wrap">
    <ol class="svc-items">
{items}
    </ol>
  </div>
</section>

<section class="section siblings-sec">
  <div class="wrap">
    <h2 class="siblings-h io" data-i18n="svc_more_h2">{ar('svc_more_h2')}</h2>
    <ul class="pills io">
{pills}
    </ul>
  </div>
</section>
</main>

{FOOT}'''
    io.open(os.path.join(OUT, s['slug'] + '.html'), 'w', encoding='utf-8').write(html)

print('generated %d service pages' % len(SVC))
for s in SVC:
    print('  %s.html  %-50s %2d items' % (s['slug'], s['title'], len(s['items'])))
