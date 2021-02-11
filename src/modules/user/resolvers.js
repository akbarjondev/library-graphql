const { data } = require('./model')
const pubsub = require('./../../../lib/pubsub')

module.exports = {
	Query: {
		user: (_, { userId }) => data.find(e => e.userId === userId),
		users: () => data
	},
	
	Mutation: {
		addUser: (_, { username, password }) => {
			const user = {userId: data.length + 1, username, password}

			data.push(user)

			pubsub.publish('NEW_USER', user)

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
	},

	Subscription: {
		newUser: {
			subscribe: () => pubsub.asyncIterator(['NEW_USER']),
			resolve: (payload) => {
				return payload
			}
		}
	}
}