// Require packages
const express = require('express');
const mongoose = require('mongoose');
const hbs = require('express-handlebars');
const sassMiddleware = require('node-sass-middleware');

// Make new instance of express.
const app = express();
const bodyparser = require('body-parser');

// Create port for server.
const port = process.env.PORT || 3200;

// Require routes
const routes = require('./routes/index');

// View Engine Setup
app.engine('hbs', hbs({extname: '.hbs', defaultLayout: 'layout'}));
app.set('view engine', 'hbs');

// SASS Setup
app.use (
  sassMiddleware({
    src: __dirname + '/sass',
    dest: __dirname + '/public',
    debug: true,
  })
);

// Middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use('/', routes);

// Connect to Database
const dbConnectionString = process.env.MONGODB_URI || 'mongodb://localhost';
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
mongoose.connect(dbConnectionString + '/cb-ticket', dbOptions);

// Set up routes


// Start server
app.listen(port, () => {
  console.log(`Server listening at port ${port}.`);
});
