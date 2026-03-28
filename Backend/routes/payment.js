const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { initiateStkPush } = require('../controllers/paymentController');
const { handleCallback } = require('../controllers/paymentController');

// @route   POST /api/payment/stk
// @desc    Initiate M-PESA STK Push payment (alias for /stkpush)
// @access  Private
router.post('/stk', auth, initiateStkPush);

// @route   POST /api/payment/callback
// @desc    Handle M-PESA payment callback from Safaricom
// @access  Public (Safaricom server calls this)
router.post('/callback', handleCallback);

module.exports = router;
