import restify from 'restify'
import config from './config'
import logger from 'winston'

import EventsTranslator from './app/Events/Translator'

logger.level = config.logLevel || 'debug'

const version = require('./package.json').version

let server = restify.createServer()

server.get('/', function(req, res, next){
    res.json({
        version: version,
        now: new Date()
    })
})

server.get('/events', function (req, res, next) {
    let eventsTraslator = new EventsTranslator
    eventsTraslator.get(req, res, next)
})

server.listen(config.port, function(){
    logger.info(`Server listening at port ${config.port}`)
})
