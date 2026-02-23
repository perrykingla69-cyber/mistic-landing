const { Router } = require('express');
const authRoutes = require('./modules/authRoutes');
const tenantRoutes = require('./modules/tenantRoutes');
const clientRoutes = require('./modules/clientRoutes');
const orderRoutes = require('./modules/orderRoutes');
const eventRoutes = require('./modules/eventRoutes');
const invoiceRoutes = require('./modules/invoiceRoutes');
const analyticsRoutes = require('./modules/analyticsRoutes');
const webhookRoutes = require('./modules/webhookRoutes');

const router = Router();

router.get('/health', (_req, res) => res.json({ status: 'ok' }));
router.use('/auth', authRoutes);
router.use('/tenants', tenantRoutes);
router.use('/clients', clientRoutes);
router.use('/orders', orderRoutes);
router.use('/events', eventRoutes);
router.use('/invoices', invoiceRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/webhooks', webhookRoutes);

module.exports = router;
