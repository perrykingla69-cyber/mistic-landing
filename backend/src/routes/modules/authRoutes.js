const { Router } = require('express');
const { login, register } = require('../../controllers/authController');
const resolveTenant = require('../../middleware/tenant');

const router = Router();
router.post('/register', resolveTenant, register);
router.post('/login', resolveTenant, login);

module.exports = router;
