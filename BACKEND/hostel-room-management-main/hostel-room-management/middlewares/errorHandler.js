// errorHandler.js

/**
 * Custom error handler middleware for Hostel Room Management System
 * Handles specific hostel-related errors and provides detailed error responses
 */
const errorHandler = (err, req, res, next) => {
    // Determine the status code
    const statusCode = res.statusCode === 200 ? (err.status || 500) : res.statusCode;

    // Define specific error types for hostel management
    const errorTypes = {
        ROOM_NOT_FOUND: 'Room not found',
        INVALID_ROOM_NUMBER: 'Invalid room number',
        STUDENT_NOT_FOUND: 'Student not found',
        ROOM_CAPACITY_EXCEEDED: 'Room capacity exceeded',
        DATABASE_ERROR: 'Database operation failed'
    };

    // Log error for debugging
    console.error(`[Error ${new Date().toISOString()}]: ${err.message}`);
    console.error(`[Error Stack]: ${err.stack}`);
    console.error(`[Request Path]: ${req.path}`);
    console.error(`[Request Method]: ${req.method}`);

    // Prepare error response
    const errorResponse = {
        success: false,
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
        method: req.method,
        message: err.message || "Internal Server Error",
        errorType: err.type || "GENERAL_ERROR",
        details: err.details || null,
    };

    // Add stack trace in development environment
    if (process.env.NODE_ENV === 'development') {
        errorResponse.stack = err.stack;
        errorResponse.debug = err.debug || null;
    }

    // Handle specific error cases
    switch (err.type) {
        case 'ROOM_NOT_FOUND':
        case 'STUDENT_NOT_FOUND':
            res.status(404).json(errorResponse);
            break;
        case 'INVALID_ROOM_NUMBER':
        case 'ROOM_CAPACITY_EXCEEDED':
            res.status(400).json(errorResponse);
            break;
        case 'DATABASE_ERROR':
            res.status(500).json(errorResponse);
            break;
        default:
            res.status(statusCode).json(errorResponse);
    }

    // Log error to monitoring service (if implemented)
    if (process.env.NODE_ENV === 'production') {
        // TODO: Implement error logging service
        // logErrorToMonitoringService(errorResponse);
    }
};

/**
 * Custom error class for Hostel Management specific errors
 */
class HostelError extends Error {
    constructor(type, message, details = null) {
        super(message);
        this.type = type;
        this.details = details;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = {
    errorHandler,
    HostelError
};

// Usage example in other files:
/*
throw new HostelError(
    'ROOM_CAPACITY_EXCEEDED',
    'Room 101 has reached its maximum capacity',
    { roomNumber: '101', currentOccupancy: 4, maxCapacity: 4 }
);
*/