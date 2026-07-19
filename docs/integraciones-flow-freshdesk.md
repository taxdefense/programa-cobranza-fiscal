# Integraciones — Flow, Freshdesk, Pipedrive (`ui_kits/landing/`)

Estado: **código sin probar**. No hubo credenciales sandbox disponibles en esta sesión
para ejecutar un pago de prueba. Probar en el sandbox de Flow y en un entorno Freshdesk
real antes de activar en producción.

## Qué quedó conectado

- `ui_kits/landing/index.html` → `#enrollment-form` hace `POST /api/flow/create-payment`
  y redirige a la `payment_url` que retorna Flow.
- `api/flow/create-payment.js` — crea la orden en Flow (server-side; la apiKey/secretKey
  nunca se exponen al navegador).
- `api/flow/confirm.js` — `urlConfirmation` de Flow. Reconsulta `getStatus` (nunca confía
  en el retorno del navegador), y si el pago quedó pagado (`status === 2`) crea/busca el
  contacto en Freshdesk y abre un ticket de bienvenida.
- `INTRANET_HREF` (header y footer) sigue como placeholder — reemplazar por el login real
  del portal de clientes de Freshdesk una vez tengas el subdominio contratado.

## Variables de entorno a cargar en Vercel (Project Settings → Environment Variables)

| Variable | Ejemplo | Nota |
|---|---|---|
| `FLOW_API_KEY` | — | Panel de comercio Flow → API |
| `FLOW_SECRET_KEY` | — | Ídem. Nunca la subas al repo. |
| `FLOW_ENV` | `sandbox` / `production` | Por defecto usa sandbox si no se define |
| `SITE_URL` | `https://programa.juridicamente.cl` | Sin `/` final; se usa para armar `urlConfirmation`/`urlReturn` |
| `FLOW_RETURN_PATH` | `/confirmacion.html` | Opcional; página a la que Flow devuelve al alumno tras pagar |
| `FRESHDESK_DOMAIN` | `juridicamente` | El subdominio antes de `.freshdesk.com` |
| `FRESHDESK_API_KEY` | — | Perfil del agente en Freshdesk → API Key |

## Pasos manuales (no son código)

1. **Flow**: registrar la cuenta de comercio, confirmar `urlConfirmation` = `SITE_URL/api/flow/confirm`
   en el panel de Flow, y probar un pago en sandbox antes de pasar a producción.
2. **Freshdesk**: activar el **portal de clientes** (para que `INTRANET_HREF` tenga a dónde apuntar)
   y confirmar los campos de contacto/ticket que se están mandando desde `confirm.js`.
3. **Freshdesk ↔ Pipedrive**: instalar el conector nativo desde el marketplace de Freshdesk
   (no se codea acá) para el handoff automático cuando un ticket se marque "requiere defensa jurídica".
4. **Fotos/video reales**: los `<image-slot>` de `ui_kits/landing/index.html` siguen como
   placeholders — pendientes de que Víctor entregue los assets finales.

## Nota de diseño

Los tokens de color de este UI kit (`tokens/colors.css`: terracota `#c1613f` + dorado `#e3a857`)
NO coinciden con `MARCA.md` de este mismo repo (teal `#0F758A` + ámbar `#F6A821`), que Víctor había
fijado como fuente única de verdad. Decisión explícita de Víctor (2026-07-19): subir tal cual —
esta paleta reemplaza al brand book anterior para "Jurídicamente". Queda registrado acá por si
`MARCA.md` necesita actualizarse para no volver a marcar esto como una desviación.
