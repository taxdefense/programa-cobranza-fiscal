/* ============================================================
   JS compartido — maqueta Programa de Acompañamiento en Cobranza Fiscal
   Analítica SIMULADA: los eventos se acumulan en window.dataLayer y se
   registran en consola. En producción, conectar GTM/GA4 y eliminar el log.
   ============================================================ */
(function () {
  'use strict';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var CFG = window.SITE_CONFIG || {};

  /* ================================================================
     INTEGRACIONES ENCHUFABLES (se activan al llenar assets/js/config.js)
     ================================================================ */

  /* Consentimiento de cookies: los trackers (GTM / Meta Pixel) solo se
     cargan si el visitante acepta. Cumple estándar de protección de datos. */
  function cargarTrackers() {
    if (CFG.GTM_ID) {
      var g = document.createElement('script');
      g.async = true;
      g.src = 'https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(CFG.GTM_ID);
      window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      document.head.appendChild(g);
    }
    if (CFG.META_PIXEL_ID) {
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
      document,'script','https://connect.facebook.net/en_US/fbevents.js');
      window.fbq('init', CFG.META_PIXEL_ID);
      window.fbq('track', 'PageView');
    }
  }

  var hayTrackers = !!(CFG.GTM_ID || CFG.META_PIXEL_ID);
  var consent = null;
  try { consent = localStorage.getItem('cookie-consent'); } catch (e) {}
  if (hayTrackers && consent === 'ok') cargarTrackers();
  if (hayTrackers && !consent) {
    document.addEventListener('DOMContentLoaded', function () {
      var bar = document.createElement('div');
      bar.className = 'cookie-bar visible';
      bar.setAttribute('role', 'dialog');
      bar.setAttribute('aria-label', 'Consentimiento de cookies');
      bar.innerHTML = '<span>Usamos cookies de medición para mejorar el sitio y nuestras campañas. ' +
        '<a href="legal.html#cookies">Más información</a></span>' +
        '<button class="ck-ok" type="button">Aceptar</button>' +
        '<button class="ck-no" type="button">Rechazar</button>';
      document.body.appendChild(bar);
      bar.querySelector('.ck-ok').addEventListener('click', function () {
        try { localStorage.setItem('cookie-consent', 'ok'); } catch (e) {}
        bar.remove(); cargarTrackers();
      });
      bar.querySelector('.ck-no').addEventListener('click', function () {
        try { localStorage.setItem('cookie-consent', 'no'); } catch (e) {}
        bar.remove();
      });
    });
  }

  /* Chat conversacional con IA: se inyecta el widget configurado. */
  if (CFG.CHAT_WIDGET_SRC) {
    var chat = document.createElement('script');
    chat.async = true;
    chat.src = CFG.CHAT_WIDGET_SRC;
    document.head.appendChild(chat);
  }

  /* Botones de portal de tickets (Jira Service Management). */
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-jira-portal]').forEach(function (el) {
      if (CFG.JIRA_PORTAL_URL) {
        el.setAttribute('href', CFG.JIRA_PORTAL_URL);
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener');
      }
    });
  });

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

  /* Apertura de acordeones: faq_open para FAQ, accordion_open para el resto */
  var isFaqPage = /preguntas\.html$/.test(location.pathname);
  document.querySelectorAll('details.acc').forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (!d.open) return;
      var evt = (isFaqPage || d.closest('#faq')) ? 'faq_open' : 'accordion_open';
      track(evt, { q: (d.querySelector('summary').textContent || '').trim().slice(0, 80) });
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
