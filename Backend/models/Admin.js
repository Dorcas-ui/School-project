const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    sparse: true,
    required: true
  },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
  isMainAdmin: { type: Boolean, default: false }
});

module.exports = mongoose.model('Admin', adminSchema);