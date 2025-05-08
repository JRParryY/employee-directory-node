/**
 * Database Seeding Script
 * 
 * This script will populate the employee_directory database with 25 sample employees
 * with the updated data structure including manager, team, currentProject, and yearsInCompany fields.
 */

const mongoose = require('mongoose');
const Employee = require('./models/Employee');

// MongoDB connection string
const mongoURI = 'mongodb+srv://jparr4:jparr4@cluster1.lqo9sxo.mongodb.net/employee_directory?retryWrites=true&w=majority&appName=Cluster1';

// Sample departments
const departments = ['Engineering', 'Marketing', 'Finance', 'Human Resources', 'Product', 'Design', 'Customer Support', 'Sales'];

// Sample teams
const teams = {
  'Engineering': ['Frontend', 'Backend', 'DevOps', 'QA', 'Mobile'],
  'Marketing': ['Content', 'Social Media', 'SEO', 'Email Marketing'],
  'Finance': ['Accounting', 'Investment', 'Audit'],
  'Human Resources': ['Recruitment', 'Training', 'Employee Relations'],
  'Product': ['Product Management', 'Product Research', 'User Experience'],
  'Design': ['UI/UX', 'Graphic Design', 'Web Design'],
  'Customer Support': ['Technical Support', 'Account Management', 'Customer Success'],
  'Sales': ['Direct Sales', 'Channel Sales', 'Sales Operations']
};

// Sample projects
const projects = [
  'Website Redesign',
  'Mobile App Development',
  'Cloud Migration',
  'Product Launch',
  'Market Research',
  'Q3 Financial Reporting',
  'Employee Portal',
  'Customer Onboarding Automation',
  'Sales Dashboard',
  'Social Media Campaign',
  'Database Optimization',
  'Security Audit'
];

// Sample managers
const managers = [
  'Alex Thompson',
  'Jamie Rodriguez',
  'Taylor Washington',
  'Jordan Lee',
  'Casey Kim',
  'Morgan Williams'
];

// Sample employees data
const employeesData = [
  {
    name: 'Sarah Chen',
    jobTitle: 'Senior Software Engineer',
    department: 'Engineering',
    email: 'sarah.chen@company.com',
    manager: 'Alex Thompson',
    team: 'Frontend',
    currentProject: 'Website Redesign',
    yearsInCompany: 4.5
  },
  {
    name: 'Marcus Rodriguez',
    jobTitle: 'Marketing Manager',
    department: 'Marketing',
    email: 'm.rodriguez@company.com',
    manager: 'Jamie Rodriguez',
    team: 'Content',
    currentProject: 'Product Launch',
    yearsInCompany: 3
  },
  {
    name: 'Emily Thompson',
    jobTitle: 'HR Director',
    department: 'Human Resources',
    email: 'emily.thompson@company.com',
    manager: 'Taylor Washington',
    team: 'Employee Relations',
    currentProject: 'Employee Portal',
    yearsInCompany: 7.5
  },
  {
    name: 'James Wilson',
    jobTitle: 'Financial Analyst',
    department: 'Finance',
    email: 'j.wilson@company.com',
    manager: 'Casey Kim',
    team: 'Accounting',
    currentProject: 'Q3 Financial Reporting',
    yearsInCompany: 2
  },
  {
    name: 'Aisha Patel',
    jobTitle: 'Product Manager',
    department: 'Product',
    email: 'a.patel@company.com',
    manager: 'Morgan Williams',
    team: 'Product Management',
    currentProject: 'Product Launch',
    yearsInCompany: 3.5
  },
  {
    name: 'Michael Chang',
    jobTitle: 'UX Designer',
    department: 'Design',
    email: 'm.chang@company.com',
    manager: 'Jamie Rodriguez',
    team: 'UI/UX',
    currentProject: 'Website Redesign',
    yearsInCompany: 2.5
  },
  {
    name: 'Lisa Anderson',
    jobTitle: 'Sales Director',
    department: 'Sales',
    email: 'l.anderson@company.com',
    manager: 'Taylor Washington',
    team: 'Direct Sales',
    currentProject: 'Sales Dashboard',
    yearsInCompany: 5
  },
  {
    name: 'David Kim',
    jobTitle: 'Backend Developer',
    department: 'Engineering',
    email: 'd.kim@company.com',
    manager: 'Alex Thompson',
    team: 'Backend',
    currentProject: 'Database Optimization',
    yearsInCompany: 1.5
  },
  {
    name: 'Rachel Foster',
    jobTitle: 'Content Strategist',
    department: 'Marketing',
    email: 'r.foster@company.com',
    manager: 'Jamie Rodriguez',
    team: 'Content',
    currentProject: 'Social Media Campaign',
    yearsInCompany: 2
  },
  {
    name: 'Omar Hassan',
    jobTitle: 'DevOps Engineer',
    department: 'Engineering',
    email: 'o.hassan@company.com',
    manager: 'Alex Thompson',
    team: 'DevOps',
    currentProject: 'Cloud Migration',
    yearsInCompany: 3
  },
  {
    name: 'Jessica Lee',
    jobTitle: 'Customer Success Manager',
    department: 'Customer Support',
    email: 'j.lee@company.com',
    manager: 'Casey Kim',
    team: 'Customer Success',
    currentProject: 'Customer Onboarding Automation',
    yearsInCompany: 2.5
  },
  {
    name: 'Daniel Garcia',
    jobTitle: 'Mobile Developer',
    department: 'Engineering',
    email: 'd.garcia@company.com',
    manager: 'Alex Thompson',
    team: 'Mobile',
    currentProject: 'Mobile App Development',
    yearsInCompany: 1
  },
  {
    name: 'Sophia Williams',
    jobTitle: 'Graphic Designer',
    department: 'Design',
    email: 's.williams@company.com',
    manager: 'Jamie Rodriguez',
    team: 'Graphic Design',
    currentProject: 'Product Launch',
    yearsInCompany: 2
  },
  {
    name: 'Robert Johnson',
    jobTitle: 'QA Engineer',
    department: 'Engineering',
    email: 'r.johnson@company.com',
    manager: 'Alex Thompson',
    team: 'QA',
    currentProject: 'Website Redesign',
    yearsInCompany: 3.5
  },
  {
    name: 'Zoe Adams',
    jobTitle: 'Product Researcher',
    department: 'Product',
    email: 'z.adams@company.com',
    manager: 'Morgan Williams',
    team: 'Product Research',
    currentProject: 'Market Research',
    yearsInCompany: 1.5
  },
  {
    name: 'Brandon Taylor',
    jobTitle: 'Account Manager',
    department: 'Sales',
    email: 'b.taylor@company.com',
    manager: 'Taylor Washington',
    team: 'Direct Sales',
    currentProject: 'Sales Dashboard',
    yearsInCompany: 4
  },
  {
    name: 'Natalie Rivera',
    jobTitle: 'Email Marketing Specialist',
    department: 'Marketing',
    email: 'n.rivera@company.com',
    manager: 'Jamie Rodriguez',
    team: 'Email Marketing',
    currentProject: 'Product Launch',
    yearsInCompany: 2
  },
  {
    name: 'Thomas Wright',
    jobTitle: 'Security Engineer',
    department: 'Engineering',
    email: 't.wright@company.com',
    manager: 'Alex Thompson',
    team: 'Backend',
    currentProject: 'Security Audit',
    yearsInCompany: 3
  },
  {
    name: 'Olivia Brown',
    jobTitle: 'Recruitment Specialist',
    department: 'Human Resources',
    email: 'o.brown@company.com',
    manager: 'Emily Thompson',
    team: 'Recruitment',
    currentProject: 'Employee Portal',
    yearsInCompany: 1
  },
  {
    name: 'Andrew Scott',
    jobTitle: 'Web Designer',
    department: 'Design',
    email: 'a.scott@company.com',
    manager: 'Jamie Rodriguez',
    team: 'Web Design',
    currentProject: 'Website Redesign',
    yearsInCompany: 2.5
  },
  {
    name: 'Jasmine Wong',
    jobTitle: 'Technical Support Specialist',
    department: 'Customer Support',
    email: 'j.wong@company.com',
    manager: 'Casey Kim',
    team: 'Technical Support',
    currentProject: 'Customer Onboarding Automation',
    yearsInCompany: 1.5
  },
  {
    name: 'Christopher Martin',
    jobTitle: 'Investment Analyst',
    department: 'Finance',
    email: 'c.martin@company.com',
    manager: 'Casey Kim',
    team: 'Investment',
    currentProject: 'Q3 Financial Reporting',
    yearsInCompany: 3
  },
  {
    name: 'Michelle Davis',
    jobTitle: 'SEO Specialist',
    department: 'Marketing',
    email: 'm.davis@company.com',
    manager: 'Jamie Rodriguez',
    team: 'SEO',
    currentProject: 'Website Redesign',
    yearsInCompany: 2
  },
  {
    name: 'Ryan Wilson',
    jobTitle: 'Channel Sales Manager',
    department: 'Sales',
    email: 'r.wilson@company.com',
    manager: 'Taylor Washington',
    team: 'Channel Sales',
    currentProject: 'Sales Dashboard',
    yearsInCompany: 4.5
  },
  {
    name: 'Emma Clark',
    jobTitle: 'UX Researcher',
    department: 'Product',
    email: 'e.clark@company.com',
    manager: 'Morgan Williams',
    team: 'User Experience',
    currentProject: 'Mobile App Development',
    yearsInCompany: 1
  }
];

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(async () => {
    console.log('✅ Connected to MongoDB for seeding');

    try {
      // Drop existing collection
      await Employee.deleteMany({});
      console.log('Cleared existing employees collection');

      // Insert new employees
      const createdEmployees = await Employee.insertMany(employeesData);
      console.log(`Successfully seeded database with ${createdEmployees.length} employees`);

      // Exit process
      mongoose.connection.close();
      console.log('Database connection closed');
    } catch (err) {
      console.error('Error seeding database:', err);
    }
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
  }); 