import React, { useState } from 'react'

const graphqlQuery = `
  query SearchEmployees($searchParams: SearchCriteria) {
    searchEmployees(input: $searchParams) {
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

const EmployeeSearch = ({ setFilteredData, foo }) => {
	console.log(foo)
	const [searchParams, setSearchParams] = useState({
		FirstName: '',
		LastName: '',
		Age: '',
		Title: '',
		Department: '',
		EmployeeType: '',
		CurrentStatus: '',
	})
	const handleTypeSelection = (selectedType) => {
		setSearchParams({ ...searchParams, EmployeeType: selectedType })
	}
	const employeeTypes = ['FullTime', 'PartTime', 'Contract', 'Seasonal']

	const handleSearch = () => {
		const variables = {
			searchParams,
		}
		fetch('http://localhost:4000/graphql', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query: graphqlQuery,
				variables: variables,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				setFilteredData(data.data.searchEmployees)
			})
			.catch((error) => {
				console.error(error)
			})
	}

	return (
		<div className="bg-slate-200 mb-4 p-4 rounded-lg shadow-md flex flex-col justify-center items-center">
			<h2 className="text-2xl font-semibold mb-4">Employee Search</h2>
			<div className="grid grid-cols-1 gap-4">
				<div className="flex flex-col items-center border border-zinc-800 rounded-lg p-2">
					<label
						htmlFor="employeeType"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Employee Type:
					</label>
					<div className="flex space-x-2">
						{employeeTypes.map((type) => (
							<button
								key={type}
								className={`${
									searchParams.EmployeeType === type
										? 'bg-slate-900 text-white'
										: 'bg-gray-200 text-gray-700'
								} rounded-lg px-4 py-2 focus:outline-none`}
								onClick={() => handleTypeSelection(type)}
							>
								{type}
							</button>
						))}
					</div>
				</div>
			</div>
			<div className="flex">
				<button
					className="text-white mt-4 rounded-lg bg-slate-900 px-6 py-3 "
					onClick={handleSearch}
				>
					Search
				</button>
				<button
					onClick={() => setFilteredData(null)}
					className="text-zinc-900 mt-4 rounded-lg px-6 py-3"
				>
					Reset Table
				</button>
			</div>
		</div>
	)
}

export default EmployeeSearch
