const DATA_BASE = {
  users: [],
  tasks: [],
  boards: []
};

const getAllUsers = async () => DATA_BASE.slice(0);

const getUser = async id => DATA_BASE.filter(el => el.id === id)[0];

const createUser = async user => {
  DATA_BASE.push(user);
  return user;
};

const updateUser = async (id, user) => {
  const oldUser = await getUser(id);
  const oldUserNumber = DATA_BASE.indexOf(oldUser);
  DATA_BASE[oldUserNumber] = { ...user };
  return getUser(id);
};

const deleteUser = async id => {
  const deletedUser = await getUser(id);
  if (deletedUser) {
    DATA_BASE.splice(DATA_BASE.indexOf(deletedUser), 1);
    return true;
  }
  return false;
};

module.exports = { getUser, getAllUsers, createUser, updateUser, deleteUser };
