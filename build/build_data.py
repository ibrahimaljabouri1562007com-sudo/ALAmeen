# -*- coding: utf-8 -*-
"""Mirror data/*.json into data/*.js as plain globals.

WHY: the site used fetch() for its dictionary, its services and its config. fetch() is
blocked for file:// URLs, so double-clicking index.html left the page with no translations,
no services list and no contact details. Shipping the same data as <script> globals makes
every page work from a bare folder, with no server, and removes three round trips.

The .json files stay the editable source of truth. Re-run after editing any of them:
    python build/build_data.py
"""
import json, io, os, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
D    = os.path.join(ROOT, 'data')

PAIRS = [('i18n.json', 'i18n.js', 'I18N'),
         ('services.json', 'services.js', 'SERVICES'),
         ('config.json', 'config.js', 'CFG')]

HEAD = '/* GENERATED from %s by build/build_data.py — do not edit. */\n'

for src, dst, name in PAIRS:
    data = json.load(io.open(os.path.join(D, src), encoding='utf-8'))
    body = json.dumps(data, ensure_ascii=False, indent=2)
    io.open(os.path.join(D, dst), 'w', encoding='utf-8').write(
        (HEAD % src) + 'window.%s = %s;\n' % (name, body))
    n = len(data) if isinstance(data, (list, dict)) else 0
    print('  data/%-14s → window.%-9s (%d entries)' % (dst, name, n))

# the client-logo manifest is the last fetch on the page — mirror it too
M = os.path.join(ROOT, 'assets', 'clients')
logos = json.load(io.open(os.path.join(M, 'manifest.json'), encoding='utf-8'))
io.open(os.path.join(M, 'manifest.js'), 'w', encoding='utf-8').write(
    (HEAD % 'manifest.json') + 'window.CLIENT_LOGOS = ' + json.dumps(logos, ensure_ascii=False) + ';' + chr(10))
print('  assets/clients/manifest.js → window.CLIENT_LOGOS (%d logos)' % len(logos))
print('data mirrored to JS globals — the site now runs with no server')
