const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: { 
    type: String, 
    unique: true, 
    required: true,
    trim: true // Removes whitespace from the beginning and end
  },
  capacity: { 
    type: Number, 
    required: true, 
    min: 1 // Ensures capacity is at least 1
  },
  isAvailable: { 
    type: Boolean, 
    default: true // Default value for availability
  }
}, { timestamps: true }); // Adding timestamps

module.exports = mongoose.model('Room', roomSchema);