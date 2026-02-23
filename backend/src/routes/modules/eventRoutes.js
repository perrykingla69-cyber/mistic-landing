const { Router } = require('express');
const { createEvent, listEvents } = require('../../controllers/eventController');
const { authenticate, authorize } = require('../../middleware/auth');
const resolveTenant = require('../../middleware/tenant');

const router = Router();
router.get('/', authenticate, resolveTenant, authorize('Admin', 'Technician', 'Client'), listEvents);
router.post('/', authenticate, resolveTenant, authorize('Admin', 'Technician'), createEvent);

module.exports = router;
