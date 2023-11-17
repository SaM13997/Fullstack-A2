import React from 'react'

function EmployeeUpdate(props) {
	const { formData, handleChange, handleUpdate } = props
	return (
		<div className="bg-white p-4 mt-4 rounded-lg">
			<h2 className="text-3xl font-bold">Update Employee</h2>
			<form className="flex flex-col [&>label]:mt-2">
				<label>Title: </label>
				<select
					name="Title"
					className="border border-gray-400 rounded-lg p-1"
					value={formData.Title}
					onChange={handleChange}
				>
					<option value="">Select Title</option>
					<option value="Employee">Employee</option>
					<option value="Manager">Manager</option>
					<option value="Director">Director</option>
					<option value="VP">VP</option>
				</select>

				<label>Department: </label>
				<select
					name="Department"
					className="border border-gray-400 rounded-lg p-1"
					value={formData.Department}
					onChange={handleChange}
				>
					<option value="">Select Department</option>
					<option value="IT">IT</option>
					<option value="Marketing">Marketing</option>
					<option value="HR">HR</option>
					<option value="Engineering">Engineering</option>
				</select>

				<label>Current Status: </label>
				<select
					name="CurrentStatus"
					value={formData.CurrentStatus}
					className="border border-gray-400 rounded-lg p-1"
					onChange={handleChange}
				>
					<option value="">Select Current Status</option>
					<option value={true}>Working</option>
					<option value={false}>Retired</option>
				</select>

				<button
					className="text-white mt-4 rounded-lg bg-slate-900 px-4 py-2 "
					type="button"
					onClick={handleUpdate}
				>
					Update Employee
				</button>
			</form>
		</div>
	)
}

export default EmployeeUpdate
