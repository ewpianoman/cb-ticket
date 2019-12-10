const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', {layout: 'layout', template: 'home-template'});
});

module.exports = router;
