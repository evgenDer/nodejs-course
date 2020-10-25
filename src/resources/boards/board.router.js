const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const tasksService = require('../tasks/task.memory.repository');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const board = await boardsService.get(req.params.id);
    if (!board) {
      res.status(404).send(`The board id: ${req.params.id} was not found`);
    } else {
      res.status(200).send(Board.toResponse(board));
    }
  } catch (error) {
    return next(error);
  }
});

router.route('/').post(async (req, res) => {
  const board = await boardsService.create({ ...req.body });
  res.json(Board.toResponse(board));
});

router.route('/:id').put(async (req, res) => {
  const board = await boardsService.update(req.params.id, { ...req.body });
  if (!board) {
    res.status(404).send(`The board id: ${req.params.id} was not found`);
  } else {
    res.status(200).send(Board.toResponse(board));
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    await boardsService.remove(req.params.id);
    await tasksService.deleteTasksByBoardId(req.params.id);
    res.status(204).send('Deleted');
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
