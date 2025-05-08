/**
 * Employee Model
 * 
 * This file defines the schema and model for Employee documents in MongoDB.
 * It represents the structure of employee records in the database.
 */

// Import Mongoose for MongoDB object modeling
const mongoose = require('mongoose');

/**
 * Employee Schema Definition
 * 
 * Defines the structure and validation rules for Employee documents:
 * - name: The employee's full name
 * - jobTitle: The employee's position or title
 * - department: The department the employee belongs to
 * - email: The employee's email address for contact
 * - manager: The employee's direct manager
 * - team: The specific team the employee belongs to
 * - currentProject: The project the employee is currently working on
 * - yearsInCompany: Number of years the employee has been with the company
 * 
 * All fields are required to ensure data completeness.
 */
const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true  // Employee name is mandatory
  },
  jobTitle: {
    type: String,
    required: true  // Job title is mandatory
  },
  department: {
    type: String,
    required: true  // Department is mandatory
  },
  email: {
    type: String,
    required: true  // Email is mandatory
  },
  manager: {
    type: String,
    required: false  // Manager name is optional
  },
  team: {
    type: String,
    required: false  // Team name is optional
  },
  currentProject: {
    type: String,
    required: false  // Current project is optional
  },
  yearsInCompany: {
    type: Number,
    required: false  // Years in company is optional
  }
}, {
  // Enable timestamps to automatically track createdAt and updatedAt
  timestamps: true
});

/**
 * Export the Employee model
 * 
 * The first parameter 'Employee' determines the collection name (becomes 'employees' in MongoDB)
 * The second parameter is the schema that defines the document structure
 */
module.exports = mongoose.model('Employee', EmployeeSchema); 