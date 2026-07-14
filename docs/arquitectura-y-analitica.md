# Entregable B — Arquitectura, flujo de conversión y analítica

## 1. Sitemap

```text
index.html ─────────── Landing de venta (17 secciones)
├── temario.html ───── Temario ampliado (10 módulos: objetivo/conceptos/resultado/recurso)
├── como-funciona.html  Modelo de acompañamiento (tickets, alcances, privacidad)
├── preguntas.html ──── FAQ completa (3 grupos: programa / acompañamiento / pagos)
├── inscripcion.html ── Checkout simulado (sin navegación distractora)
│   └── confirmacion.html  Onboarding post-pago (5 pasos de activación)
├── acceso.html ─────── Login placeholder (integración futura área de alumnos)
├── legal.html ──────── T&C, retracto, privacidad, cookies, advertencia
└── contacto.html ───── Soporte comercial pre-compra (form + WhatsApp)
```

## 2. Flujo de conversión principal

```text
Tráfico (ads/orgánico/email) → index.html
  → identifica problema (S2-S3) → entiende sistema (S4-S7)
  → valida confianza (autoridad, para-quién-no-es, política)
  → precio (S14) → inscripcion.html → confirmacion.html (onboarding)
Rutas de rescate: preguntas.html · contacto.html · WhatsApp comercial
```

Decisiones CRO aplicadas: un solo intento de venta por intención ("Quiero inscribirme" como única etiqueta del CTA primario en todo el sitio); checkout sin menú; barra CTA persistente solo móvil; formularios mínimos (4 campos + consentimientos); FAQ accesible desde cualquier punto; sección "para quién no es" como filtro de confianza.

## 3. Plan de eventos (implementado como simulación en `assets/js/app.js`)

| Evento | Disparador | Página |
|---|---|---|
| `page_view` | Carga de página | Todas |
| `scroll_depth` (25/50/75/100) | Scroll | Todas |
| `cta_click` | Click CTA primario | Todas |
| `cta_secundario` / `cta_temario` / `cta_faq` | CTAs secundarios | index |
| `precio_visto` | Click/tap en precio | index |
| `accordion_open` | Apertura FAQ/temario | index, temario, preguntas |
| `whatsapp_click` | Botón WhatsApp | contacto |
| `checkout_start` | Carga de inscripcion.html | inscripcion |
| `checkout_error` | Validación fallida | inscripcion |
| `purchase_simulada` | Submit válido | inscripcion |
| `form_enviado` | Form contacto | contacto |

Los eventos se acumulan en `window.dataLayer` (consola). En producción: conectar GTM → GA4 y mapear `purchase_simulada` → `purchase` con valor real. UTM: los 5 parámetros se preservan entre páginas vía sessionStorage (ya implementado).

## 4. Backlog de experimentos A/B (priorizado)

| # | Hipótesis | Variante | Métrica | Criterio |
|---|---|---|---|---|
| 1 | Titular transformacional > descriptivo | "Deja de enfrentar…" vs "Entiende la cobranza fiscal en 3 meses" | CTR a inscripción | +15% con n≥1.000 sesiones/variante |
| 2 | Precio visible en hero sube calidad del lead | Micro-línea de precio bajo CTA hero | Tasa checkout→compra | Sin caída de inicio de checkout |
| 3 | Video de Víctor en hero > tarjeta de componentes | Video 60s | Scroll 50% + CTR | +10% CTR |
| 4 | Orden: testimonios antes del precio | Mover S13 sobre S14 | Conversión total | Mejora significativa |
| 5 | CTA "Quiero inscribirme" vs "Reservar mi cupo" | Etiqueta única alternativa | Clicks CTA | +10% |

No ejecutar sin tráfico suficiente (regla: mínimo ~1.000 sesiones por variante o 4 semanas).
