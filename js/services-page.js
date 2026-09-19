/* A service page's ITEMS live in services.js, not in the dictionary — swap them
   whenever the language changes. The page ships Arabic, so it is correct with JS off. */
(() => {
  const main = document.querySelector('main[data-svc]');
  if (!main) return;
  const UP = document.documentElement.dataset.up || '';
  const n  = parseInt(main.dataset.svcN, 10);

  Promise.resolve(window.SERVICES || []).then(list => {
    const s = list.find(x => x.n === n);
    if (!s) return;
    const draw = () => {
      const en = document.documentElement.lang === 'en';
      document.querySelectorAll('[data-svc-item]').forEach(el => {
        const i = +el.dataset.svcItem;
        const src = en ? (s.items_en || s.items) : s.items;
        if (src[i]) el.textContent = src[i];
      });
      document.querySelectorAll('[data-svc-title]').forEach(el => {
        el.textContent = en ? (s.title_en || s.title) : s.title;
      });
    };
    draw();
    document.addEventListener('langchange', draw);
  }).catch(() => {});
})();
