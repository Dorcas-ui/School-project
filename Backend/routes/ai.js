const express = require('express');
const router = express.Router();
const userAuth = require('../middleware/userAuth');
const { chat } = require('../controllers/aiController');

// @route   POST /api/ai/chat
// @desc    AI chatbot endpoint
// @access  Private (user must be logged in)
router.post('/chat', userAuth, chat);

module.exports = router;
