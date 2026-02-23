const { Router } = require('express');
const { createOrder, listOrders } = require('../../controllers/orderController');
const { authenticate, authorize } = require('../../middleware/auth');
const resolveTenant = require('../../middleware/tenant');

const router = Router();
router.get('/', authenticate, resolveTenant, authorize('Admin', 'Technician', 'Client'), listOrders);
router.post('/', authenticate, resolveTenant, authorize('Admin', 'Technician'), createOrder);

module.exports = router;
