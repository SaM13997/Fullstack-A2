import React from 'react'
import { useQuery, gql } from '@apollo/client'
import EmployeeTable from './EmployeeTable'
import { useOutletContext } from 'react-router'

const GET_EMPLOYEES = gql`
	query GetEmployees {
		employees {
			_id
			FirstName
			LastName
			Age
			DateOfJoining
			Title
			Department
			EmployeeType
			CurrentStatus
		}
	}
`

function Employees(props) {
	const { loading, error, data } = useQuery(GET_EMPLOYEES)
	if (loading) return <p>Loading...</p>
	if (error) return <p>Error: {error.message}</p>

	return (
		<div>
			<EmployeeTable employees={data.employees} />
		</div>
	)
}

export default Employees
