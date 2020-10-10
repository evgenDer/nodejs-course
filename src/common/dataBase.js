const DATA_BASE = {
  users: [],
  tasks: {},
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
    updateUserId(id);
    return true;
  }
  return false;
};

const updateUserId = id => {
  const arrayBoardId = Object.values(DATA_BASE.tasks);
  arrayBoardId.forEach(board => {
    board.map(task => {
      if (task.userId === id) {
        task.userId = null;
      }
    });
  });
};

const getAllBoards = async () => DATA_BASE.boards.slice(0);

const getBoard = async id => DATA_BASE.boards.filter(el => el.id === id)[0];

const createBoard = async board => {
  DATA_BASE.boards.push(board);
  DATA_BASE.tasks[board.id] = [];
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
    delete DATA_BASE.tasks[deletedBoard.id];
    return true;
  }
  return false;
};

const getAllTasks = async boardId => {
  const board = await getBoard(boardId);
  if (board) {
    return DATA_BASE.tasks[boardId];
  }
  return null;
};

const getTask = async (boardId, taskId) => {
  return DATA_BASE.tasks[boardId].filter(el => el.id === taskId)[0];
};

const createTask = async (boardId, task) => {
  const board = await getBoard(boardId);
  if (board) {
    DATA_BASE.tasks[boardId].push(task);
  }

  return task;
};

const updateTask = async (boardId, taskId, task) => {
  const oldTask = await getTask(boardId, taskId);
  const oldTaskNumber = DATA_BASE.tasks[boardId].indexOf(oldTask);
  // eslint-disable-next-line require-atomic-updates
  DATA_BASE.tasks[boardId][oldTaskNumber] = { ...task };
  return getTask(boardId, taskId);
};

const deleteTask = async (boardId, taskId) => {
  const deletedTask = await getTask(boardId, taskId);
  if (deletedTask) {
    DATA_BASE.tasks[boardId].splice(
      DATA_BASE.tasks[boardId].indexOf(deletedTask),
      1
    );
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
  deleteBoard,
  getTask,
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
};
