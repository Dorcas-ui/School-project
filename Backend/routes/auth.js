// routes/auth.js
const express = require('express');
const router = express.Router(); 
const { register, login, requestReset, resetPassword } = require('../controllers/clientAuthController');

// Password Reset
router.post('/request-reset', requestReset);
router.post('/reset-password', resetPassword);


// Register
router.post('/register', register);

// Login
router.post('/login', login);


module.exports = router;
