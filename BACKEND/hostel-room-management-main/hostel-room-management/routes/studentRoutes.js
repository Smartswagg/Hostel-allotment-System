const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const roomController = require('../controllers/roomController');
const authMiddleware = require('../middlewares/authMiddleware');

// View available rooms
router.get('/rooms', authMiddleware, studentController.viewRooms);

// Get details of a specific room
router.get('/room/:roomNumber', authMiddleware, roomController.getRoomDetails);

// Check room availability
router.get('/room/:roomNumber/availability', authMiddleware, roomController.checkAvailability);

// Request a room
router.post('/request-room', authMiddleware, studentController.requestRoom);

// Get student's current room
router.get('/my-room', authMiddleware, studentController.getMyRoom);

// Vacate room
router.post('/vacate-room', authMiddleware, studentController.vacateRoom);

// View room allocation status
router.get('/allocation-status', authMiddleware, studentController.getAllocationStatus);

module.exports = router;