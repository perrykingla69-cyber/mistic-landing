const pool = require('../config/db');

async function getDashboardMetrics(req, res) {
  const tenantId = req.tenantId;
  const [orders, revenue, events, clients] = await Promise.all([
    pool.query('SELECT status, COUNT(*)::int AS count FROM orders WHERE tenant_id = $1 GROUP BY status', [tenantId]),
    pool.query('SELECT COALESCE(SUM(amount),0)::numeric(12,2) AS total_revenue FROM orders WHERE tenant_id = $1 AND status IN (\'Completed\', \'Delivered\')', [tenantId]),
    pool.query('SELECT status, COUNT(*)::int AS count FROM event_bookings WHERE tenant_id = $1 GROUP BY status', [tenantId]),
    pool.query('SELECT COUNT(*)::int AS total_clients FROM clients WHERE tenant_id = $1', [tenantId])
  ]);

  return res.json({
    ordersByStatus: orders.rows,
    totalRevenue: revenue.rows[0].total_revenue,
    eventsByStatus: events.rows,
    totalClients: clients.rows[0].total_clients
  });
}

module.exports = { getDashboardMetrics };
