/**
 * Main server file for the Employee Directory API
 * This file sets up the Express server, connects to MongoDB, and defines routes
 */

// Import required dependencies
const express = require('express');  // Web framework for Node.js
const mongoose = require('mongoose'); // MongoDB object modeling tool
const cors = require('cors');         // Middleware to enable CORS
const path = require('path');

// Import route handlers
const employeeRoutes = require('./routes/employeeRoutes');

// Initialize Express application
const app = express();

// Set the port for the server to listen on (use Heroku's PORT env var or 5202 locally)
const PORT = process.env.PORT || 5202;

// === Middleware Configuration ===
// Enable Cross-Origin Resource Sharing for all routes
app.use(cors());
// Parse incoming JSON requests and place the data in req.body
app.use(express.json());
// Serve static files from the public directory (this MUST come before routes)
app.use(express.static(path.join(__dirname, 'public')));

// === API Routes Registration ===
// Mount the employee routes under the /api/employees path
app.use('/api/employees', employeeRoutes);

// Root route to confirm the server is running
app.get('/api', (req, res) => {
  res.send('API is running!');
});

// Test route
app.get("/api/test", (req, res) => {
  res.send("Hello");
});

// === Database Connection and Server Initialization ===
const mongoURI = process.env.MONGODB_URI;

// Connect to MongoDB and start server only after successful connection
mongoose.connect(mongoURI)
  .then(() => {
    console.log('✅ Connected to MongoDB (employee_directory database)');
    
    // Start the Express server AFTER MongoDB connection is established
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });

// SPA fallback route - MUST BE THE LAST ROUTE
// This serves index.html for any routes not matched above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
}); 