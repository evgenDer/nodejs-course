const User = require('./user.model');

const getAll = async () => User.find({});

const get = async id => User.findOne({ _id: id });

const create = async user => User.create(user);

const update = async (id, user) => User.findOneAndUpdate({ _id: id }, user);

const remove = async id => User.remove({ _id: id }).n !== 0;

module.exports = { getAll, get, create, update, remove };
