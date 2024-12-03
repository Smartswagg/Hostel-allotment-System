const express = require('express');
const path = require('path');
const cors = require('cors');
const { connectDB, isConnected, closeConnection } = require('./utils/database');
const studentRoutes = require('./routes/studentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');
const errorHandler = require('./middlewares/errorHandler');
const config = require('./config/config');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Serve static files from the "frontend" directory
app.use(express.static(path.join(__dirname, 'frontend')));

// API Routes
app.use('/students', studentRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/api/rooms', roomRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'UP' });
});

// Example API route
app.get('/api/example', (req, res) => {
  res.json({ message: "API response here" });
});

// Route to serve the main HTML file for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Error handling middleware
app.use(errorHandler);

// Async function to start the server
const startServer = async () => {
  try {
    // Connect to the database
    await connectDB();
    
    if (isConnected()) {
      console.log('Database connection verified');
    }

    // Define port and start the server
    const PORT = config.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    // Handle graceful shutdown
    const shutdown = async () => {
      console.log('Shutting down gracefully...');
      await closeConnection();
      process.exit(0);
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();