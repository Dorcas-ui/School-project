const mongoose = require('mongoose');

const userSchema = new mongoose.Schema
({
  name: { type: String, required: true },
  accountNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  wifiUsername: { type: String },
  wifiPassword: { type: String },
  wifiPackage: { type: String, enum: ['Buffalo', 'Elephant', 'Rhino', 'Lion', 'Leopard'], default: 'Buffalo' },
  balance: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
