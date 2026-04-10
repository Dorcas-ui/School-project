// Search AI interactions by account number and include AI answers
exports.searchAIInteractionsByAccount = async (req, res) => {
  try {
    const { accountNumber } = req.query;
    if (!accountNumber) {
      return res.status(400).json({ message: 'Account number is required' });
    }
    // Find user by account number
    const user = await User.findOne({ accountNumber });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Find AI interactions for this user
    const interactions = await Interaction.find({ user: user._id, type: 'ai' })
      .populate('user')
      .sort({ timestamp: -1 });
    res.json(interactions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
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

// Get most frequent AI questions (FAQs)
exports.getFrequentAIQuestions = async (req, res) => {
  try {
    // Aggregate AI interactions, group by message, count, sort desc
    const faqs = await Interaction.aggregate([
      { $match: { type: 'ai' } },
      { $group: { _id: "$message", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
