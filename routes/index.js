const express = require('express');
const router = express.Router();
const tickets = require('../models/todos');
router.get('/', function(req, res) {
  res.render('todos', {title: 'Todos', todos: todos});
});
module.exports = router;
