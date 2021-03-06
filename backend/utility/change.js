const { createLogger, format, transports } = require('winston');
// import * as logger from 'winston';

const customLevels = {
  levels: {
    change: 0
  }
};

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
      filename: `${__dirname}/../logs/log-change.log`,
      level: 'change'
    })
  ]
});
