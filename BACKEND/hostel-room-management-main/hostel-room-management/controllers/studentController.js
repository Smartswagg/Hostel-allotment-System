const Room = require('../models/Room');

exports.viewRooms = async (req, res) => {
  try {
    // Fetch available rooms
    const availableRooms = await Room.find({ status: 'available' });
    
    res.status(200).json({
      success: true,
      data: availableRooms
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching rooms',
      error: error.message
    });
  }
};

exports.requestRoom = async (req, res) => {
  try {
    const { roomId, studentId } = req.body;
    
    // Check if room exists and is available
    const room = await Room.findById(roomId);
    
    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }
    
    if (room.status !== 'available') {
      return res.status(400).json({
        success: false,
        message: 'Room is not available'
      });
    }
    
    // Update room status and assign student
    room.status = 'occupied';
    room.assignedTo = studentId;
    await room.save();
    
    res.status(200).json({
      success: true,
      message: 'Room assigned successfully',
      data: room
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error requesting room',
      error: error.message
    });
  }
};

// Get room assigned to the logged-in student
exports.getMyRoom = async (req, res) => {
  try {
    const studentId = req.user.id; // Assuming authentication middleware provides `req.user`
    
    const room = await Room.findOne({ assignedTo: studentId });
    
    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'No room assigned'
      });
    }
    
    res.status(200).json({
      success: true,
      data: room
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching room details',
      error: error.message
    });
  }
};

// Vacate room for the logged-in student
exports.vacateRoom = async (req, res) => {
  try {
    const studentId = req.user.id; // Assuming authentication middleware provides `req.user`
    
    const room = await Room.findOne({ assignedTo: studentId });
    
    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'No room assigned'
      });
    }
    
    room.status = 'available';
    room.assignedTo = null;
    await room.save();
    
    res.status(200).json({
      success: true,
      message: 'Room vacated successfully'
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error vacating room',
      error: error.message
    });
  }
};
