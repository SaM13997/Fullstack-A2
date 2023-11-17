import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function HomeLayout(props) {
	return (
		<div className="bg-zinc-900 p-4 h-[100dvh]">
			<nav className="flex justify-between items-center bg-white px-4 py-2 rounded-xl shadow-sm shadow-zinc-400 mb-4">
				<Link to="/">
					<h1 className="text-3xl font-semibold">Employee Directory</h1>
				</Link>
				<div className="flex gap-2 items-center [&>*]:text-amber-500 font-semibold text-xl">
					<Link to="/employees/create">Create</Link>
					<Link to="/employees/search">Search</Link>
				</div>
			</nav>
			<Outlet
				context={{
					client: props.client,
				}}
			/>
		</div>
	)
}

export default HomeLayout
