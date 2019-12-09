// Require packages
const express = require('express');
const mongoose = require('mongoose');

// Make new instance of express.
const app = express();
const bodyparser = require('body-parser');

// Create port for server.
const port = process.env.PORT || 3200;

// Require routes
const routes = require('./routes/index');
const tickets = require('./routes/tickets.js');

// Middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// Set up routes
app.use('/', routes);
app.use('/tickets', tickets);

// Start server
app.listen(port, () => {
  console.log(`Server listening at port ${port}.`);
});
