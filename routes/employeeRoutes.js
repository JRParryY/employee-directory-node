/**
 * Employee Routes
 * 
 * This file defines all API routes related to employee management.
 * It provides endpoints for listing, creating, and deleting employees.
 */

// Import Express for creating router
const express = require('express');
// Create an Express router instance
const router = express.Router();
// Import the Employee model for database operations
const Employee = require('../models/Employee');

/**
 * GET /api/employees
 * Purpose: Retrieve all employees from the database
 * 
 * This endpoint fetches all employees from the MongoDB collection
 * and returns them as a JSON array.
 */
router.get('/', async (req, res) => {
  console.log('GET request received');
  try {
    // Query the database for all employees
    const employees = await Employee.find();
    
    // Return employees as JSON response
    res.json(employees);
  } catch (err) {
    // Handle errors with a 500 status code and error message
    res.status(500).json({ message: err.message });
  }
});

/**
 * POST /api/employees
 * Purpose: Create a new employee record
 * 
 * This endpoint accepts employee data in the request body
 * and creates a new employee document in the database.
 * Required fields: name, jobTitle, department, email
 */
router.post('/', async (req, res) => {
  // Create a new Employee document from request data
  const employee = new Employee({
    name: req.body.name,
    jobTitle: req.body.jobTitle,
    department: req.body.department,
    email: req.body.email,
    manager: req.body.manager,
    team: req.body.team,
    currentProject: req.body.currentProject,
    yearsInCompany: req.body.yearsInCompany
  });

  try {
    // Save the new employee to the database
    const newEmployee = await employee.save();
    
    // Return the created employee with 201 Created status
    res.status(201).json(newEmployee);
  } catch (err) {
    // Handle validation errors or other issues with 400 Bad Request
    res.status(400).json({ message: err.message });
  }
});

/**
 * DELETE /api/employees/:id
 * Purpose: Delete an employee record by ID
 * 
 * This endpoint removes an employee from the database
 * based on the ID provided in the URL parameter.
 */
router.delete('/:id', async (req, res) => {
  try {
    // Find and delete the employee by ID
    const employee = await Employee.findByIdAndDelete(req.params.id);
    
    // If employee not found, return 404 Not Found
    if (!employee) return res.status(404).json({ message: 'Not found' });
    
    // Return success message on successful deletion
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    // Handle server errors with 500 status code
    res.status(500).json({ message: err.message });
  }
});

// Export the router for use in the main server file
module.exports = router; 