/* ============================================================
   CONFIGURACIÓN DE INTEGRACIONES — Programa de Cobranza Fiscal
   ============================================================
   Cada campo vacío ("") deja su integración desactivada y el sitio
   funciona en modo maqueta/simulación. Al pegar el valor real, la
   integración se activa sola — sin tocar más código.
   Guía paso a paso de cada una: docs/GUIA-PROPAGACION.pdf
   ============================================================ */
window.SITE_CONFIG = {

  /* --- Pagos: Flow (flow.cl) ---
     Crea un "link de pago" en tu panel de Flow por $349.000 y pégalo aquí.
     El botón "Confirmar inscripción" redirigirá a Flow con pago real. */
  FLOW_PAYMENT_URL: "",

  /* --- Tickets: Jira Service Management ---
     URL del portal de clientes de tu proyecto JSM
     (ej: "https://tuempresa.atlassian.net/servicedesk/customer/portal/1").
     Activa los botones "Portal de consultas" en acceso y confirmación. */
  JIRA_PORTAL_URL: "",

  /* --- Publicidad y analítica: Google Tag Manager ---
     ID del contenedor (ej: "GTM-XXXXXXX"). Dentro de GTM configuras
     GA4 y Google Ads. Solo se carga si el visitante acepta cookies. */
  GTM_ID: "",

  /* --- Publicidad: Meta Pixel (Facebook/Instagram Ads) ---
     ID numérico del píxel. Solo se carga si el visitante acepta cookies. */
  META_PIXEL_ID: "",

  /* --- Formulario de contacto: webhook ---
     URL que recibe los envíos (n8n, Make, Formspree, Getform…).
     Sin valor, el formulario queda en modo simulación. */
  FORM_WEBHOOK_URL: "",

  /* --- Chat conversacional con IA ---
     URL del script del widget elegido (Tidio, Chatwoot, Crisp, etc.).
     Se inyecta al final de cada página. */
  CHAT_WIDGET_SRC: "",

  /* --- WhatsApp comercial (ya activo) --- */
  WHATSAPP: "56957062518"
};
