const { data } = require('./model')
const { PubSub } = require('apollo-server-express')
const pubsub = new PubSub()

module.exports = {
	Query: {
		user: (_, { userId }) => data.find(e => e.userId === userId),
		users: () => data
	},
	Mutation: {
		addUser: (_, { username, password }) => {
			data.push({userId: data.length + 1, username, password})



			return {
				code: 200,
				message: 'new User added.'
			}
		},

		editUser: (_, { userId, username, password }) => {
			const foundUser = data.find(e => e.userId === userId)
			foundUser.username = username ? username : foundUser.username
			foundUser.password = password ? password : foundUser.password

			return {
				code: 200,
				message: 'User has been edited.'
			}
		}
	}
}