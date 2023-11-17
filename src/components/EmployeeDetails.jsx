import React from 'react'
import { useOutletContext, useParams } from 'react-router'

function EmployeeDetails() {
	const context = useOutletContext()
	const { id } = useParams()
	return <div>EmployeeDetails</div>
}

export default EmployeeDetails
