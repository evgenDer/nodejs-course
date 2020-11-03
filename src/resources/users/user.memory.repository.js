const User = require('./user.model');
const { hash } = require('bcrypt');
const SALT_ROUNDS = 10;

const getAll = async () => User.find({});

const get = async id => User.findOne({ _id: id });

const create = async user => {
  const hashedPassword = await hash(user.password, SALT_ROUNDS);
  return User.create({ ...user, password: hashedPassword });
};

const update = async (id, user) =>
  User.findOneAndUpdate({ _id: id }, user, { new: true });

const remove = async id => User.remove({ _id: id }).n !== 0;

const getByLogin = async login => User.findOne({ login });

module.exports = { getAll, get, create, update, remove, getByLogin };
