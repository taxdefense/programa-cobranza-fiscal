# Arquitectura, hosting, seguridad y protección de datos — análisis sincero

Fecha: 15 de julio de 2026 · Sitio: Programa de Acompañamiento en Cobranza Fiscal

## 1. Qué es técnicamente este sitio (y por qué es una fortaleza)

HTML/CSS/JavaScript **estático puro**: no hay servidor propio, ni base de datos, ni panel de administración, ni dependencias que actualizar. Consecuencias directas:

- **Seguridad**: la superficie de ataque es mínima. No existe base de datos que inyectar, ni login de administrador que forzar, ni plugins con vulnerabilidades. Los incidentes típicos de sitios pyme (WordPress hackeado, plugin desactualizado, malware en el panel) simplemente no aplican.
- **Estabilidad**: se sirve desde CDN global (GitHub Pages/Vercel); no "se cae" por tráfico — una campaña exitosa de Meta Ads no lo tumba.
- **Costo**: hosting $0 en revisión (GitHub Pages) y $0 en producción (plan gratuito de Vercel cubre con holgura este tráfico).
- **Protección de datos**: el sitio **no almacena datos personales**. Cada dato viaja directo al servicio responsable: el pago a Flow (certificado PCI-DSS), las consultas a Jira (Atlassian, SOC2/ISO 27001), el formulario al webhook que se elija, el chat a su proveedor. El sitio es solo la puerta.

## 2. Comparación honesta de plataformas

| Criterio | Estático (GitHub → Vercel) ✅ | WordPress + Elementor ❌ |
|---|---|---|
| Compatibilidad con este código | Directa, tal cual está | Requiere REHACER el sitio en su editor |
| Seguridad | Sin BD ni plugins que parchar | Principal vector de hackeo en pymes; exige mantención mensual |
| Estabilidad / velocidad | CDN global, Core Web Vitals altos | Depende del hosting y de cuántos plugins cargue |
| Costo anual | $0 + dominio | Hosting (~$50-150k CLP/año) + plugins de pago |
| Ediciones de texto | Editar HTML (o pedirlo a Claude) | Editor visual amigable |
| Flow / Jira / GTM / Meta / chat IA | Ya enchufables vía `assets/js/config.js` | Vía plugins (más capas, mismas integraciones) |
| Formularios con backend propio | Vercel Functions cuando se necesite | Nativo con plugins |

**Veredicto**: para una landing de campaña con integraciones externas, migrar a WordPress/Elementor sería pagar más para tener menos seguridad y rehacer trabajo. La única ventaja real de WordPress (editar textos sin tocar código) no compensa. **Recomendación: repositorio GitHub como fuente de verdad → GitHub Pages para revisión → Vercel para producción con dominio propio** (`vercel.json` con headers de seguridad ya está listo en el repo).

## 3. Las integraciones y dónde vive cada dato

Todas se activan pegando un valor en `assets/js/config.js` (guía paso a paso en el PDF de propagación):

| Integración | Campo en config.js | Dónde viven los datos | Nota de seguridad |
|---|---|---|---|
| Pagos **Flow** | `FLOW_PAYMENT_URL` | Flow.cl (PCI-DSS) | Se usa **link de cobro** del panel de Flow: cero credenciales en el sitio. La API completa de Flow exige backend (secretKey server-side) — **nunca** poner la secretKey en el HTML. Si más adelante se quiere API, se agrega una Vercel Function. |
| Tickets **Jira** | `JIRA_PORTAL_URL` | Atlassian (SOC2, ISO 27001) | Se enlaza al portal de clientes de Jira Service Management: los antecedentes se suben directo a Atlassian, no pasan por el sitio. |
| **GTM / Google Ads / GA4** | `GTM_ID` | Google | Solo carga tras **consentimiento de cookies** (banner ya implementado). |
| **Meta Pixel** | `META_PIXEL_ID` | Meta | Ídem: solo tras consentimiento. |
| Formulario | `FORM_WEBHOOK_URL` | El servicio que se elija (n8n propio, Formspree…) | Elegir proveedor con cifrado y política de datos clara; pedir solo datos mínimos (ya es así). |
| Chat IA | `CHAT_WIDGET_SRC` | Proveedor del widget (Tidio/Chatwoot/Crisp) | Configurar el bot para NO solicitar antecedentes tributarios: derivar a tickets. |
| WhatsApp | `WHATSAPP` | Meta (WhatsApp) | Ya activo; solo consultas comerciales, no confidenciales. |

## 4. Cumplimiento de protección de datos (Chile)

Marco: Ley 19.628 y **Ley 21.719** (nueva ley de datos personales, en vigencia gradual — multas relevantes desde su plena aplicación). Lo que este sitio ya cumple y lo que hay que mantener:

1. ✅ **Minimización**: los formularios piden solo nombre, correo y teléfono.
2. ✅ **Consentimiento para trackers**: banner de cookies que bloquea GTM/Pixel hasta aceptar.
3. ✅ **Información al titular**: política de privacidad con finalidad, confidencialidad de tickets y derechos ARCO (acceso/rectificación/eliminación vía soporte@juridicamente.cl).
4. ✅ **Canal seguro para datos sensibles**: la regla "antecedentes solo por tickets" está en todo el sitio.
5. ⚠️ **Pendiente al activar integraciones**: definir plazo de retención de datos (badge en legal.html), revisar los términos de tratamiento de datos (DPA) del proveedor de webhook y chat elegidos, y que el abogado del estudio valide legal.html antes del build final.

## 5. Riesgos residuales honestos

- **Imágenes de Unsplash** cargan desde un dominio externo: para producción conviene descargarlas a `assets/img/` (se hará al reemplazarlas por fotos reales).
- **GitHub Pages no permite headers de seguridad personalizados** — suficiente para revisión; los headers reales llegan con Vercel.
- **El checkout depende del link de Flow**: si el link se desactiva en el panel de Flow, el botón vuelve a simulación. Verificarlo tras cada cambio en Flow.
- **El contenido editable requiere tocar HTML**: es el trade-off aceptado; las ediciones frecuentes (precio, textos) están concentradas y documentadas.
