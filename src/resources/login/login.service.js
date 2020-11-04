const jwt = require('jsonwebtoken');
const userService = require('../users/user.service');
const { compare } = require('bcrypt');
const { JWT_SECRET_KEY } = require('../../common/config');

const loginUser = async (login, password) => {
  const user = await userService.getByLogin(login);
  if (user) {
    if (await compare(password, user.password)) {
      const token = jwt.sign({ id: user._id, login }, JWT_SECRET_KEY);
      return token;
    }
  }
  return null;
};

module.exports = { loginUser };
