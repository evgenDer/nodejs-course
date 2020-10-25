const Task = require('./task.model');

const updateUserIDInTask = async id =>
  Task.updateMany({ userId: id }, { userId: null });

const deleteTasksByBoardId = async id => Task.deleteMany({ boardId: id });

const getAll = async id => Task.find(id);

const get = async (boardId, taskId) => Task.findOne({ boardId, _id: taskId });

const create = async task => Task.create(task);

const update = async (boardId, taskId, task) =>
  Task.findOneAndUpdate({ _id: taskId }, task);

const remove = async (boardId, taskId) =>
  Task.findOneAndRemove({ boardId, _id: taskId });

module.exports = {
  getAll,
  get,
  create,
  update,
  remove,
  updateUserIDInTask,
  deleteTasksByBoardId
};
