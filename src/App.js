import './App.css'
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from 'react-router-dom'

import EmployeeCreate from './components/EmployeeCreate'
import EmployeeSearch from './components/EmployeeSearch'

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import HomeLayout from './components/HomeLayout'
import Employees from './components/Employees'
import EmployeeDetails from './components/EmployeeDetails'

const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql', //GraphQL server endpoint
	cache: new InMemoryCache(),
})

function App() {
	return (
		<Router>
			<ApolloProvider client={client}>
				<Routes>
					<Route path="/" element={<Navigate to="/employees" />} />
					<Route path="/employees" element={<HomeLayout client={client} />}>
						<Route index element={<Employees />} />
						<Route path="create" element={<EmployeeCreate />} />
						<Route path="search" element={<EmployeeSearch />} />
						<Route path=":id" element={<EmployeeDetails />} />
					</Route>
					<Route
						path="*"
						element={<p className="text-[15rem] text-white">Not found</p>}
					/>
				</Routes>
			</ApolloProvider>
		</Router>
	)
}

export default App
