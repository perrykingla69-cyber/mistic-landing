const crypto = require('crypto');
const pool = require('../config/db');

async function createTenant(req, res) {
  const { name, slug, primaryColor, logoUrl } = req.body;
  const id = crypto.randomUUID();
  const query = `
    INSERT INTO tenants (id, name, slug, primary_color, logo_url)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  try {
    const { rows } = await pool.query(query, [id, name, slug, primaryColor, logoUrl]);
    return res.status(201).json(rows[0]);
  } catch (error) {
    return res.status(400).json({ message: 'Unable to create tenant', detail: error.message });
  }
}

async function listTenants(_req, res) {
  const { rows } = await pool.query('SELECT * FROM tenants ORDER BY created_at DESC');
  return res.json(rows);
}

module.exports = { createTenant, listTenants };
