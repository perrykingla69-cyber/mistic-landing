const crypto = require('crypto');
const pool = require('../config/db');

async function createClient(req, res) {
  const id = crypto.randomUUID();
  const { fullName, phone, email, instrumentType, notes } = req.body;
  const { rows } = await pool.query(
    `INSERT INTO clients (id, tenant_id, full_name, phone, email, instrument_type, notes)
     VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
    [id, req.tenantId, fullName, phone, email, instrumentType, notes]
  );
  return res.status(201).json(rows[0]);
}

async function listClients(req, res) {
  const { rows } = await pool.query('SELECT * FROM clients WHERE tenant_id = $1 ORDER BY created_at DESC', [req.tenantId]);
  return res.json(rows);
}

module.exports = { createClient, listClients };
