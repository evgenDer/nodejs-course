const DATA_BASE = require('../../common/dataBase');

const getAll = async () => DATA_BASE.getAllUsers();

const get = async id => {
  const user = await DATA_BASE.getUser(id);

  if (!user) {
    throw new Error(`The user with id: ${id} was not found`);
  }

  return user;
};

const create = async user => DATA_BASE.createUser(user);

const update = async (id, user) => DATA_BASE.updateUser(id, user);

const remove = async id => {
  const isDeleted = await DATA_BASE.deleteUser(id);

  if (!isDeleted) {
    throw new Error(`The user with id: ${id} was not found`);
  }
};

module.exports = { getAll, get, create, update, remove };
