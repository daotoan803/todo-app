const Task = require('../models/task.model');

const errorHandler = (res, e) => {
  res.status(500).json({ error: 'Something happen, try again later' });
  console.error(e);
};

const formatTaskToResponse = (task) => ({
  id: task.id,
  title: task.title,
  detail: task.detail,
  state: task.state,
});
exports.validateInput = (req, res, next) => {
  const { title, detail } = req.body;
  const error = {};
  if (!title?.trim()) error.title = 'title can not be empty';
  if (!detail?.trim()) error.detail = 'detail can not be empty';
  if (error.title || error.detail) return res.status(400).json({ error });

  next();
};

exports.createTask = async (req, res) => {
  const { userId } = req;
  const { title, detail } = req.body;
  try {
    const task = await Task.create({ userId, title, detail });
    res.status(200).json(formatTaskToResponse(task));
  } catch (e) {
    errorHandler(res, e);
  }
};

exports.getTasks = async (req, res) => {
  const { userId } = req;
  try {
    const tasks = await Task.find({ userId });
    const result = [];
    tasks.forEach((task) => result.push(formatTaskToResponse(task)));
    res.status(200).json(result.length === 0 ? [] : result);
  } catch (e) {
    errorHandler(res, e);
  }
};

exports.editTask = async (req, res) => {
  const { userId } = req;
  const { id, title, detail, state } = req.body;

  try {
    const task = await Task.findById(id);
    if (!task) return res.status(404);
    if (task.userId !== userId) return res.status(401);

    task.title = title;
    task.detail = detail;
    task.state = state === '0' ? false : true;
    await task.save();
    res.status(200).json(formatTaskToResponse(task));
  } catch (e) {
    errorHandler(res, e);
  }
};

exports.deleteTask = async (req, res) => {
  const { userId } = req;
  const { id } = req.body;
  try {
    await Task.deleteOne({
      id,
      userId,
    });
    res.sendStatus(200);
  } catch (e) {
    errorHandler(res, e);
  }
};
