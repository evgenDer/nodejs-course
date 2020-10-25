const uuid = require('uuid');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    order: Number,
    description: String,
    title: String,
    userId: String,
    boardId: String,
    columnId: String
  },
  { versionKey: false }
);

taskSchema.statics.toResponse = task => {
  const { id, order, description, userId, title, columnId, boardId } = task;
  return { id, order, description, userId, title, columnId, boardId };
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
