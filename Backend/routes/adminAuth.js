const express = require('express');
const router = express.Router();
const adminAuthController = require('../controllers/adminAuthController');

// Admin Login
router.post('/login', adminAuthController.login);
// Admin Register (optional, for testing)
router.post('/register', adminAuthController.register);

module.exports = router;
