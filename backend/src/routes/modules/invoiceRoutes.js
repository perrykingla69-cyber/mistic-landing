const { Router } = require('express');
const { createInvoice, listInvoices } = require('../../controllers/invoiceController');
const { authenticate, authorize } = require('../../middleware/auth');
const resolveTenant = require('../../middleware/tenant');

const router = Router();
router.get('/', authenticate, resolveTenant, authorize('Admin'), listInvoices);
router.post('/', authenticate, resolveTenant, authorize('Admin'), createInvoice);

module.exports = router;
