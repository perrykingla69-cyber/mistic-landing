const crypto = require('crypto');
const pool = require('../config/db');

async function createEvent(req, res) {
  const id = crypto.randomUUID();
  const { clientId, eventName, eventDate, location, status = 'Requested', fee, notes } = req.body;
  const { rows } = await pool.query(
    `INSERT INTO event_bookings (id, tenant_id, client_id, event_name, event_date, location, status, fee, notes)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
    [id, req.tenantId, clientId, eventName, eventDate, location, status, fee, notes]
  );
  return res.status(201).json(rows[0]);
}

async function listEvents(req, res) {
  const { rows } = await pool.query('SELECT * FROM event_bookings WHERE tenant_id = $1 ORDER BY event_date DESC', [req.tenantId]);
  return res.json(rows);
}

module.exports = { createEvent, listEvents };
