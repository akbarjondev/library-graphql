const { gql } = require('apollo-server-express')

module.exports = gql`
	scalar Response

	extend type Query {
		user(userId: Int!): User!
		users: [User!]!
	}

	extend type Subscription {
		newUser: User!
	}

	extend type Mutation {
		addUser(username: String! password: String!): Response
		editUser(userId: Int! username: String password: String): Response
	}

	type User {
		userId: Int!
		username: String!
		password: String
	}
`