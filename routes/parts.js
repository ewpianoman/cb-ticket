const express = require('express');
const router = express.Router();
const Part = require('../models/part');
const auth = require('./auth');

router.route('/')
  // READ all Parts.
  .get(auth.required, function(req, res, next) {
    Part.findAsync({})
    .then(function(parts) {
      res.json(parts);
    })
    .catch(next)
    .error(console.error);
  })
  // CREATE new Part.
  .post(auth.required, function(req, res, next) {
    let part = new Part();
    let prop;
    for (prop in req.body) {
      part[prop] = req.body[prop];
    }
    part.saveAsync()
    .then(function(part) {
      console.log('success');
      res.json({'status': 'success', 'part': part});
    })
    .catch(function(e) {
      console.log('fail');
      res.json({'status': 'error', 'error': e});
    })
    .error(console.error);
  });

router.route('/:id')
  // READ a single Part by ID
  .get(auth.required, function(req, res, next) {
    Part.findOne({_id: req.params.id}, {})
    .exec(function (e, part) {
      if (e) return console.error(e);
      res.json(part);
    })
  })
  // UPDATE a Part
  .put(auth.required, function(req, res, next) {
    let part = {};
    let prop;
    for (prop in req.body) {
      part[prop] = req.body[prop];
    }
    Part.updateAsync({_id: req.params.id}, part)
    .then(function(updatedPart) {
      return res.json({'status': 'success', 'part': updatedPart})
    })
    .catch(function(e) {
      return res.status(400).json({'status': 'fail', 'error': e});
    });
  })
  // DELETE a Part
  .delete(auth.required, function(req, res, next) {
    Part.findByIdAndRemoveAsync(req.params.id)
    .then(function(deletedPart) {
      res.json({'status': 'success', 'part': deletedPart});
    })
    .catch(function(e) {
      res.status(400).json({'status': 'fail', 'error': e})
    });
  });

module.exports = router;
