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
