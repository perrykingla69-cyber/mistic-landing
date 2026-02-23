const { Router } = require('express');
const { createClient, listClients } = require('../../controllers/clientController');
const { authenticate, authorize } = require('../../middleware/auth');
const resolveTenant = require('../../middleware/tenant');

const router = Router();
router.get('/', authenticate, resolveTenant, authorize('Admin', 'Technician'), listClients);
router.post('/', authenticate, resolveTenant, authorize('Admin', 'Technician'), createClient);

module.exports = router;
