const router = require('express').Router();

const todoRoutes = require('./todo.routes');
const userRoutes = require('./user.routes');

router.use('/api/todos', todoRoutes);
router.use('/api/users', userRoutes);

module.exports = router;
