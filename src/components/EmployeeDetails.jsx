import { gql, useQuery, useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { useOutletContext, useParams } from 'react-router'
import { faker } from '@faker-js/faker'
import EmployeeUpdate from './EmployeeUpdate'

const GET_EMPLOYEE_DETAILS = gql`
	query GetEmployeeDetails($_id: ID!) {
		employeeDetails(_id: $_id) {
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
const UPDATE_EMPLOYEE = gql`
	mutation UpdateEmployee($_id: ID!, $input: UpdateEmployeeInput!) {
		updateEmployee(_id: $_id, input: $input) {
			_id
			Title
			Department
			CurrentStatus
		}
	}
`
const DELETE_EMPLOYEE = gql`
	mutation DeleteEmployee($_id: ID!) {
		deleteEmployee(_id: $_id) {
			_id
		}
	}
`
function EmployeeDetails() {
	const context = useOutletContext()
	const { id } = useParams()
	const [updateEmployeeVisible, setUpdateEmployeeVisible] = useState(false)
	const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false)
	const [deleted, setDeleted] = useState(false)

	const [updateEmployee] = useMutation(UPDATE_EMPLOYEE)
	const [deleteEmployeeMutation] = useMutation(DELETE_EMPLOYEE)

	const { loading, error, data } = useQuery(GET_EMPLOYEE_DETAILS, {
		variables: { _id: id },
	})
	const [formData, setFormData] = useState({
		Title: '',
		Department: '',
		CurrentStatus: '',
	})

	const handleUpdate = async () => {
		try {
			const { data } = await updateEmployee({
				variables: {
					_id: id,
					input: formData,
				},
			})

			console.log('Updated Employee:', data.updateEmployee)
		} catch (error) {
			console.error('Error updating employee23:', error)
		}
	}
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	const handleDeleteClick = () => {
		// Show the confirmation modal
		setConfirmDeleteVisible(true)
	}

	const handleConfirmDelete = async () => {
		try {
			// Call the deleteEmployee mutation
			await deleteEmployeeMutation({ variables: { _id: id } })
			setConfirmDeleteVisible(false)
			setDeleted(true)
		} catch (error) {
			console.error('Error deleting employee:', error)
		}
	}

	const handleCancelDelete = () => {
		// Close the confirmation modal
		setConfirmDeleteVisible(false)
	}

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error: {error.message}</p>
	const img = faker.image.avatar()
	const employee = data.employeeDetails
	return (
		<div>
			<p className={deleted ? 'uppercase ml-2 text-red-600' : 'hidden'}>
				deleted
			</p>
			<div
				className={
					deleted
						? 'w-full bg-white rounded-lg border-4 flex gap-4 border-red-500 p-4 relative'
						: 'w-full bg-white rounded-lg border flex gap-4 border-zinc-900 p-4 relative'
				}
			>
				<img src={img} alt="" className="inset-0 w-32 h-32" />
				<div className="flex flex-col justify-between w-full">
					<div>
						<div className="flex justify-between items-center w-full">
							<h1 className="text-4xl font-bold">
								{employee.FirstName} {employee.LastName}
							</h1>
							<p className="text-gray-600">Age: {employee.Age} </p>
						</div>
						<p className="font-semibold">
							{employee.Title}, {employee.Department}
						</p>
					</div>
					<div className="flex justify-between items-center w-full">
						<p>
							Date of Joining: &nbsp;
							{new Date(employee.DateOfJoining).toLocaleDateString({
								region: 'en-IN',
							})}
						</p>
						<div>
							<button
								className={
									updateEmployeeVisible || deleted
										? 'text-white rounded-lg bg-slate-500 px-4 py-2'
										: 'text-white rounded-lg bg-slate-900 px-4 py-2'
								}
								disabled={updateEmployeeVisible || deleted}
								onClick={() => setUpdateEmployeeVisible(true)}
							>
								Update
							</button>
							<button
								className={
									deleted
										? 'text-white rounded-lg bg-red-300 ml-2 px-4 py-2'
										: 'text-white rounded-lg bg-red-700 ml-2 px-4 py-2'
								}
								onClick={handleDeleteClick}
								disabled={deleted}
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			</div>
			{updateEmployeeVisible && (
				<EmployeeUpdate {...{ formData, handleChange, handleUpdate }} />
			)}
			{confirmDeleteVisible && (
				<div className="fixed inset-0 flex items-center justify-center">
					<div className="bg-white p-4 rounded-lg shadow-md">
						<p>Are you sure you want to delete this employee?</p>
						<div className="flex justify-end mt-4">
							<button
								className="text-white bg-red-700 px-4 py-2 rounded-lg mr-2"
								onClick={handleConfirmDelete}
							>
								Yes, Delete
							</button>
							<button
								className="text-gray-700 bg-gray-300 px-4 py-2 rounded-lg"
								onClick={handleCancelDelete}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default EmployeeDetails
