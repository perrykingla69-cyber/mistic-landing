const { Router } = require('express');
const { receiveWebhook } = require('../../controllers/webhookController');
const resolveTenant = require('../../middleware/tenant');

const router = Router();
router.post('/n8n', resolveTenant, receiveWebhook);

module.exports = router;
