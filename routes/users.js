const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.route('/')
  // READ all users.
  .get(function(req, res, next) {
    User.findAsync({})
    .then(function(users) {
      res.json(users);
    })
    .catch(next)
    .error(console.error);
  })
  // CREATE new user.
  .post(function(req, res, next) {
    let user = new User();
    let prop;
    for (prop in req.body) {
      user[prop] = req.body[prop];
    }
    user.saveAsync()
    .then(function(user) {
      console.log('success');
      res.json({'status': 'success', 'user': user});
    })
    .catch(function(e) {
      console.log('fail');
      res.json({'status': 'error', 'error': e});
    })
    .error(console.error);
  });

router.route('/:id')
  // READ a single User by ID
  .get(function(req, res, next) {
    User.findOne({_id: req.params.id}, {})
    .populate('tickets')
    .exec(function (e, user) {
      if (e) return console.error(e);
      res.json(user);
    })
  })
  // UPDATE a User
  .put(function(req, res, next) {
    let user = {};
    let prop;
    for (prop in req.body) {
      user[prop] = req.body[prop];
    }
    User.updateAsync({_id: req.params.id}, user)
    .then(function(updatedUser) {
      return res.json({'status': 'success', 'user': updatedUser})
    })
    .catch(function(e) {
      return res.status(400).json({'status': 'fail', 'error': e});
    });
  })
  // DELETE a User
  .delete(function(req, res, next) {
    User.findByIdAndRemoveAsync(req.params.id)
    .then(function(deletedUser) {
      res.json({'status': 'success', 'user': deletedUser});
    })
    .catch(function(e) {
      res.status(400).json({'status': 'fail', 'error': e})
    });
  });

module.exports = router;
