const mongoose = require('mongoose');

const roomAssignmentSchema = new mongoose.Schema({
  student: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Student', 
    required: true // Make student required
  },
  room: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Room', 
    required: true // Make room required
  },
  status: { 
    type: String, 
    enum: ['requested', 'assigned', 'rejected'], 
    default: 'requested' // Default status
  }
}, { timestamps: true }); // Adding timestamps

module.exports = mongoose.model('RoomAssignment', roomAssignmentSchema);