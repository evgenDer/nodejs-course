const DATA_BASE = {
  users: [],
  tasks: [],
  boards: []
};

const getAllUsers = async () => DATA_BASE.users.slice(0);

const getUser = async id => DATA_BASE.users.filter(el => el.id === id)[0];

const createUser = async user => {
  DATA_BASE.users.push(user);
  return user;
};

const updateUser = async (id, user) => {
  const oldUser = await getUser(id);
  const oldUserNumber = DATA_BASE.users.indexOf(oldUser);
  DATA_BASE.users[oldUserNumber] = { ...user };
  return getUser(id);
};

const deleteUser = async id => {
  const deletedUser = await getUser(id);
  if (deletedUser) {
    DATA_BASE.users.splice(DATA_BASE.users.indexOf(deletedUser), 1);
    return true;
  }
  return false;
};

const getAllBoards = async () => DATA_BASE.boards.slice(0);

const getBoard = async id => DATA_BASE.boards.filter(el => el.id === id)[0];

const createBoard = async board => {
  DATA_BASE.boards.push(board);
  return board;
};

const updateBoard = async (id, board) => {
  const oldBoard = await getBoard(id);
  const oldBoardNumber = DATA_BASE.boards.indexOf(oldBoard);
  DATA_BASE.boards[oldBoardNumber] = { ...board };
  return getBoard(id);
};

const deleteBoard = async id => {
  const deletedBoard = await getBoard(id);
  if (deletedBoard) {
    DATA_BASE.boards.splice(DATA_BASE.boards.indexOf(deletedBoard), 1);
    return true;
  }
  return false;
};

module.exports = {
  getUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getBoard,
  getAllBoards,
  createBoard,
  updateBoard,
  deleteBoard
};
