const express = require('express');
const router = express.Router();
const userAuth = require('../middleware/userAuth');
const { escalateToHuman } = require('../controllers/humanSupportController');

// Escalate to human agent
router.post('/escalate', userAuth, escalateToHuman);

module.exports = router;
