const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
	FirstName: {
		type: String,
		required: true,
	},
	LastName: {
		type: String,
		required: true,
	},
	Age: {
		type: Number,
		required: true,
	},
	DateOfJoining: {
		type: Date,
		required: true,
	},
	Title: {
		type: String,
		enum: ['Employee', 'Manager', 'Director', 'VP'],
		required: true,
	},
	Department: {
		type: String,
		enum: ['IT', 'Marketing', 'HR', 'Engineering'],
		required: true,
	},
	EmployeeType: {
		type: String,
		enum: ['FullTime', 'PartTime', 'Contract', 'Seasonal'],
		required: true,
	},
	CurrentStatus: {
		type: Boolean,
		default: true, // Default to "working" (true)
	},
})

// Create a model based on the schema
const Employee = mongoose.model('Employee', employeeSchema)

// Export the Employee model
module.exports = Employee
