const express = require('express');
const router = express.Router();
const userAuth = require('../middleware/userAuth');
const { initiateStkPush, handleCallback } = require('../controllers/clientPaymentController');

// @route   POST /api/payment/stk
// @desc    Initiate M-PESA STK Push payment (alias for /stkpush)
// @access  Private

router.post('/stk', userAuth, initiateStkPush);

// @route   POST /api/payment/callback
// @desc    Handle M-PESA payment callback from Safaricom
// @access  Public (Safaricom server calls this)
router.post('/callback', handleCallback);

module.exports = router;
