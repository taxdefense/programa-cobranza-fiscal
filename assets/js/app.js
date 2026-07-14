/* ============================================================
   JS compartido — maqueta Programa de Acompañamiento en Cobranza Fiscal
   Analítica SIMULADA: los eventos se acumulan en window.dataLayer y se
   registran en consola. En producción, conectar GTM/GA4 y eliminar el log.
   ============================================================ */
(function () {
  'use strict';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Analítica simulada ---------- */
  window.dataLayer = window.dataLayer || [];
  function track(event, params) {
    var payload = Object.assign({ event: event, page: location.pathname.split('/').pop() || 'index.html', ts: new Date().toISOString() }, params || {});
    window.dataLayer.push(payload);
    if (console && console.info) console.info('[analitica-simulada]', payload);
  }
  window.__track = track;
  track('page_view');

  /* Profundidad de scroll: 25 / 50 / 75 / 100 */
  var marks = [25, 50, 75, 100], fired = {};
  window.addEventListener('scroll', function () {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (max <= 0) return;
    var pct = (window.scrollY / max) * 100;
    marks.forEach(function (m) {
      if (pct >= m && !fired[m]) { fired[m] = true; track('scroll_depth', { depth: m }); }
    });
  }, { passive: true });

  /* Clics con data-evt (CTA, WhatsApp, precio, etc.) */
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-evt]');
    if (el) track(el.getAttribute('data-evt'), { label: (el.textContent || '').trim().slice(0, 60) });
  });

  /* Apertura de acordeones (FAQ / temario) */
  document.querySelectorAll('details.acc').forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) track('accordion_open', { q: (d.querySelector('summary').textContent || '').trim().slice(0, 80) });
    });
  });

  /* Videos placeholder: registra video_play y avisa que la pieza está pendiente.
     Al integrar los videos reales, reemplazar el alert por el reproductor y
     disparar video_complete al terminar la reproducción. */
  document.querySelectorAll('[data-video]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      track('video_play', { video: btn.getAttribute('data-video') });
      alert('MAQUETA: video "' + btn.getAttribute('data-video') + '" pendiente de producción. Aquí se abrirá el reproductor con subtítulos y transcripción.');
    });
  });

  /* ---------- Preservación de UTM entre páginas ---------- */
  try {
    var utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    var current = new URLSearchParams(location.search);
    var stored = JSON.parse(sessionStorage.getItem('utm') || '{}');
    utmKeys.forEach(function (k) { if (current.get(k)) stored[k] = current.get(k); });
    if (Object.keys(stored).length) {
      sessionStorage.setItem('utm', JSON.stringify(stored));
      document.querySelectorAll('a[href]').forEach(function (a) {
        var href = a.getAttribute('href');
        if (!href || /^(https?:|mailto:|tel:|#)/.test(href)) return; // solo enlaces internos relativos
        var url = new URL(href, location.href);
        utmKeys.forEach(function (k) { if (stored[k]) url.searchParams.set(k, stored[k]); });
        a.setAttribute('href', url.pathname.split('/').pop() + url.search + url.hash);
      });
    }
  } catch (e) { /* sessionStorage no disponible: continuar sin UTM */ }

  /* ---------- Menú móvil ---------- */
  var toggle = document.getElementById('menuToggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = document.body.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', open);
    });
    document.querySelectorAll('.nav a').forEach(function (a) {
      a.addEventListener('click', function () {
        document.body.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Reveal en scroll ---------- */
  if (!reduced && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('revealed'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    document.querySelectorAll('[data-reveal]').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('[data-reveal]').forEach(function (el) { el.classList.add('revealed'); });
  }

  /* ---------- Año en footer ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Validación de formularios de la maqueta ---------- */
  window.__validateForm = function (form) {
    var ok = true;
    form.querySelectorAll('.field').forEach(function (f) {
      var input = f.querySelector('input, select, textarea');
      if (!input || !input.hasAttribute('required')) return;
      var valid = input.value.trim() !== '' && input.checkValidity();
      f.classList.toggle('has-error', !valid);
      if (!valid) ok = false;
    });
    form.querySelectorAll('.check-row input[required]').forEach(function (c) {
      if (!c.checked) { ok = false; c.focus(); }
    });
    return ok;
  };
})();
