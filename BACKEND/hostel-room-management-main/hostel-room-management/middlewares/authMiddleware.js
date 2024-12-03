const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authMiddleware = (req, res, next) => {
  // Get token from header
  const authHeader = req.get('Authorization');

  // Check if no auth header
  if (!authHeader) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Extract token from Bearer token
  const token = authHeader.split(' ')[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, config.JWT_SECRET);

    // Add user from payload
    req.user = decoded.user;

    // Optional: Check user role
    // if (req.user.role !== 'admin' && req.user.role !== 'student') {
    //   return res.status(403).json({ msg: 'Access denied' });
    // }

    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ msg: 'Token has expired' });
    }
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;