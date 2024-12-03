require('dotenv').config();

module.exports = {
  // Server configuration
  PORT: parseInt(process.env.PORT, 10) || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',

  // Database configuration
  MONGO_URI: process.env.MONGO_URI,

  // Authentication configuration
  JWT_SECRET: process.env.JWT_SECRET || 'default-hostel-room-secret-key', // Use caution with defaults in production
  JWT_EXPIRE: process.env.JWT_EXPIRE || '24h',
  BCRYPT_SALT_ROUNDS: parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10,

  // Hostel configuration
  TOTAL_ROOMS: parseInt(process.env.TOTAL_ROOMS, 10) || 100,

  // API configuration
  API_VERSION: process.env.API_VERSION || '/api/v1',
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',

  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
};
