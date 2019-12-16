// Require packages
const express = require('express');
const https = require('https');
const fs = require('fs');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const sassMiddleware = require('node-sass-middleware');
const path = require('path');

// Make new instance of express.
const app = express();
const bodyparser = require('body-parser');

// Create port for server.
const port = process.env.PORT || 3200;

// Require routes
const routes = require('./routes/index');
const tickets = require('./routes/tickets');
const users = require('./routes/users');
const claims = require('./routes/claims');
const devices = require('./routes/devices');
const insurances = require('./routes/insurances');
const students = require('./routes/students');
const warranties = require('./routes/warranties');
const invoices = require('./routes/invoices');
const parts = require('./routes/parts');

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
app.use(express.static(path.join(__dirname, 'public'))); // BELOW THIS
app.use('/fonts', express.static(path.join(__dirname, 'node_modules/bootstrap-sass/assets/fonts')));

// Middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// Set up routes.
app.use('/', routes);
app.use('/tickets', tickets);
app.use('/users', users);
app.use('/claims', claims);
app.use('/devices', devices);
app.use('/insurance', insurances);
app.use('/students', students);
app.use('/warranty', warranties);
app.use('/invoices', invoices);
app.use('/parts', parts);

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
