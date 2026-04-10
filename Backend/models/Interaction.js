const mongoose = require('mongoose');

const interactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['ai', 'human'], required: true },
  message: { type: String, required: true },
  aiAnswer: { type: String }, // Store AI answer for admin review
  timestamp: { type: Date, default: Date.now },
  resolved: { type: Boolean, default: false }
});

module.exports = mongoose.model('Interaction', interactionSchema);
