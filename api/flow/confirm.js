const { FLOW_BASE_URL, signFlowParams } = require('../_lib/flow');

async function getFlowStatus(token) {
  const apiKey = process.env.FLOW_API_KEY;
  const params = { apiKey, token };
  params.s = signFlowParams(params);
  const qs = new URLSearchParams(params).toString();
  const flowRes = await fetch(`${FLOW_BASE_URL}/payment/getStatus?${qs}`);
  return flowRes.json();
}

function freshdeskAuth() {
  const apiKey = process.env.FRESHDESK_API_KEY;
  return 'Basic ' + Buffer.from(`${apiKey}:X`).toString('base64');
}

async function ensureFreshdeskContact({ nombre, email, telefono }) {
  const domain = process.env.FRESHDESK_DOMAIN; // subdominio, ej: "juridicamente"
  const base = `https://${domain}.freshdesk.com/api/v2`;
  const headers = { Authorization: freshdeskAuth(), 'Content-Type': 'application/json' };

  const found = await fetch(`${base}/contacts?email=${encodeURIComponent(email)}`, { headers }).then((r) => r.json());
  if (Array.isArray(found) && found.length) return found[0];

  const created = await fetch(`${base}/contacts`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ name: nombre, email, phone: telefono || undefined }),
  });
  return created.json();
}

async function createFreshdeskTicket(contact, commerceOrder) {
  const domain = process.env.FRESHDESK_DOMAIN;
  const base = `https://${domain}.freshdesk.com/api/v2`;
  const headers = { Authorization: freshdeskAuth(), 'Content-Type': 'application/json' };

  return fetch(`${base}/tickets`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      email: contact.email,
      subject: 'Bienvenida — Programa de Cobranza Fiscal',
      description: `Inscripción confirmada vía Flow. Orden: ${commerceOrder}. Se habilita acceso al portal de alumno.`,
      priority: 1,
      status: 2,
      tags: ['programa-cobranza-fiscal', 'inscripcion'],
    }),
  }).then((r) => r.json());
}

// Flow llama a esta URL server-to-server (nunca confiar en el urlReturn del navegador
// para dar acceso: siempre reconsultar getStatus acá antes de aprovisionar nada).
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }
  const token = req.body && req.body.token;
  if (!token) {
    res.status(400).end();
    return;
  }

  try {
    const status = await getFlowStatus(token);
    // status.status: 1 pendiente, 2 pagada, 3 rechazada, 4 anulada (ver docs Flow).
    if (status.status === 2) {
      const optional = status.optional ? JSON.parse(status.optional) : {};
      const email = status.payer_email || status.email;
      const contact = await ensureFreshdeskContact({
        nombre: optional.nombre || email,
        email,
        telefono: optional.telefono,
      });
      await createFreshdeskTicket(contact, status.commerceOrder);
    }
    res.status(200).end();
  } catch (err) {
    res.status(500).end();
  }
};
