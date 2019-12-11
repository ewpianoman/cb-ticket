// Require packages
const express = require('express');
const https = require('https');
const fs = require('fs');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const sassMiddleware = require('node-sass-middleware');

// Make new instance of express.
const app = express();
const bodyparser = require('body-parser');

// Create port for server.
const port = process.env.PORT || 3200;

// Require routes
const routes = require('./routes/index');
const tickets = require('./routes/tickets');
const users = require('./routes/users');

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

// Set up routes.
app.use('/', routes);
app.use('/tickets', tickets);
app.use('/users', users);

// Connect to Database
const dbConnectionString = process.env.MONGODB_URI || 'mongodb://localhost';
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
mongoose.connect(dbConnectionString + '/cb-ticket', dbOptions);

// Set up routes


// Start server
https.createServer({
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
  passphrase: 'pianoman'
}, app).listen(port, () => {
  console.log(`Server listening at port ${port}.`);
});
