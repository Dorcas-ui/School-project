
const User = require('../models/User');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// ✅ LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  console.log("INPUT EMAIL:", email);
  console.log("INPUT PASSWORD:", password);

  try {

    const admin = await Admin.findOne({ email });
    console.log("FOUND ADMIN:", admin); 
    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      admin: {
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: err.message });
    
  }
};


// ✅ REGISTER
exports.register = async (req, res) => {
  const {name, email, phone, password } = req.body;

  try {
    console.log(req.body);


    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Strong password regex (same as customer)
    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!strongPassword.test(password)) {
      return res.status(400).json({ message: 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.' });
    }

    let admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    // Check if this is the first admin
    const adminCount = await Admin.countDocuments({});
    const adminData = {
      name,
      email,
      phone,
      password: hashedPassword,
      role: 'admin',
      isMainAdmin: adminCount === 0
    };

    admin = new Admin(adminData);
    await admin.save();

    res.status(201).json({ message: 'Admin registered successfully', isMainAdmin: admin.isMainAdmin });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};


// Main admin updates another admin's password
exports.updateAdminPassword = async (req, res) => {
  try {
    const { adminId, newPassword } = req.body;
    if (!adminId || !newPassword) {
      return res.status(400).json({ message: 'Admin ID and new password are required' });
    }
    // Password strength check
    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!strongPassword.test(newPassword)) {
      return res.status(400).json({ message: 'Password is too weak' });
    }
    const admin = await Admin.findOne({ _id: adminId });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword;
    await admin.save();
    res.json({ message: 'Admin password updated successfully' });
  } catch (err) {
    console.error('UPDATE ADMIN PASSWORD ERROR:', err);
    res.status(500).json({ message: err.message });
  }
};