const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { updateWifi, getProfile, rebootRouter, updateWifiPackage, updateProfile } = require('../controllers/selfServiceController');
// @route   PUT /api/selfservice/profile
// @desc    Update phone number for logged-in user
// @access  Private
router.put('/profile', auth, updateProfile);
// @route   GET /api/selfservice/profile
// @desc    Get profile for logged-in user
// @access  Private
router.get('/profile', auth, getProfile);

// @route   PUT /api/selfservice/wifi
// @desc    Update Wi-Fi credentials for logged-in user
// @access  Private
router.put('/wifi', auth, updateWifi);

// @route   PUT /api/selfservice/wifi-package
// @desc    Update Wi-Fi package for logged-in user
// @access  Private
router.put('/wifi-package', auth, updateWifiPackage);

// @route   POST /api/selfservice/reboot
// @desc    Reboot router for logged-in user
// @access  Private
router.post('/reboot', auth, rebootRouter);

module.exports = router;
