const router = require('express').Router();
const userController = require('../controllers/user.controller');

router
  .route('/')
  .get(function (req, res) {})
  .post(userController.validateInput, userController.createUser)
  .put(function (req, res) {})
  .delete(function (req, res) {});

module.exports = router;
