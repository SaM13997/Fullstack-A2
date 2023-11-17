const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const PORT = process.env.PORT || 5000
const Employee = require('../models/Employee')
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('../GraphQL/schema')
const resolvers = require('../GraphQL/resolvers')
mongoose.connect(
	'mongodb+srv://webdevsam251:y5WPpiLFi6QKmuFd@sem3-react.vc08bfs.mongodb.net/EMSDB?retryWrites=true&w=majority',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
)

async function startServer() {
	const app = express()
	console.log('hello')
	app.use(express.json())
	app.use(cors())

	// Set up Apollo Server
	const server = new ApolloServer({ typeDefs, resolvers })

	// Start Apollo Server
	await server.start()

	// Apply Apollo Server middleware to your Express app
	server.applyMiddleware({ app, path: '/graphql' })

	// Start the Express server
	const PORT = process.env.PORT || 4000
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`)
	})
}

startServer()
