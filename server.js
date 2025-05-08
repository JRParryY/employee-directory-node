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
// Set the port for the server to listen on (5202 if no environment variable is set)
const PORT = process.env.PORT || 5202;

// === Middleware Configuration ===
// Enable Cross-Origin Resource Sharing for all routes
app.use(cors());
// Parse incoming JSON requests and place the data in req.body
app.use(express.json());

// === Route Registration ===
// Mount the employee routes under the /api/employees path
app.use('/api/employees', employeeRoutes);

// Root route to confirm the server is running
app.get('/', (req, res) => {
  res.send('Server is running!');
});


app.get("/test", (req, res) => {
  res.send("Hello");
});

// === Database Connection and Server Initialization ===
// MongoDB connection string that specifies the employee_directory database
const mongoURI = process.env.MONGODB_URI;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
// For SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Connect to MongoDB using Mongoose
mongoose.connect(mongoURI)
  .then(() => {
    // On successful connection:
    console.log('✅ Connected to MongoDB (employee_directory database)');
    // Start the Express server
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    // Handle connection errors
    console.error('❌ MongoDB connection error:', err);
  }); 