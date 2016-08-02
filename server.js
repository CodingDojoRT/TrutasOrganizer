import restify from 'restify'
import config from './config'
import logger from 'winston'

logger.level = config.logLevel || 'debug'

let server = restify.createServer()

server.listen(config.port, function(){
  logger.info(`Server listening at port ${config.port}`)
})
