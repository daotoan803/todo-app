const Task = require('../models/task.model');
const { CastError } = require('mongoose');

const errorHandler = (res, e) => {
  res.status(500).json({ error: 'Something happen, try again later' });
  if (e instanceof CastError) return;
  console.error(e);
};

const formatTaskToResponse = (task) => {
  const formattedTask = {
    ...task._doc,
    id: task.id,
  };
  delete formattedTask._id;
  return formattedTask;
};

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
  const { id, title, detail, finished, important } = req.body;

  try {
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    if (task.userId !== userId)
      return res.status(401).json({ error: 'Permission denied' });

    task.title = title?.trim() ? title : task.title;
    task.detail = detail?.trim() ? detail : task.detail;
    task.finished = finished ?? task.finished;
    task.important = important ?? task.important;

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
      _id: id,
      userId,
    });
    res.sendStatus(200);
  } catch (e) {
    errorHandler(res, e);
  }
};
