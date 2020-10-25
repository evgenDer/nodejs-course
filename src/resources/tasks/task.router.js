const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/:boardId/tasks').get(async (req, res) => {
  const tasks = await tasksService.getAll({ boardId: req.params.boardId });
  res.json(tasks.map(Task.toResponse));
});

router.route('/:boardId/tasks/:taskId').get(async (req, res, next) => {
  try {
    const { boardId, taskId } = req.params;
    const task = await tasksService.get(boardId, taskId);
    if (!task) {
      res.status(404).send(`The task with board id: ${boardId} was not found`);
    } else {
      res.json(Task.toResponse(task));
    }
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId/tasks').post(async (req, res) => {
  const { boardId } = req.params;
  const task = await tasksService.create({ ...req.body, boardId });
  res.json(Task.toResponse(task));
});

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  const task = await tasksService.update(
    req.params.boardId,
    req.params.taskId,
    { ...req.body }
  );
  res.status(200).send(Task.toResponse(task));
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res, next) => {
  try {
    const { taskId, boardId } = req.params;
    await tasksService.remove(boardId, taskId);
    res.status(204).send('Deleted');
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
