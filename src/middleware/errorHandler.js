const logger = require('./logger');

const errorHandler = (err, req, res) => {
  const { statusCode, message } = err;
  const { query, body, url, method } = req;

  logger.error(
    `${statusCode} ${method}: ${url}. Query params: ${JSON.stringify(
      query
    )}. Request body: ${JSON.stringify(body)}. Message: ${message}`
  );

  res.status(500).json(message);
};

module.exports = errorHandler;
