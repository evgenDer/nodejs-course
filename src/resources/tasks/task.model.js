const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    order = 0,
    description = 'task',
    userId = '111',
    title = 'task',
    columnId,
    boardId
  } = {}) {
    this.id = id;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.title = title;
    this.columnId = columnId;
    this.boardId = boardId;
  }

  static toResponse(task) {
    const { id, order, description, userId, title, columnId, boardId } = task;
    return { id, order, description, userId, title, columnId, boardId };
  }
}

module.exports = Task;
