const { GraphQLScalarType, Kind } = require('graphql')

const DateType = new GraphQLScalarType({
	name: 'Date',
	description: 'Date custom scalar type',
	serialize(value) {
		return value.toISOString()
	},
	parseValue(value) {
		return new Date(value)
	},
	parseLiteral(ast) {
		if (ast.kind === Kind.STRING) {
			return new Date(ast.value)
		}
		return null // Invalid date format
	},
})

const { gql } = require('apollo-server-express')

const typeDefs = gql`
	scalar Date

	enum TitleEnum {
		Employee
		Manager
		Director
		VP
	}

	enum DepartmentEnum {
		IT
		Marketing
		HR
		Engineering
	}

	enum EmployeeTypeEnum {
		FullTime
		PartTime
		Contract
		Seasonal
	}
	enum CurrentStatusEnum {
		Working
		Retired
	}

	type Employee {
		_id: ID
		FirstName: String
		LastName: String
		Age: Int
		DateOfJoining: Date
		Title: TitleEnum
		Department: DepartmentEnum
		EmployeeType: EmployeeTypeEnum
		CurrentStatus: Boolean
	}

	type Query {
		employees: [Employee]
		searchEmployees(input: SearchCriteria): [Employee]
		employeeDetails(_id: ID!): Employee
	}
	input SearchCriteria {
		FirstName: String
		LastName: String
		Age: String
		Title: String
		Department: String
		EmployeeType: String
		CurrentStatus: String
	}
	type Mutation {
		createEmployee(input: EmployeeInput!): Employee
		updateEmployee(_id: ID!, input: UpdateEmployeeInput!): Employee
		deleteEmployee(_id: ID!): Employee
	}

	input EmployeeInput {
		FirstName: String!
		LastName: String!
		Age: String!
		DateOfJoining: String!
		Title: String!
		Department: String!
		EmployeeType: String!
		CurrentStatus: Boolean!
	}
	input UpdateEmployeeInput {
		Title: String
		Department: String
		CurrentStatus: String
	}
`
module.exports = typeDefs
