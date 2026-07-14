# Maqueta — Sitio de venta del Programa de Acompañamiento en Cobranza Fiscal

Maqueta navegable estática (HTML/CSS/JS puro) del sitio de lanzamiento. **No procesa pagos, no envía formularios, no instala seguimiento real.** Marca: Jurídicamente / Defensor del Contribuyente.

## Cómo ejecutarla

Doble clic en `index.html` — no requiere instalación ni servidor. Para probar en el celular dentro de tu red local: `python -m http.server 8080` en esta carpeta y abre `http://IP-DEL-PC:8080`.

## Estructura

| Archivo | Página |
|---|---|
| `index.html` | Landing de venta completa |
| `temario.html` | Temario detallado (10 módulos) |
| `como-funciona.html` | Modelo de acompañamiento y alcances |
| `preguntas.html` | FAQ completa |
| `inscripcion.html` → `confirmacion.html` | Checkout simulado y onboarding |
| `acceso.html` | Login placeholder (área de alumnos futura) |
| `legal.html` | T&C, retracto, privacidad (BORRADOR) |
| `contacto.html` | Soporte comercial pre-compra |
| `assets/css/estilo.css` | Sistema de diseño (tokens comentados al inicio) |
| `assets/js/app.js` | Menú, reveals, analítica simulada, UTM, validación |
| `docs/` | Auditoría, arquitectura/analítica, plan de lanzamiento, informe de validación |

## Cómo editar contenido

- **Textos:** directamente en cada HTML (buscar la sección por su comentario `<!-- ======= N · NOMBRE ======= -->`).
- **Todo lo pendiente está marcado** con la etiqueta amarilla "por confirmar / valor provisional" (`<span class="badge-prov">`) o entre corchetes `[ASÍ]`. Buscar `badge-prov` y `[` para la lista completa.
- **Colores/tipografía:** tokens al inicio de `assets/css/estilo.css`.
- **Precio:** aparece en `index.html` (sección inversión + barra móvil), `inscripcion.html` (resumen) y `preguntas.html` (FAQ pagos).
- **Imágenes:** hoy hay casillas marcadas (foto de Víctor, mockups de recursos). Reemplazar por fotos reales del estudio y mockups definitivos — evitar bancos de imágenes genéricos.

## Qué es simulado

- Envío de formularios (muestran confirmación local, no envían datos).
- Pago (redirige a `confirmacion.html` sin cobrar).
- Analítica (eventos en `window.dataLayer` + consola; conectar GTM/GA4 en producción).
- Login de alumnos (mensaje de integración futura).
- Botón de WhatsApp comercial (número por confirmar).

## Construcción a producción (fase siguiente, requiere aprobación)

Stack propuesto: Next.js + TypeScript + Tailwind (ya usado en la landing existente del repo raíz), React Hook Form + Zod para formularios, pasarela Webpay/MercadoPago, GTM + GA4, y CMS opcional para el blog. La maqueta define copy, estructura, tokens y eventos: la migración es directa.
