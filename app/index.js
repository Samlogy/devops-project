const dotenv = require('dotenv')
dotenv.config({ path: '../.env' })

const Server = require('./utils/server')

const server = new Server()
server.start()
