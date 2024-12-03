const RoomAssignment = require('../models/RoomAssignment');
const Student = require('../models/Student');
const Room = require('../models/Room');

// Constants for status
const STATUS_ACTIVE = 'active';
const STATUS_INACTIVE = 'inactive';

// Helper function for error response
const handleErrorResponse = (res, statusCode, message) => {
    return res.status(statusCode).json({
        success: false,
        message,
    });
};

// Assign Room to Student
exports.assignRoom = async (req, res) => {
    try {
        const { studentId, roomId } = req.body;

        // Input validation
        if (!studentId || !roomId) {
            return handleErrorResponse(res, 400, 'Please provide both student ID and room ID');
        }

        // Check if student exists
        const student = await Student.findById(studentId);
        if (!student) {
            return handleErrorResponse(res, 404, 'Student not found');
        }

        // Check if room exists
        const room = await Room.findById(roomId);
        if (!room) {
            return handleErrorResponse(res, 404, 'Room not found');
        }

        // Check if room is already assigned
        const existingAssignment = await RoomAssignment.findOne({ roomId, status: STATUS_ACTIVE });
        if (existingAssignment) {
            return handleErrorResponse(res, 400, 'Room is already assigned to another student');
        }

        // Check if student already has a room
        const studentExistingAssignment = await RoomAssignment.findOne({ studentId, status: STATUS_ACTIVE });
        if (studentExistingAssignment) {
            return handleErrorResponse(res, 400, 'Student is already assigned to another room');
        }

        // Create new room assignment
        const newAssignment = new RoomAssignment({
            studentId,
            roomId,
            assignmentDate: new Date(),
            status: STATUS_ACTIVE,
        });

        await newAssignment.save();

        // Update room status
        room.isOccupied = true;
        await room.save();

        return res.status(201).json({
            success: true,
            message: 'Room assigned successfully',
            data: newAssignment,
        });

    } catch (error) {
        console.error('Error in assignRoom:', error);
        return handleErrorResponse(res, 500, 'Internal server error');
    }
};

// Get All Room Assignments
exports.getAllRoomAssignments = async (req, res) => {
    try {
        const assignments = await RoomAssignment.find()
            .populate('studentId', 'name email') // Populate student details
            .populate('roomId', 'roomNumber floor'); // Populate room details

        return res.status(200).json({
            success: true,
            count: assignments.length,
            data: assignments,
        });
    } catch (error) {
        console.error('Error in getAllRoomAssignments:', error);
        return handleErrorResponse(res, 500, 'Internal server error');
    }
}
