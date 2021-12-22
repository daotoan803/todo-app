const router = require('express').Router();
const userController = require('../controllers/user.controller');
const taskController = require('../controllers/task.controller');
const authController = require('../controllers/authentication.controller');
const path = require('path');

router.post(
  '/api/users/verifyToken',
  authController.authenticateToken,
  authController.checkValidToken
);
router.use('/api/users/', userController.validateInput);
router.post('/api/users/signup', userController.createUser);
router.post('/api/users/login', authController.login);

const tasksUri = '/api/tasks';
router.use(tasksUri, authController.authenticateToken);

router
  .route(tasksUri)
  .get(taskController.getTasks)
  .delete(taskController.deleteTask)
  .patch(taskController.editTask);

router.post(tasksUri, taskController.validateInput, taskController.createTask);

router.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'));
});

module.exports = router;
