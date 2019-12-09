// Require packages
const express = require('express');
const mongoose = require('mongoose');

// Make new instance of express.
const app = express();
const bodyparser = require('body-parser');

// Create port for server.
const port = process.env.PORT || 3200;

// Middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// Start server
app.listen(port, () => {
  console.log(`Server listening at port ${port}.`);
});
