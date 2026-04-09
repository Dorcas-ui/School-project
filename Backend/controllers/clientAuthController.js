
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// In-memory store for reset codes (for demo; use DB or cache in production)
const resetCodes = {};

// Request Password Reset
exports.requestReset = async (req, res) => {
  try {
    const { accountNumber, name } = req.body;
    if (!accountNumber || !name) {
      return res.status(400).json({ message: 'Account number and name are required' });
    }
    const user = await User.findOne({ accountNumber, name });
    if (!user) {
      return res.status(400).json({ message: 'No user found with those details' });
    }
    // Generate a 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    resetCodes[accountNumber] = { code, expires: Date.now() + 10 * 60 * 1000 }; // 10 min expiry
    // In real app, send code via SMS/email. Here, return it for demo.
    res.json({ message: 'Reset code generated', code });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { accountNumber, resetCode, newPassword } = req.body;
    if (!accountNumber || !resetCode || !newPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const entry = resetCodes[accountNumber];
    if (!entry || entry.code !== resetCode || Date.now() > entry.expires) {
      return res.status(400).json({ message: 'Invalid or expired reset code' });
    }
    // Password strength check (same as frontend)
    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!strongPassword.test(newPassword)) {
      return res.status(400).json({ message: 'Password is too weak' });
    }
    const user = await User.findOne({ accountNumber });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    delete resetCodes[accountNumber];
    res.json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


// Register Controller
exports.register = async (req, res) => {
  try {
    const { name, accountNumber, password, phone, role } = req.body;

    // VALIDATION
    if (!name || !accountNumber || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }


    // Check if client details exist (pre-registered by admin, no password set)
    const existingUser = await User.findOne({ name, accountNumber });
    if (!existingUser || existingUser.password) {
      return res.status(400).json({ message: 'Client details does not exist. Confirm with admin' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Set password for pre-registered user
    existingUser.password = hashedPassword;
    await existingUser.save();

    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
};

// Login Controller
exports.login = async (req, res) => {
  try {
    const { accountNumber, password } = req.body;
    const user = await User.findOne({ accountNumber });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign(
  { id: user._id, role: user.role }, // 🔥 add role
  process.env.JWT_SECRET,
  { expiresIn: '1d' }
);
    res.json({ token, user: { id: user._id, name: user.name, accountNumber: user.accountNumber, role: user.role } });
  } catch (err) {
    console.error("FULL LOGIN ERROR:");
    console.error(err);
    res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
};