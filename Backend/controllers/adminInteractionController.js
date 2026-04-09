const Interaction = require('../models/Interaction');
const User = require('../models/User');

// Get all interaction logs
exports.getAllInteractions = async (req, res) => {
  try {
    const interactions = await Interaction.find().populate('user');
    res.json(interactions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get interactions for a specific user
exports.getInteractionsByUser = async (req, res) => {
  try {
    const interactions = await Interaction.find({ user: req.params.userId });
    res.json(interactions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get unresolved (open) interactions
exports.getUnresolvedInteractions = async (req, res) => {
  try {
    const interactions = await Interaction.find({ resolved: false }).populate('user');
    res.json(interactions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
