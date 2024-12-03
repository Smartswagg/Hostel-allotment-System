const mongoose = require('mongoose');
const validator = require('validator'); // For email validation
const bcrypt = require('bcrypt'); // For password hashing

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  adminID: { type: String, unique: true, required: true },
  email: { 
    type: String, 
    unique: true, 
    required: true, 
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email format'
    }
  },
  password: { type: String, required: true }
}, { timestamps: true }); // Adding timestamps

// Pre-save hook to hash the password before saving to the database
adminSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('Admin', adminSchema);