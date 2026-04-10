const Interaction = require('../models/Interaction');
const User = require('../models/User');

// Create a human support escalation request
exports.escalateToHuman = async (req, res) => {
  try {
    const { message } = req.body;
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ message: 'Message is required' });
    }
    await Interaction.create({
      user: req.user.id,
      type: 'human',
      message,
      resolved: false
    });
    res.json({ message: 'Your request has been escalated to a human agent. You will be contacted soon.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
