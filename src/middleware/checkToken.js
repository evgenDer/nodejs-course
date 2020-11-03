const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY, PATH_WHITELIST } = require('../common/config');

module.exports = (req, res, next) => {
  if (PATH_WHITELIST.includes(req.path)) {
    return next();
  }
  const authHeader = req.headers.authorization;
  if (authHeader !== undefined) {
    const [type, token] = authHeader.split(' ');
    if (type === 'Bearer' && jwt.verify(token, JWT_SECRET_KEY)) {
      return next();
    }
  }
  res.status(401).send('Unauthorized');
};
