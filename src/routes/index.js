const router = require('express').Router();
const userController = require('../controllers/user.controller');
const taskController = require('../controllers/task.controller');
const authController = require('../controllers/authentication.controller');

router.use('/api/users/', userController.validateInput);
router.post('/api/users/signup', userController.createUser);

router.post('/api/users/login', authController.login);

router.use('/api/todos/', authController.authenticateToken);
router.route('/api/todos/').get((req, res) => {
  res.send('here your task');
});

module.exports = router;
