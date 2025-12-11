const winston = require("winston");
const logger = winston.createLogger({
  level: "info",
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "errors.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "requests.log",
      level: "info",
    }),
  ],
});
module.exports = logger;
