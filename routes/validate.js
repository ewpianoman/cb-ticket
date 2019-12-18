const mongoose = require('mongoose');
const User = require('../models/user');

const validateEmail = (req, res, next) => {
  const email = req.body.user.email;
  let existingUser = User.findOne({ email: email }, (err, user) => {
    if (err) {
      return err;
    }
    if (user) {
      return res.status(422).json({
        errors: {
          user: 'already exists'
        }
      });
    } else {
      next();
    }
  });
};

module.exports = validateEmail;
