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

const EmployeeSearch = ({ setFilteredData }) => {
	const [searchParams, setSearchParams] = useState({
		FirstName: '',
		LastName: '',
		Age: '',
		Title: '',
		Department: '',
		EmployeeType: '',
		CurrentStatus: '',
	})

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
		<div className="bg-slate-200 mb-4 p-4 rounded-lg shadow-md">
			<h2 className="text-2xl font-semibold mb-4">Employee Search</h2>
			<div className="grid grid-cols-2 gap-4">
				<div>
					<label
						htmlFor="firstName"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						First Name:
					</label>
					<input
						type="text"
						id="firstName"
						className="input"
						value={searchParams.FirstName}
						onChange={(e) =>
							setSearchParams({ ...searchParams, FirstName: e.target.value })
						}
					/>
				</div>
				<div>
					<label
						htmlFor="lastName"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Last Name:
					</label>
					<input
						type="text"
						id="lastName"
						className="input"
						value={searchParams.LastName}
						onChange={(e) =>
							setSearchParams({ ...searchParams, LastName: e.target.value })
						}
					/>
				</div>
				<div>
					<label
						htmlFor="age"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Age:
					</label>
					<input
						type="number"
						id="age"
						className="input"
						value={searchParams.Age}
						onChange={(e) =>
							setSearchParams({ ...searchParams, Age: e.target.value })
						}
					/>
				</div>
				<div>
					<label
						htmlFor="title"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Title:
					</label>
					<select
						id="title"
						className="input"
						value={searchParams.Title}
						onChange={(e) =>
							setSearchParams({ ...searchParams, Title: e.target.value })
						}
					>
						<option value="">Select Title</option>
						<option value="Employee">Employee</option>
						<option value="Manager">Manager</option>
						<option value="Director">Director</option>
						<option value="VP">VP</option>
					</select>
				</div>
				<div>
					<label
						htmlFor="department"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Department:
					</label>
					<select
						id="department"
						className="input"
						value={searchParams.Department}
						onChange={(e) =>
							setSearchParams({ ...searchParams, Department: e.target.value })
						}
					>
						<option value="">Select Department</option>
						<option value="IT">IT</option>
						<option value="Marketing">Marketing</option>
						<option value="HR">HR</option>
						<option value="Engineering">Engineering</option>
					</select>
				</div>
				<div>
					<label
						htmlFor="employeeType"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Employee Type:
					</label>
					<select
						id="employeeType"
						className="input"
						value={searchParams.EmployeeType}
						onChange={(e) =>
							setSearchParams({ ...searchParams, EmployeeType: e.target.value })
						}
					>
						<option value="">Select Employee Type</option>
						<option value="FullTime">FullTime</option>
						<option value="PartTime">PartTime</option>
						<option value="Contract">Contract</option>
						<option value="Seasonal">Seasonal</option>
					</select>
				</div>
				<div>
					<label
						htmlFor="currentStatus"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Current Status:
					</label>
					<select
						id="currentStatus"
						className="input"
						value={searchParams.CurrentStatus}
						onChange={(e) =>
							setSearchParams({
								...searchParams,
								CurrentStatus: e.target.value,
							})
						}
					>
						<option value="">Select Current Status</option>
						<option value="1">Working</option>
						<option value="0">Retired</option>
					</select>
				</div>
			</div>
			<button
				className=" text-white mt-4 rounded-lg bg-slate-900 px-6 py-3 "
				onClick={handleSearch}
			>
				Search
			</button>
		</div>
	)
}

export default EmployeeSearch
