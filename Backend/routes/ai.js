const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { chat } = require('../controllers/aiController');

// @route   POST /api/ai/chat
// @desc    AI chatbot endpoint
// @access  Private (user must be logged in)
router.post('/chat', auth, chat);

module.exports = router;
