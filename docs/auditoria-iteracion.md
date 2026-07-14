# Auditoría e iteración V0 → V4.1

Fecha: 14 de julio de 2026 · Respaldo V0: `_versiones/v0-original/` + git `860d36d`
Capturas: `docs/capturas/` (desktop 1440 · tablet 834 · móvil 390 real)

## A. Auditoría de la V0 (30 criterios)

| Área | Veredicto | Evidencia / acción |
|---|---|---|
| Hero (qué/para quién/logro) | ✅ Cumple | Titular transformacional + subtítulo con duración + tarjeta de componentes |
| Titular transformación | ✅ Cumple | "Deja de enfrentar la cobranza fiscal a ciegas" — mantenido tras evaluación de 3 alternativas (ver C) |
| Subtítulo modalidad/duración | ✅ Cumple | "Tres meses de formación…" + eyebrow "3 meses · 100% online" |
| CTA principal claro | ✅ Cumple | "Quiero inscribirme", etiqueta única en todo el sitio |
| Problema identificable | ✅ Cumple | 6 situaciones reconocibles en lenguaje chileno |
| Diferenciación de curso grabado | ✅ Cumple | Sección versus + hero-card "No es solo un curso grabado" |
| 5 componentes claros | ✅ Cumple | 6 tarjetas con qué es/para qué/resultado |
| Tickets comprensibles | 🟡 Parcial → ✅ | V0: solo tarjeta y página interna. **V3 agregó sección protagónica con flujo de 6 pasos + mockup referencial + video demo** |
| WhatsApp ≠ consultoría | ✅ Cumple | Matriz de canales + regla repetida en 4 puntos |
| Sesiones explicadas | ✅ Cumple | Frecuencia, contenido, grabación, confidencialidad |
| Recursos concretos | ✅ Cumple | 6 recursos con badge "propuesta" en los no confirmados |
| Temario orientado a resultados | ✅ Cumple | Cada módulo con objetivo + "Resultado: …" |
| 3 meses visibles | ✅ Cumple | Hero, eyebrow, oferta, barra móvil |
| Proceso/recorrido | ✅ Cumple | Flujo de 6 pasos + página cómo-funciona |
| Para quién | ✅ Cumple | 4 perfiles concretos |
| Para quién no | ✅ Cumple | 5 exclusiones honestas |
| Autoridad con personas reales | 🟡 Parcial → ✅ | Placeholder de foto real correcto; **V3 agregó video del experto (placeholder + guion)** |
| Testimonios verificables | ✅ Cumple | Placeholders estructurados, sin invención; V3 agregó video testimonial pendiente |
| Oferta comprensible | ✅ Cumple | Offer-box con desglose completo |
| Precio transparente/placeholder | ✅ Cumple | $249.000 con badge "valor provisional" |
| Límites curso/orientación/patrocinio | ✅ Cumple | Tabla de 3 niveles + notice de alcance |
| FAQ resuelve objeciones | 🟡 Parcial → ✅ | **V1 agregó 7 preguntas**: cuándo comienza, cómo accedo, celular, adjuntos, gestiones TGR/SII, embargo, post-pago |
| Checkout simple | ✅ Cumple | 4 campos + consentimientos, sin navegación distractora |
| Onboarding post-pago | ✅ Cumple | Confirmación con 5 pasos de activación |
| Mobile | 🟡 Parcial → ✅ | Responsive OK a 390px (verificado con captura real); **V4.1 corrigió menú que quebraba etiquetas entre 700–860px** |
| Accesibilidad | 🟡 Parcial → ✅ | **Bug real: `.sr-only` usada sin definir (caption visible) — corregido en V2**; skip-link, foco, labels, reduced-motion ya OK |
| Velocidad | ✅ Cumple | Sin imágenes pesadas ni librerías; 1 familia tipográfica; videos solo como placeholders |
| SEO | 🟡 Parcial → ✅ | **V4 agregó favicon, robots.txt, sitemap.xml, Twitter Cards, og:locale, schema FAQPage** (Course ya existía) |
| Analítica | 🟡 Parcial → ✅ | **V4 alineó nombres**: price_view, faq_open, form_submit, purchase{simulado}, video_play; falta video_complete (requiere video real) |
| Aspectos legales | ✅ Cumple | Sin promesas, retracto legal, advertencia profesional, escasez solo real |
| **Videos (estrategia §8)** | ❌ No cumple → ✅ | **V3 agregó los 6 formatos** como bloques placeholder con título, duración, objetivo, guion provisional, portada y CTA |
| HTML válido | ❌ No cumple → ✅ | **4 atributos `style` duplicados (el margen se ignoraba) — corregidos en V1** |

## B. Backlog ejecutado (priorizado impacto/esfuerzo)

| ID | Problema | Impacto | Mejora | Prioridad | Esfuerzo | Versión |
|---|---|---|---|---|---|---|
| 1 | Sin bloques de video (diferenciador clave del brief) | Conversión/confianza | 6 bloques placeholder con guiones | Crítica | Medio | V3 |
| 2 | Tickets sin protagonismo visual en la landing | Conversión | Sección dedicada + mockup + demo | Crítica | Medio | V3 |
| 3 | `style` duplicado (HTML inválido) | Calidad | Fusión de atributos | Alta | Bajo | V1 |
| 4 | `.sr-only` sin definir (caption visible) | Accesibilidad | Utilidad CSS | Alta | Bajo | V2 |
| 5 | FAQ incompleta vs. §18 | Objeciones | +7 preguntas | Alta | Bajo | V1 |
| 6 | Prueba social después de calificación | Conversión | Reorden: equipo+testimonios antes de para-quién; límites antes de FAQ; diferencia junto a oferta | Alta | Medio | V1 |
| 7 | Menú quiebra etiquetas 700–860px | Usabilidad | Hamburguesa desde 860px + nowrap | Media | Bajo | V4.1 |
| 8 | Eventos analítica no estándar | Medición | price_view/faq_open/form_submit/purchase | Media | Bajo | V4 |
| 9 | Sin favicon/robots/sitemap/TwCards/FAQPage | SEO | Agregados | Media | Bajo | V4 |
| 10 | Asterisco huérfano en barra CTA móvil | Claridad | "valor provisional" explícito | Baja | Bajo | V2 |

No ejecutado (requiere decisión/insumos de Víctor): grabación de los 6 videos, foto real, testimonios, y datos pendientes (ver H).

## C. Titulares evaluados

| Titular | Claridad | Credibilidad | Diferenciación | Rigor | Veredicto |
|---|---|---|---|---|---|
| **"Deja de enfrentar la cobranza fiscal a ciegas."** | Alta | Alta | Alta (transformación, no contenido) | Sin promesa indebida | ✅ SELECCIONADO (mantener) |
| "La cobranza fiscal tiene etapas, plazos y salidas. Aprende a verlas, acompañado." | Alta | Alta | Media (más largo, 2 ideas) | OK — "salidas" es genérico defendible | Variante B para test A/B |
| "Tres meses para pasar del susto al mapa" | Media (metáfora exige contexto) | Media | Alta | OK | Usado como concepto del CTA final |

Razón de la selección: es la formulación más corta que comunica transformación + estado actual del lector, funciona para los 4 perfiles y no roza ninguna promesa de resultado. Las variantes quedan en el backlog de experimentos (`arquitectura-y-analitica.md`).

## E. Comparación V0 → V4.1

| Cambio | Antes | Después | Razón | Impacto esperado |
|---|---|---|---|---|
| Orden de secciones | …recursos → para quién → no es → diferencia → equipo → testimonios → oferta | …recursos → **equipo → testimonios** → para quién → no es → **diferencia → oferta** | Prueba social antes de la calificación; contraste de valor pegado al precio | Mayor confianza al llegar al precio |
| Video | Inexistente | 6 bloques (principal, cómo-funciona, experto, testimonio, demo, objeciones) con guiones | El brief define video como diferenciador principal | CTR y tiempo en página; producción guiada |
| Tickets | Tarjeta + página interna | Sección propia: 6 pasos + mockup de ticket + video demo + "[TIEMPO DE RESPUESTA POR DEFINIR]" | Es EL diferenciador; había que mostrarlo, no describirlo | Comprensión del valor central |
| FAQ | 8 landing / 16 página | 11 landing / 23 página + schema FAQPage | Cobertura completa de §18 | Menos fugas por dudas |
| Accesibilidad/HTML | caption visible, style duplicados | `.sr-only`, HTML válido | WCAG + calidad | Lectores de pantalla correctos |
| Navegación 700–860px | Etiquetas en 2 líneas | Hamburguesa desde 860px | Detectado en captura tablet | Header siempre limpio |
| SEO técnico | Sin favicon/robots/sitemap | Completos + Twitter Cards + FAQPage | Estándar de publicación | Indexación y compartido correctos |

## G. Informe técnico

- **Pruebas**: 125 enlaces internos y todas las anclas verificadas sin errores; 1 `h1` por página; lang/viewport/title/skip-link/favicon en 9/9; formularios validan con errores visibles; navegación completa del flujo compra simulada.
- **Capturas**: desktop (1440), tablet (834) y móvil real (390, vía iframe — Chrome headless impone ancho mínimo de ventana ~500px, por eso la primera captura "390" salió cortada: artefacto de la herramienta, no del sitio).
- **Performance**: sin imágenes raster propias, 1 familia tipográfica, JS de ~150 líneas sin dependencias; los videos no cargan nada (placeholders). Riesgo futuro: pesos de video — usar portada + carga bajo demanda.
- **Accesibilidad**: semántica, foco visible, labels, targets ≥44px, reduced-motion, sr-only. Pendiente de validación con herramienta (axe/Lighthouse) en la fase Next.js.
- **Sin personas generadas por IA, sin fotos de stock simulando equipo, sin testimonios ficticios** (verificado: solo placeholders `[FOTO REAL…]`, `[VIDEO … PENDIENTE]`, `[TESTIMONIO REAL PENDIENTE]`).
- Analítica simulada en `dataLayer`; `video_complete` queda documentado para cuando exista reproductor real.

## H. Elementos pendientes (de Víctor)

Sin cambios respecto de la auditoría estratégica, más los nuevos de esta iteración:
1–9. Los de `auditoria-estrategica.md` §6 (precio, SLA tickets, fechas, cifras, testimonios, datos legales, foto, política post-3-meses, WhatsApp).
10. **Grabación de los 6 videos** (guiones provisionales ya escritos en cada bloque).
11. og:image real 1200×630 para compartir en redes.
12. Decidir tiempo de respuesta de tickets → reemplazar `[TIEMPO DE RESPUESTA POR DEFINIR]`.
