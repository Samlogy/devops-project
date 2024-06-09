const express = require('express')
const path = require('path')

const { metricsMiddleware } = require('../middlewares/monitoring')

const routeHealth = require('../routes/health')
const routeMonitoring = require('../routes/monitoring')
const { routeS3, routeRDS } = require('../routes/aws.routes')
const routeTodo = require('../routes/todo.routes')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.SERVER_PORT || 3000

        this.configureMiddleware()
        this.configureRoutes()
    }

    configureMiddleware() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))

        this.app.use(metricsMiddleware)

        this.app.use(express.static(path.join(__dirname, 'public')))
        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, 'public', 'index.html'))
        })
    }

    configureRoutes() {
        routeHealth('/health', this.app)
        routeMonitoring('/monitoring', this.app)

        // routeS3('/', this.app)
        // routeRDS('/', this.app)

        routeTodo('/todos', this.app)

        // others routes => tracing,
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Server => ${this.port}`)
        })
    }
}

module.exports = Server
