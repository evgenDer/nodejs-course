const DATA_BASE = require('../../common/dataBase');

const getAll = async () => DATA_BASE.getAllBoards();

const get = async id => {
  const board = await DATA_BASE.getBoard(id);

  if (!board) {
    throw new Error(`The board with id: ${id} was not found`);
  }

  return board;
};

const create = async board => DATA_BASE.createBoard(board);

const update = async (id, board) => DATA_BASE.updateBoard(id, board);

const remove = async id => {
  const isDeleted = await DATA_BASE.deleteBoard(id);

  if (!isDeleted) {
    throw new Error(`The board with id: ${id} was not found`);
  }
};

module.exports = { getAll, get, create, update, remove };
