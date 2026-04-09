const User = require('../models/User');

// Get all clients
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Get single client by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new client
exports.createUser = async (req, res) => {
  try {
    const { name, accountNumber, phone, package: pkg, wifiPackage, location } = req.body;

    if (!name || !accountNumber || !phone) {
      return res.status(400).json({ message: 'Name, account number, and phone are required' });
    }

    const existingUser = await User.findOne({ accountNumber });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const finalWifiPackage = wifiPackage || pkg || '';

    const user = new User({
      name,
      accountNumber,
      phone,
      wifiPackage: finalWifiPackage,
      location,
      role: 'user',
      password: '' // password left empty for client to set
    });

    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Update user (admin can update all fields except password)
exports.updateUser = async (req, res) => {
  try {
    const { name, accountNumber, phone, package: wifiPackage, location } = req.body;
    const update = { name, accountNumber, phone, wifiPackage, location };
    const user = await User.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
