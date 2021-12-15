const router = require('express').Router();
const userController = require('../controllers/user.controller');
const taskController = require('../controllers/task.controller');
const authController = require('../controllers/authentication.controller');

router.use('/api/users/', userController.validateInput);
router.post('/api/users/signup', userController.createUser);

router.post('/api/users/login', authController.login);

const tasksUri = '/api/tasks';
router.use(tasksUri, authController.authenticateToken);

router
  .route(tasksUri)
  .get(taskController.getTasks)
  .delete(taskController.deleteTask);

router.use(tasksUri, taskController.validateInput);

router
  .route(tasksUri)
  .post(taskController.createTask)
  .patch(taskController.editTask);

module.exports = router;
