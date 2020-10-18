const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const board = await boardsService.get(req.params.id);
    res.json(Board.toResponse(board));
  } catch (error) {
    return next(error);
  }
});

router.route('/').post(async (req, res) => {
  const board = await boardsService.create(new Board({ ...req.body }));
  res.json(Board.toResponse(board));
});

router.route('/:id').put(async (req, res) => {
  const board = await boardsService.update(
    req.params.id,
    new Board({ ...req.body })
  );
  res.status(200).send(Board.toResponse(board));
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    await boardsService.remove(req.params.id);
    res.status(204).send('Deleted');
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
