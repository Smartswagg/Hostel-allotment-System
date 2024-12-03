const mongoose = require('mongoose');
const config = require('../config/config');

// Database connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true, // Build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
};

// Handle connection events (moved outside of connectDB)
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection is disconnected');
});

// Connect to the database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.MONGO_URI, options);
    console.log(`MongoDB connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection failed:', error.message);
    // Retry logic
    if (error.name === 'MongooseServerSelectionError') {
      console.log('Retrying connection in 5 seconds...');
      setTimeout(connectDB, 5000);
    } else {
      process.exit(1);
    }
  }
};

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('Mongoose connection closed through app termination');
    process.exit(0);
  } catch (err) {
    console.error('Error closing Mongoose connection:', err);
    process.exit(1);
  }
});

// Function to check if database is connected
const isConnected = () => {
  return mongoose.connection.readyState === 1; // 1 means connected
};

// Function to close database connection
const closeConnection = async () => {
  try {
    await mongoose.connection.close();
    console.log('Database connection closed successfully');
  } catch (error) {
    console.error('Error closing database connection:', error);
    throw error;
  }
};

module.exports = {
  connectDB,
  isConnected,
  closeConnection
};