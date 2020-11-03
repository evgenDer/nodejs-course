const jwt = require('jsonwebtoken');
const userService = require('../users/user.service');
const { compare } = require('bcrypt');
const { JWT_SECRET_KEY } = require('../../common/config');

const loginUser = async (login, password) => {
  const user = await userService.getByLogin(login);

  if (user) {
    console.log(await compare(user.password, password));
    // if (await compare(user.password, password)) {
    const token = jwt.sign({ id: user._id, login }, JWT_SECRET_KEY);
    console.log(token);
    return token;
    // }
  }
  return null;
};

module.exports = { loginUser };
