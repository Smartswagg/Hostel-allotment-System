const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, // Make name required
    trim: true // Removes whitespace from the beginning and end
  },
  studentID: { 
    type: String, 
    unique: true, 
    required: true, // Make studentID required
    trim: true // Removes whitespace
  },
  email: { 
    type: String, 
    unique: true, 
    required: true, // Make email required
    trim: true, // Removes whitespace
    lowercase: true, // Convert email to lowercase
    match: /.+\@.+\..+/ // Basic email format validation
  },
  password: { 
    type: String, 
    required: true // Make password required
  },
  batch: { 
    type: String, 
    trim: true // Removes whitespace
  },
  semester: { 
    type: String, 
    trim: true // Removes whitespace
  }
}, { timestamps: true }); // Adding timestamps

module.exports = mongoose.model('Student', studentSchema);