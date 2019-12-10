const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', {layout: 'layout', template: 'home-template', title: 'Chromebook Ticket'});
});

module.exports = router;
