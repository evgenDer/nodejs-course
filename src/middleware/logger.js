const { createLogger, format, transports } = require('winston');
const { combine, timestamp } = format;
const path = require('path');

const logger = createLogger({
  level: 'silly',
  format: combine(format.colorize(), format.cli()),
  transports: [
    new transports.Console(),
    new transports.File({
      level: 'error',
      filename: path.resolve(__dirname, '../../logs/error.log'),
      format: format.combine(timestamp(), format.uncolorize(), format.json())
    }),
    new transports.File({
      level: 'info',
      filename: path.resolve(__dirname, '../../logs/info.log'),
      format: format.combine(timestamp(), format.uncolorize(), format.json())
    })
  ]
});

module.exports = logger;
