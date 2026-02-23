const crypto = require('crypto');
const pool = require('../config/db');

async function createOrder(req, res) {
  const id = crypto.randomUUID();
  const { clientId, assignedTechnicianId, orderType, status = 'Pending', amount, description } = req.body;
  const { rows } = await pool.query(
    `INSERT INTO orders (id, tenant_id, client_id, assigned_technician_id, order_type, status, amount, description)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
    [id, req.tenantId, clientId, assignedTechnicianId, orderType, status, amount, description]
  );
  return res.status(201).json(rows[0]);
}

async function listOrders(req, res) {
  const { rows } = await pool.query(
    `SELECT o.*, c.full_name as client_name
     FROM orders o
     LEFT JOIN clients c ON o.client_id = c.id
     WHERE o.tenant_id = $1
     ORDER BY o.created_at DESC`,
    [req.tenantId]
  );
  return res.json(rows);
}

module.exports = { createOrder, listOrders };
