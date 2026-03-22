const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { updateWifi, getProfile } = require('../controllers/selfServiceController');
// @route   GET /api/selfservice/profile
// @desc    Get profile for logged-in user
// @access  Private
router.get('/profile', auth, getProfile);

// @route   PUT /api/selfservice/wifi
// @desc    Update Wi-Fi credentials for logged-in user
// @access  Private
router.put('/wifi', auth, updateWifi);

module.exports = router;
