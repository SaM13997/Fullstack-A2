const EmployeeTable = (props) => {
	const { employees } = props

	return (
		<div className=" overflow-hidden p-2">
			<h2 className="text-lg font-semibold text-gray-800 py-2 px-4 bg-gray-200">
				Employee Table
			</h2>
			<div className="overflow-x-auto bg-gray-200 ">
				<table className="min-w-full rounded-lg">
					<thead>
						<tr className="bg-gray-200 border border-zinc-700 ">
							<th className="px-4 py-2 border border-zinc-700">First Name</th>
							<th className="px-4 py-2 border border-zinc-700">Last Name</th>
							<th className="px-4 py-2 border border-zinc-700">Age</th>
							<th className="px-4 py-2 border border-zinc-700">
								Date Of Joining
							</th>
							<th className="px-4 py-2 border border-zinc-700">Title</th>
							<th className="px-4 py-2 border border-zinc-700">Department</th>
							<th className="px-4 py-2 border border-zinc-700">
								Employee Type
							</th>
							<th className="px-4 py-2 border border-zinc-700">
								Current Status
							</th>
						</tr>
					</thead>
					<tbody>
						{employees.map((employee) => (
							<tr key={employee._id} className="border-b">
								<td className="px-4 py-2 border border-zinc-700">
									{employee.FirstName}
								</td>
								<td className="px-4 py-2 border border-zinc-700">
									{employee.LastName}
								</td>
								<td className="px-4 py-2 border border-zinc-700">
									{employee.Age}
								</td>
								<td className="px-4 py-2 border border-zinc-700">
									{new Date(employee.DateOfJoining).toDateString()}
								</td>
								<td className="px-4 py-2 border border-zinc-700">
									{employee.Title}
								</td>{' '}
								<td className="px-4 py-2 border border-zinc-700">
									{employee.Department}
								</td>
								<td className="px-4 py-2 border border-zinc-700">
									{employee.EmployeeType}
								</td>
								<td className="px-4 py-2 border border-zinc-700">
									{employee.CurrentStatus ? 'Working' : 'Retired'}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default EmployeeTable
