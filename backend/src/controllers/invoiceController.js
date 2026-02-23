const crypto = require('crypto');
const pool = require('../config/db');

async function createInvoice(req, res) {
  const id = crypto.randomUUID();
  const {
    orderId, serie, folio, rfcEmisor, rfcReceptor, razonSocialReceptor,
    usoCfdi, regimenFiscalReceptor, codigoPostalReceptor, subtotal,
    impuestos, total, metodoPago, formaPago
  } = req.body;

  const { rows } = await pool.query(
    `INSERT INTO invoices (
      id, tenant_id, order_id, serie, folio, rfc_emisor, rfc_receptor, razon_social_receptor,
      uso_cfdi, regimen_fiscal_receptor, codigo_postal_receptor, subtotal, impuestos, total,
      metodo_pago, forma_pago
     ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
     RETURNING *`,
    [
      id, req.tenantId, orderId, serie, folio, rfcEmisor, rfcReceptor, razonSocialReceptor,
      usoCfdi, regimenFiscalReceptor, codigoPostalReceptor, subtotal, impuestos, total,
      metodoPago, formaPago
    ]
  );
  return res.status(201).json(rows[0]);
}

async function listInvoices(req, res) {
  const { rows } = await pool.query('SELECT * FROM invoices WHERE tenant_id = $1 ORDER BY created_at DESC', [req.tenantId]);
  return res.json(rows);
}

module.exports = { createInvoice, listInvoices };
