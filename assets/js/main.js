/* Progressive enhancement: every page and link works without this file. */
(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#navigation');
  const mobile = window.matchMedia('(max-width: 600px)');
  if (toggle && nav) {
    document.documentElement.classList.add('has-menu');
    const setOpen = (open, restoreFocus = false) => {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Close −' : 'Menu +';
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('menu-open', open);
      if (restoreFocus) toggle.focus();
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    nav.addEventListener('click', e => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', e => {
      if (toggle.getAttribute('aria-expanded') !== 'true') return;
      if (e.key === 'Escape') setOpen(false, true);
      if (e.key === 'Tab') {
        const items = [toggle, ...nav.querySelectorAll('a')];
        const first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    mobile.addEventListener('change', () => setOpen(false));
  }
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  if ('IntersectionObserver' in window && !reduced.matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = Math.max(2026, new Date().getFullYear()); });
})();
