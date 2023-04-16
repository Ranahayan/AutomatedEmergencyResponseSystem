const winston = require("winston");
const { createLogger, transports, format } = winston;
const MongoDB = require("winston-mongodb").MongoDB;

const logger = createLogger({
  format: format.combine(
    format.errors({ stack: false }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.File({
      filename: "combined.log",
    }),
    new transports.Console({
      format: winston.format.simple(),
    }),
  ],
  exceptionHandlers: [
    new transports.File({
      filename: "UnhandledExceptions.log",
      format: winston.format.simple(),
    }),
    new MongoDB({
      db: "mongodb://0.0.0.0:27017/FYP",
      level: "info",
    }),
  ],
  rejectionHandlers: [
    new transports.File({
      filename: "UnhandledExceptions.log",
      format: winston.format.simple(),
    }),
    new transports.Console({
      format: winston.format.simple(),
    }),
    new MongoDB({
      db: "mongodb://0.0.0.0:27017/FYP",
      level: "info",
    }),
  ],
});

module.exports = logger;
