const router = require('express').Router();
const userController = require('../controllers/user.controller');
const taskController = require('../controllers/task.controller');
const authController = require('../controllers/authentication.controller');

router.route('/api/todos');

router.route('/api/users/*', userController.validateInput);
router.post('/api/users/signup', userController.createUser);

router.post('/api/users/login', authController.login);

module.exports = router;
