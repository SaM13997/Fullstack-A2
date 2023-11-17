const Employee = require('../models/Employee')
const resolvers = {
	Query: {
		employees: async () => {
			try {
				const employees = await Employee.find({})
				return employees
			} catch (error) {
				throw new Error('Error fetching data')
			}
		},
		searchEmployees: async (parent, args) => {
			// Build a query based on the provided filters
			const query = {}

			Object.keys(args.input).forEach((key) => {
				if (args.input[key] !== '') {
					query[key] = args.input[key]
				}
			})

			try {
				const employees = await Employee.find(query)
				return employees
			} catch (error) {
				throw new Error('Error fetching filtered data')
			} finally {
				console.log(query)
			}
		},
		employeeDetails: async (parent, { _id }) => {
			try {
				const employee = await Employee.findById(_id)
				return employee
			} catch (error) {
				console.error('Error fetching employee details:', error)
				throw new Error('Error fetching employee details')
			}
		},
	},
	Mutation: {
		createEmployee: async (parent, args) => {
			try {
				const newEmployee = new Employee(args.input)
				await newEmployee.save()
				return newEmployee
			} catch (error) {
				throw new Error('Error creating employee')
			} finally {
				console.log(args)
			}
		},
		updateEmployee: async (parent, { _id, input }) => {
			try {
				const employee = await Employee.findById(_id)

				if (!employee) {
					throw new Error('Employee not found')
				}

				// Update only allowed fields
				if (input.Title) employee.Title = input.Title
				if (input.Department) employee.Department = input.Department
				if (input.CurrentStatus == 'true') {
					employee.CurrentStatus = Boolean(input.CurrentStatus)
				} else {
					employee.CurrentStatus = !Boolean(input.CurrentStatus)
				}

				await employee.save()

				return employee
			} catch (error) {
				console.error('Error updating employee:', error)
				throw new Error('Error updating employee')
			}
		},
		deleteEmployee: async (parent, { _id }) => {
			try {
				const employee = await Employee.findByIdAndDelete(_id)

				if (!employee) {
					throw new Error('Employee not found')
				}

				return employee
			} catch (error) {
				console.error('Error deleting employee:', error)
				throw new Error('Error deleting employee')
			}
		},
	},
}

module.exports = resolvers
