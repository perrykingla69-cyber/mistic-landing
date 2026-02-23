const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const pool = require('../config/db');
const { signToken } = require('../services/tokenService');

async function register(req, res) {
  const { tenantId } = req;
  const { name, email, password, role = 'Client' } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);
  const userId = crypto.randomUUID();

  const query = `
    INSERT INTO users (id, tenant_id, name, email, password_hash, role)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id, tenant_id, name, email, role;
  `;

  try {
    const { rows } = await pool.query(query, [userId, tenantId, name, email, passwordHash, role]);
    return res.status(201).json(rows[0]);
  } catch (error) {
    return res.status(400).json({ message: 'Unable to register user', detail: error.message });
  }
}

async function login(req, res) {
  const { tenantId } = req;
  const { email, password } = req.body;
  const { rows } = await pool.query(
    'SELECT id, tenant_id, name, email, password_hash, role FROM users WHERE tenant_id = $1 AND email = $2',
    [tenantId, email]
  );

  const user = rows[0];
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = signToken({ sub: user.id, tenantId: user.tenant_id, role: user.role, email: user.email });
  return res.json({ token, user: { id: user.id, name: user.name, role: user.role, tenantId: user.tenant_id } });
}

module.exports = { register, login };
