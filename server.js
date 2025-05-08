/**
 * Complete server for Employee Directory API
 */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Import employee routes
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
const PORT = process.env.PORT || 5202;

// Basic middleware
app.use(cors());
app.use(express.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoints
app.use('/api/employees', employeeRoutes);

app.get('/api', (req, res) => {
  res.json({ message: 'API is running!' });
});

// Connect to MongoDB
// Use environment variable if available (for Heroku), otherwise use local MongoDB
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/employee_directory';

mongoose.connect(mongoURI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    
    // Start server after successful MongoDB connection
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    
    // Start server even if MongoDB connection fails (for development/testing)
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} (without MongoDB)`);
    });
  });

// SPA fallback route - must be after API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
}); 