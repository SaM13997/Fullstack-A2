import React, { useState, useEffect } from 'react'

import EmployeeSearch from './EmployeeSearch'
import EmployeeTable from './EmployeeTable'
import EmployeeCreate from './EmployeeCreate'
import { useQuery, gql } from '@apollo/client'
import { Link } from 'react-router-dom'

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

const Home = ({ client }) => {
	const [filteredData, setFilteredData] = useState('')
	const { loading, error, data } = useQuery(GET_EMPLOYEES)
	console.log(filteredData)
	if (loading) return <p>Loading...</p>
	if (error) return <p>Error: {error.message}</p>
	const handleResetTable = () => {
		setFilteredData('')
	}
	return (
		<div className="container mx-auto p-4">
			<div>
				<nav className="flex justify-between items-center bg-white px-4 py-2 rounded-xl shadow- shadow-zinc-600 mb-4">
					<h1 className="text-3xl font-semibold">Employee Directory</h1>
					<div className="flex gap-2 items-center [&>*]:text-red-500 font-semibold text-xl">
						<Link to="/">Create</Link>
						<Link to="/employee-list">Search</Link>
					</div>
				</nav>
			</div>
			{filteredData ? (
				<>
					<EmployeeTable employees={filteredData} />
					<button
						onClick={handleResetTable}
						className="bg-zinc-700 rounded-xl px-6 py-3"
					>
						Reset Table
					</button>
				</>
			) : (
				<>
					<EmployeeSearch setFilteredData={setFilteredData} client={client} />
					<EmployeeTable employees={data.employees} />
					<EmployeeCreate />
				</>
			)}
		</div>
	)
}

export default Home
