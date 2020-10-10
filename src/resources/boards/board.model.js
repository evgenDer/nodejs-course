const uuid = require('uuid');

class Board {
  constructor({ id = uuid(), title, columns } = {}) {
    this.id = id;
    this.columns = columns;
    this.title = title;
  }

  static toResponse(board) {
    const { id, columns, title } = board;
    return { id, columns, title };
  }
}

module.exports = Board;
