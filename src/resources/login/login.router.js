const router = require('express').Router();
const loginService = require('./login.service');

router.post('/', async (req, res) => {
  const { login, password } = req.body;
  try {
    const token = await loginService.loginUser(login, password);
    if (!token) {
      res.status(403).send('Forbidden');
    }
    res.status(200).send({ token });
  } catch (error) {
    res.status(403).send('Forbidden');
  }
});

module.exports = router;
