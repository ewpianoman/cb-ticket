const express = require('express');
const router = express.Router();

// Connect to Models
const tickets = require('../models/ticket.js');

// Create routes
router.get('/', function(req, res) {
  res.render('tickets', {title: 'Tickets', tickets: tickets});
});
module.exports = router;
