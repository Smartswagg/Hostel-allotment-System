const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const roomController = require('../controllers/roomController');
const authMiddleware = require('../middlewares/authMiddleware');

// Room management routes
router.post('/assign-room', authMiddleware, adminController.assignRoom); // Assign a room to a student or user
router.get('/rooms', authMiddleware, roomController.getAllRooms); // Retrieve all rooms
router.get('/room/:roomNumber', authMiddleware, roomController.getRoomDetails); // Get details of a specific room
router.get('/room/:roomNumber/availability', authMiddleware, roomController.checkAvailability); // Check availability of a specific room
router.post('/rooms/allocate', authMiddleware, roomController.allocateRoom); // Allocate a room (consider changing to plural)
router.get('/room/:roomNumber/validate', authMiddleware, roomController.validateRoomNumber); // Validate room number

module.exports = router;