const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const tasksService = require('../tasks/task.memory.repository');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const user = await usersService.get(req.params.id);
    res.json(User.toResponse(user));
  } catch (error) {
    return next(error);
  }
});

router.route('/').post(async (req, res) => {
  const user = await usersService.create({ ...req.body });
  res.json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const user = await usersService.update(req.params.id, { ...req.body });
  res.status(200).send(User.toResponse(user));
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    await usersService.remove(req.params.id);
    await tasksService.updateUserIDInTask(req.params.id);
    res.status(204).send('Deleted');
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
