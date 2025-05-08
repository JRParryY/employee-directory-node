/**
 * Simple server for Employee Directory API
 */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Import employee routes
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
const PORT = process.env.PORT || 5202;

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/employees', employeeRoutes);
app.get('/api', (req, res) => {
  res.json({ message: 'API is running!' });
});

// Static file serving - crucial for SPA
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://demo_user:Emp10Y33PaSs@employeedirectory.bhzxu4j.mongodb.net/employee_directory?retryWrites=true&w=majority';

mongoose.connect(mongoURI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} (without MongoDB)`);
    });
  }); 