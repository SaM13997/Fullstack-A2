import React, { useState } from 'react'

const CREATE_EMPLOYEE = `
	mutation CreateEmployee($input: EmployeeInput!) {
		createEmployee(input: $input) {
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

const EmployeeCreate = () => {
	const [formData, setFormData] = useState({
		FirstName: '',
		LastName: '',
		Age: '',
		DateOfJoining: '',
		Title: '',
		Department: '',
		EmployeeType: '',
		CurrentStatus: true, // Default to "working"
	})
	const [ageError, setAgeError] = useState(null)
	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}
	const graphqlEndpoint = 'http://localhost:4000/graphql'

	const handleSubmit = async (e) => {
		e.preventDefault()
		const age = parseInt(formData.Age, 10)
		if (age < 20 || age > 70) {
			setAgeError('Age must be between 20 and 70')
			alert('Age must be between 20 and 70')
			return
		}
		setAgeError('')
		const variables = {
			input: formData,
		}
		fetch(graphqlEndpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query: CREATE_EMPLOYEE,
				variables,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.errors) {
					console.error('GraphQL Error:', data.errors)
					alert('Error creating employee')
				} else {
					const createdEmployee = data.data.createEmployee
					alert('Employee created successfully')
				}
			})
			.catch((error) => {
				console.error('Network Error:', error)
				alert('Error creating employee')
			})
	}

	return (
		<div className="bg-amber-100 p-4 flex flex-col justify-center items-center">
			<h2 className="text-2xl font-bold mb-3">Create Employee</h2>
			<form className="grid grid-cols-2 gap-6 w-3/5" onSubmit={handleSubmit}>
				<div className="flex flex-col items-center">
					<label>First Name:</label>
					<input
						type="text"
						name="FirstName"
						value={formData.FirstName}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="flex flex-col items-center">
					<label>Last Name:</label>
					<input
						type="text"
						name="LastName"
						value={formData.LastName}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="flex flex-col items-center">
					<label>Age:</label>
					<input
						type="number"
						name="Age"
						value={formData.Age}
						onChange={handleChange}
						required
						className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500 ${
							ageError ? 'border-red-500' : ''
						}`}
					/>
					{ageError && <p className="text-red-500 text-sm">{ageError}</p>}
				</div>

				<div className="flex flex-col items-center">
					<label>Date of Joining:</label>
					<input
						type="date"
						name="DateOfJoining"
						value={formData.DateOfJoining}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="flex flex-col items-center">
					<label>Title:</label>
					<select
						name="Title"
						value={formData.Title}
						onChange={handleChange}
						required
					>
						<option value="">Select Title</option>
						<option value="Employee">Employee</option>
						<option value="Manager">Manager</option>
						<option value="Director">Director</option>
						<option value="VP">VP</option>
					</select>
				</div>

				<div className="flex flex-col items-center">
					<label>Department:</label>
					<select
						name="Department"
						value={formData.Department}
						onChange={handleChange}
						required
					>
						<option value="">Select Department</option>
						<option value="IT">IT</option>
						<option value="Marketing">Marketing</option>
						<option value="HR">HR</option>
						<option value="Engineering">Engineering</option>
					</select>
				</div>

				<div className="flex flex-col items-center">
					<label>Employee Type:</label>
					<select
						name="EmployeeType"
						value={formData.EmployeeType}
						onChange={handleChange}
						required
					>
						<option value="">Select Employee Type</option>
						<option value="FullTime">Full Time</option>
						<option value="PartTime">Part Time</option>
						<option value="Contract">Contract</option>
						<option value="Seasonal">Seasonal</option>
					</select>
				</div>

				<button
					className="col-span-2 bg-amber-300 rounded-xl px-6 py-3"
					type="submit"
				>
					Create Employee
				</button>
			</form>
		</div>
	)
}

export default EmployeeCreate
