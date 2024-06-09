const logger = require('../utils/logger')

const routeHealth = (route, app) => {
    app.get(route, async (req, res) => {
        logger.info('Node App => ALIVE !!')
        res.status(200).send('Node App => ALIVE')
    })
}

module.exports = routeHealth
