const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },

  // Only required for clients
  accountNumber: {
    type: String,
    unique: true,
    sparse: true,
    required: function () { return this.role === 'user'; },
    default: undefined // Prevents duplicate nulls for admins
  },

  // Only required for admins
  email: {
    type: String,
    unique: true,
    sparse: true,
    required: function () { return this.role === 'admin'; }
  },

  password: {
    type: String,
    required: function () { return this.role === 'admin'; }
  },

  phone: {
  type: String,
  required: function () { return this.role === 'user'; }
},

  // Only required for clients
  wifiPackage: {
    type: String,
    enum: ['Buffalo', 'Elephant', 'Rhino', 'Lion', 'Leopard', ''],
    default: '',
    required: function () { return this.role === 'user'; }
  },

  location: { type: String, default: '' },

  role: {
    type: String,
    enum: ['user', 'admin'],
    required: true
  },

  createdAt: { type: Date, default: Date.now },

  // Flag for main admin
  isMainAdmin: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);
