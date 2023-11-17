import React from 'react'
import { useQuery, gql } from '@apollo/client'
import EmployeeTable from './EmployeeTable'
import { useOutletContext } from 'react-router'
import EmployeeTypeSearch from './EmployeeTypeSearch'

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
	const [filteredData, setFilteredData] = React.useState(null)
	console.log(filteredData)
	const { client } = useOutletContext()
	const { loading, error, data } = useQuery(GET_EMPLOYEES)
	if (loading) return <p>Loading...</p>
	if (error) return <p>Error: {error.message}</p>
	const tableData = filteredData ? filteredData : data.employees

	return (
		<>
			<EmployeeTypeSearch setFilteredData={setFilteredData} client={client} />
			<EmployeeTable employees={tableData} />
		</>
	)
}
export default Employees
