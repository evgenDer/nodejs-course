const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/:boardId/tasks').get(async (req, res) => {
  const tasks = await tasksService.getAll(req.params.boardId);
  res.json(tasks.map(Task.toResponse));
});

router.route('/:boardId/tasks/:taskId').get(async (req, res) => {
  try {
    const { boardId, taskId } = req.params;
    const task = await tasksService.get(boardId, taskId);
    res.json(Task.toResponse(task));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.route('/:boardId/tasks').post(async (req, res) => {
  const { boardId } = req.params;
  const task = await tasksService.create(
    boardId,
    new Task({ ...req.body, boardId })
  );
  res.json(Task.toResponse(task));
});

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  const task = await tasksService.update(
    req.params.boardId,
    req.params.taskId,
    new Task({ ...req.body })
  );
  res.status(200).send(Task.toResponse(task));
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  try {
    const { taskId, boardId } = req.params;
    await tasksService.remove(boardId, taskId);
    res.status(204).send('Deleted');
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
