const express = require('express');
const router = express.Router();
const userAuth = require('../middleware/userAuth');
const selfServiceController = require('../controllers/selfServiceController');

// Routes
router.get('/profile', userAuth, selfServiceController.getProfile);
router.put('/profile', userAuth, selfServiceController.updateProfile);
router.put('/wifi', userAuth, selfServiceController.updateWifi);
router.put('/wifi/package', userAuth, selfServiceController.updateWifiPackage);
router.post('/wifi/reboot', userAuth, selfServiceController.rebootRouter);

module.exports = router;