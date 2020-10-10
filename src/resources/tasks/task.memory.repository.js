const DATA_BASE = require('../../common/dataBase');

const getAll = async boardId => {
  const allTasks = DATA_BASE.getAllTasks(boardId);

  if (!allTasks) {
    throw new Error(`The task with board id: ${boardId} was not found`);
  }

  return allTasks;
};

const get = async (boardId, taskId) => {
  const task = await DATA_BASE.getTask(boardId, taskId);

  if (!task) {
    throw new Error(
      `The task with board id: ${boardId} and task id: ${taskId} was not found`
    );
  }

  return task;
};

const create = async (boardId, task) => DATA_BASE.createTask(boardId, task);

const update = async (boardId, taskId, task) =>
  DATA_BASE.updateTask(boardId, taskId, task);

const remove = async (boardId, taskId) => {
  const isDeleted = await DATA_BASE.deleteTask(boardId, taskId);
  if (!isDeleted) {
    throw new Error(
      `The task with board id: ${boardId} and task id: ${taskId} was not found`
    );
  }
};

module.exports = { getAll, get, create, update, remove };
