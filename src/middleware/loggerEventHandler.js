const logger = require('./logger');

const loggerEventHandler = (req, res, next) => {
  const { query, body, url, method } = req;
  logger.info({
    message: `${
      res.statusCode
    } ${method}: ${url}. Query params: ${JSON.stringify(
      query
    )}. Request body: ${JSON.stringify(body)}.`
  });
  next();
};

module.exports = loggerEventHandler;
