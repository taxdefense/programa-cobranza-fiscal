const crypto = require('crypto');

const FLOW_BASE_URL = process.env.FLOW_ENV === 'production'
  ? 'https://www.flow.cl/api'
  : 'https://sandbox.flow.cl/api';

// Firma HMAC-SHA256 según el contrato público de Flow: concatenar clave+valor
// de cada parámetro (excluyendo "s"), ordenados alfabéticamente por clave, sin
// separadores, y firmar con la secretKey del comercio.
function signFlowParams(params) {
  const secretKey = process.env.FLOW_SECRET_KEY;
  const toSign = Object.keys(params).sort().map((k) => k + params[k]).join('');
  return crypto.createHmac('sha256', secretKey).update(toSign).digest('hex');
}

module.exports = { FLOW_BASE_URL, signFlowParams };
