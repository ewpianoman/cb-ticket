const express = require('express');
const router = express.Router();
const auth = require('./auth');

router.get('/', auth.optional, function(req, res, next) {
  res.render('index', {layout: 'layout', template: 'home-template', title: 'Chromebook Ticket'});
});

module.exports = router;
