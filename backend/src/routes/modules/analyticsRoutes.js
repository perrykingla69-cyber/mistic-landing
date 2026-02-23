const { Router } = require('express');
const { getDashboardMetrics } = require('../../controllers/analyticsController');
const { authenticate, authorize } = require('../../middleware/auth');
const resolveTenant = require('../../middleware/tenant');

const router = Router();
router.get('/dashboard', authenticate, resolveTenant, authorize('Admin', 'Technician'), getDashboardMetrics);

module.exports = router;
