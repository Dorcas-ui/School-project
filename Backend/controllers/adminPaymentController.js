const Payment = require('../models/Payment');
const User = require('../models/User');

// Get all payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('user');
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get payments for a specific user
exports.getPaymentsByUser = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.params.userId });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get payment summary report
exports.getPaymentSummary = async (req, res) => {
  try {
    const totalPayments = await Payment.countDocuments();
    const totalAmount = await Payment.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    res.json({
      totalPayments,
      totalAmount: totalAmount[0] ? totalAmount[0].total : 0
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
