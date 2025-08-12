const winston = require('winston');
const opentelemetry = require('@opentelemetry/api');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.metadata({
      fillExcept: ['message', 'level', 'timestamp', 'traceId', 'spanId']
    }),
    winston.format((info) => {
      const activeSpan = opentelemetry.trace.getActiveSpan();
      if (activeSpan) {
        const spanContext = activeSpan.spanContext();
        info.traceId = spanContext.traceId;
        info.spanId = spanContext.spanId;
      }
      return info;
    })()
  ),
  transports:[
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.Console()
  ]
});

module.exports = logger;