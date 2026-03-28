// Update profile (phone number) for the logged-in user
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ message: 'Phone number is required' });
    }
    const user = await User.findByIdAndUpdate(
      userId,
      { phone },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'Profile updated successfully', phone: user.phone });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
const User = require('../models/User');

// Get profile for the logged-in user
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update Wi-Fi credentials for the logged-in user
exports.updateWifi = async (req, res) => {
  try {
    const userId = req.user.id; // Set by auth middleware
    const { wifiUsername, wifiPassword } = req.body;
    if (!wifiUsername || !wifiPassword) {
      return res.status(400).json({ message: 'Wi-Fi username and password are required' });
    }
    const user = await User.findByIdAndUpdate(
      userId,
      { wifiUsername, wifiPassword },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'Wi-Fi credentials updated successfully', wifiUsername: user.wifiUsername });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update Wi-Fi package for the logged-in user
exports.updateWifiPackage = async (req, res) => {
  try {
    const userId = req.user.id;
    const { wifiPackage } = req.body;
    // Accept new package names
    const validPackages = ['Buffalo', 'Elephant', 'Rhino', 'Lion', 'Leopard'];
    if (!validPackages.includes(wifiPackage)) {
      return res.status(400).json({ message: 'Invalid package selected.' });
    }
    const user = await User.findByIdAndUpdate(
      userId,
      { wifiPackage },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'Wi-Fi package updated successfully', wifiPackage: user.wifiPackage });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Reboot router for the logged-in user (demo only)
exports.rebootRouter = async (req, res) => {
  try {
    // In a real system, this would trigger a device action
    // Here, we just simulate a delay and success response
    setTimeout(() => {
      res.json({ message: 'Router rebooted successfully!' });
    }, 2000);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
