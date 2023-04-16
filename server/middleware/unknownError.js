const { createLogger, transports } = require("winston");
const MongodbTransport = require("winston-mongodb").MongoDB;

const logger = createLogger({
  transports: [
    new transports.File({
      filename: "endpointErrors.log",
      level: "info",
    }),

    new MongodbTransport({
      db: "mongodb://localhost/Restaurant",
      level: "info",
    }),

    new transports.Console(),
  ],
});

module.exports = function (err, req, res, next) {
  logger.error(err.message, err); //logging exception
  res.status(400).send("Something Failed");
};
