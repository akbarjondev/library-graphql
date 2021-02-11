const http = require('http')
const express = require('express')
const modules = require('./modules/')
const CONFIG = require('./config/config')
const { ApolloServer } = require('apollo-server-express')


const server = new ApolloServer({ modules })
const app = express()
server.applyMiddleware({ app, path: '/graphql' })
const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

httpServer.listen({ port: CONFIG.PORT }, () => console.log(`Ready at http://localhost:${CONFIG.PORT}`))
