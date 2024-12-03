const config = require('../config/config');
const { HostelError } = require('../middlewares/errorHandler');
const Room = require('../models/Room'); // Import your Room model
const Student = require('../models/Student'); // Import your Student model

// Room controller functions
const roomController = {
  // Check room availability
  checkAvailability: async (req, res) => {
    try {
      const { roomNumber } = req.params;
      const roomNum = Number(roomNumber);
      const isAvailable = roomNum > 0 && roomNum <= config.TOTAL_ROOMS;

      res.status(200).json({
        success: true,
        isAvailable,
        message: isAvailable ? 'Room is available' : 'Invalid room number'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error checking room availability',
        error: error.message
      });
    }
  },

  // Allocate room
  allocateRoom: async (req, res, next) => {
    try {
      const { studentId, roomNumber } = req.body;
      const roomNum = Number(roomNumber);

      // Check if room exists
      const room = await Room.findOne({ roomNumber: roomNum });
      if (!room) {
        throw new HostelError(
          'ROOM_NOT_FOUND',
          `Room ${roomNum} not found`,
          { roomNumber: roomNum }
        );
      }

      // Check room capacity
      if (room.currentOccupants >= room.maxCapacity) {
        throw new HostelError(
          'ROOM_CAPACITY_EXCEEDED',
          `Room ${roomNum} is at full capacity`,
          {
            roomNumber: roomNum,
            currentOccupants: room.currentOccupants,
            maxCapacity: room.maxCapacity
          }
        );
      }

      // Check if student exists
      const student = await Student.findById(studentId);
      if (!student) {
        throw new HostelError(
          'STUDENT_NOT_FOUND',
          `Student with ID ${studentId} not found`,
          { studentId }
        );
      }

      // Update room occupancy
      room.currentOccupants += 1;
      room.occupantsList.push(studentId);
      await room.save();

      // Update student record
      student.roomNumber = roomNum;
      await student.save();

      res.status(200).json({
        success: true,
        message: 'Room allocated successfully',
        data: {
          roomNumber: roomNum,
          studentId,
          currentOccupants: room.currentOccupants
        }
      });
    } catch (error) {
      next(error);
    }
  },

  // Get all rooms
  getAllRooms: async (req, res) => {
    try {
      const rooms = await Room.find(); // Fetch all rooms from the database

      res.status(200).json({
        success: true,
        message: 'Rooms fetched successfully',
        data: rooms
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching rooms',
        error: error.message
      });
    }
  },

  // Get room details
  getRoomDetails: async (req, res, next) => {
    try {
      const { roomNumber } = req.params;
      const roomNum = Number(roomNumber);
      const room = await Room.findOne({ roomNumber: roomNum });

      if (!room) {
        throw new HostelError(
          'ROOM_NOT_FOUND',
          `Room ${roomNum} not found`,
          { roomNumber: roomNum }
        );
      }

      res.json({
        success: true,
        data: room
      });
    } catch (error) {
      next(error);
    }
  },

  // Validate room number
  validateRoomNumber: async (req, res, next) => {
    try {
      const { roomNumber } = req.params;
      const roomNum = Number(roomNumber);

      // Check if room number follows valid format (numeric and within range)
      if (isNaN(roomNum) || roomNum < 100 || roomNum > 999) {
        throw new HostelError(
          'INVALID_ROOM_NUMBER',
          'Invalid room number format or range',
          {
            roomNumber,
            validFormat: 'Must be numeric and between 100-999'
          }
        );
      }

      res.json({
        success: true,
        message: 'Room number is valid'
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = roomController;
