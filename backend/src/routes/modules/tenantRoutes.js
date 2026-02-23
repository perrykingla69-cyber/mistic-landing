const { Router } = require('express');
const { createTenant, listTenants } = require('../../controllers/tenantController');
const { authenticate, authorize } = require('../../middleware/auth');

const router = Router();
router.post('/', authenticate, authorize('Admin'), createTenant);
router.get('/', authenticate, authorize('Admin'), listTenants);

module.exports = router;
