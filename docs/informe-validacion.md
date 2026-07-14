# Entregable I — Informe de validación de la maqueta

Fecha: 14 de julio de 2026

## Pruebas ejecutadas

| Prueba | Resultado |
|---|---|
| Enlaces internos (124 en 9 páginas) | ✅ Sin enlaces rotos |
| Anclas entre páginas (`legal.html#retracto`, `#privacidad`, `index.html#programa`, etc.) | ✅ Todas existen |
| Un solo `h1` por página, `lang="es"`, viewport, title, hoja de estilos y JS | ✅ 9/9 páginas |
| Navegación completa del flujo: landing → inscripción → confirmación → acceso | ✅ Funciona |
| Formularios (checkout, contacto, login) | ✅ Validación en cliente con mensajes de error visibles; envío simulado |
| Analítica simulada | ✅ Eventos en `window.dataLayer` + consola (page_view, scroll, CTA, checkout, purchase_simulada) |
| Preservación de UTM entre páginas | ✅ Implementada vía sessionStorage |
| Accesibilidad base | ✅ Skip-link, foco visible, labels sobre inputs, errores bajo el campo, `prefers-reduced-motion`, objetivos táctiles ≥44px, HTML semántico |
| Marcadores de datos pendientes | ✅ 25 badges "por confirmar/provisional" visibles + placeholders `[ENTRE CORCHETES]` |

## Qué funciona de verdad

Navegación completa (desktop y móvil con menú hamburguesa), acordeones de temario y FAQ, barra CTA persistente móvil, reveals con reduced-motion respetado, validación de formularios, flujo de compra simulado de punta a punta.

## Qué es simulado (no conectar a producción tal cual)

Pago (redirección directa a confirmación), envío de formularios, login, WhatsApp comercial (alerta con aviso), analítica (sin GA4/GTM reales), textos legales (borrador no revisado por abogado).

## Qué falta (decisiones de Víctor — bloquean lanzamiento, no evaluación)

Precio y cuotas definitivos · alcance y SLA de tickets · fecha de cohorte y cupos · cifras de trayectoria · testimonios reales · datos del proveedor para legal · foto real del equipo · política post-3-meses · número de WhatsApp comercial.

## Limitaciones conocidas de la maqueta

- Sin imágenes reales: casillas marcadas (se pueden generar visuales con herramientas de IA de imagen si Víctor lo aprueba, o usar fotos propias del estudio).
- El validador automático revisó estructura y enlaces; la revisión visual fina (contrastes en pantallas específicas, textos largos en móviles pequeños) conviene hacerla en dispositivo real.
- Los textos legales son borradores funcionales para evaluar el flujo, no documentos jurídicos finales.

## Riesgos para la siguiente fase

1. No publicar con placeholders visibles (buscar `badge-prov` y `[` antes de cualquier deploy).
2. No conectar pasarela sin definir política de retracto operativa (quién procesa devoluciones y en qué plazo).
3. No activar Meta Ads sin píxel + consentimiento de cookies implementados.

## Siguiente fase (requiere aprobación expresa)

1. Revisión de Víctor sobre esta maqueta (copy, estructura, oferta).
2. Confirmación de los 9 datos pendientes.
3. Desarrollo en Next.js + TypeScript + Tailwind reutilizando tokens y copy, con pasarela de pago, GTM/GA4 real y formularios conectados (n8n/CRM).
4. Producción de activos de lanzamiento según `plan-lanzamiento.md`.
