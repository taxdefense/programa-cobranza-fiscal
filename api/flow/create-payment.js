const { FLOW_BASE_URL, signFlowParams } = require('../_lib/flow');

const PRECIO_CLP = '349900';

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed' });
    return;
  }

  const { nombre, email, telefono } = req.body || {};
  if (!nombre || !email) {
    res.status(400).json({ error: 'missing_fields' });
    return;
  }

  const apiKey = process.env.FLOW_API_KEY;
  const siteUrl = process.env.SITE_URL; // ej: https://programa.juridicamente.cl (sin / final)
  if (!apiKey || !process.env.FLOW_SECRET_KEY || !siteUrl) {
    res.status(500).json({ error: 'flow_not_configured' });
    return;
  }

  const commerceOrder = `PCF-${Date.now()}`;
  const params = {
    apiKey,
    commerceOrder,
    subject: 'Programa de Cobranza Fiscal — Jurídicamente',
    currency: 'CLP',
    amount: PRECIO_CLP,
    email,
    paymentMethod: 9, // 9 = todos los medios de pago disponibles en Flow
    urlConfirmation: `${siteUrl}/api/flow/confirm`,
    urlReturn: `${siteUrl}${process.env.FLOW_RETURN_PATH || '/confirmacion.html'}`,
    optional: JSON.stringify({ nombre, telefono }),
  };
  params.s = signFlowParams(params);

  try {
    const flowRes = await fetch(`${FLOW_BASE_URL}/payment/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(params),
    });
    const data = await flowRes.json();
    if (!flowRes.ok || !data.url || !data.token) {
      res.status(502).json({ error: 'flow_create_failed', detail: data });
      return;
    }
    res.status(200).json({ url: `${data.url}?token=${data.token}` });
  } catch (err) {
    res.status(500).json({ error: 'flow_request_failed' });
  }
};
