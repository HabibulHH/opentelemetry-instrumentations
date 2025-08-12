const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format:winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.metadata({
          fillExcept: ['message', 'level', 'timestamp', 'traceId', 'spanId']
        }),
    )
})

module.exports = logger;