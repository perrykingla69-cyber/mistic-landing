const crypto = require('crypto');
const pool = require('../config/db');

async function receiveWebhook(req, res) {
  const id = crypto.randomUUID();
  const { source = 'n8n', eventType = 'generic' } = req.body;
  const payload = req.body;

  const { rows } = await pool.query(
    `INSERT INTO webhook_events (id, tenant_id, source, event_type, payload)
     VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [id, req.tenantId, source, eventType, payload]
  );

  return res.status(202).json({ message: 'Webhook accepted', event: rows[0] });
}

module.exports = { receiveWebhook };
