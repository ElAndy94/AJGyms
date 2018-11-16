const { createLogger, format, transports } = require('winston');

const customLevels = {
  levels: {
      accessed: 0,
      error: 0,
      warn: 0
  }
}

module.exports = createLogger({
  format: format.combine(
    format.simple(),
    format.timestamp(),
    format.printf(info => `[${info.timestamp}] ${info.level} ${info.message}`)
  ),
  levels: customLevels.levels,
  transports: [
    new transports.File({
      maxsize: 5120000,
      maxFiles: 5,
      filename: `${__dirname}/../logs/log-api.log`
    }),
    new transports.File({
      maxsize: 5120000,
      maxFiles: 5,
      filename: `${__dirname}/../logs/log-access.log`,
      level: 'accessed'
    }),
    new transports.File({
      maxsize: 5120000,
      maxFiles: 5,
      filename: `${__dirname}/../logs/log-error.log`,
      level: 'error'
    }),
    new transports.File({
      maxsize: 5120000,
      maxFiles: 5,
      filename: `${__dirname}/../logs/log-warning.log`,
      level: 'warn'
    }),
    new transports.Console({
      level: 'debug'
    }),
  ]
});

