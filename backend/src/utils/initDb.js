const pool = require('../config/db');
const { createTablesSQL } = require('../models/schema');

async function initDb() {
  await pool.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');
  await pool.query(createTablesSQL);
  console.log('Database schema initialized');
  await pool.end();
}

initDb().catch((error) => {
  console.error('Error initializing DB', error);
  process.exit(1);
});
