require('dotenv').config();

// Require packages
const config = require('config');
const express = require('express');
const https = require('https');
const fs = require('fs');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const sassMiddleware = require('node-sass-middleware');
const path = require('path');
const bodyparser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const errorHandler = require('errorhandler');

// use config module to get the privatekey, if no privatekey set, end the application
if (!config.get('privatekey')) {
  console.error('FATAL ERROR: privatekey is not defined.');
  process.exit(1);
}

// Create port for server.
const port = process.env.PORT || 3200;

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';

// Make new instance of express.
const app = express();

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

app.use('/fonts', express.static(path.join(__dirname, 'node_modules/bootstrap-sass/assets/fonts')));

// Register Middleware
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: config.get('privatekey'), cookie: {maxAge: 60000}, resave: false, saveUninitialized: false}));

if (!isProduction) {
  app.use(errorHandler());
}

// Register routes.
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
app.use(require('./routes'));

// Configure Mongoose
const dbConnectionString = process.env.MONGODB_URI || 'mongodb://localhost';
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
mongoose.connect(dbConnectionString + '/cb-ticket', dbOptions);
mongoose.set('debug', true);

// Require Config files
require('./config/passport');
require('./models/user');

// Error handlers & middlewares
if (!isProduction) {
  app.use((err, req, res) => {
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err
      }
    });
  });
}

app.use((err, req, res) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  })
});

// Start server
https.createServer({
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
  passphrase: 'pianoman'
}, app).listen(port, () => {
  console.log(`Server listening at port ${port}.`);
});
