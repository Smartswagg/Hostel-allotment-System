const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const authMiddleware = require('../middlewares/authMiddleware');

// Protect all routes below this line with authentication middleware
router.use(authMiddleware);

// Check room availability
router.get('/check/:roomNumber', roomController.checkAvailability);

// Allocate room
router.post('/allocate', roomController.allocateRoom);

// Get all rooms (consider changing this to /)
router.get('/', roomController.getAllRooms); // Changed from /all to /

 // Get details of a specific room
router.get('/:roomNumber', roomController.getRoomDetails);

// Validate room number
router.get('/validate/:roomNumber', roomController.validateRoomNumber);

module.exports = router;