const express = require('express');
const router = express.Router();
const Warranty = require('../models/warranty');

router.route('/')
  // READ all Warranties.
  .get(function(req, res, next) {
    Warranty.findAsync({})
    .then(function(warranties) {
      res.json(warranties);
    })
    .catch(next)
    .error(console.error);
  })
  // CREATE new Warranty.
  .post(function(req, res, next) {
    let warranty = new Warranty();
    let prop;
    for (prop in req.body) {
      warranty[prop] = req.body[prop];
    }
    warranty.saveAsync()
    .then(function(warranty) {
      console.log('success');
      res.json({'status': 'success', 'warranty': warranty});
    })
    .catch(function(e) {
      console.log('fail');
      res.json({'status': 'error', 'error': e});
    })
    .error(console.error);
  });

router.route('/:id')
  // READ a single Warranty by ID
  .get(function(req, res, next) {
    Warranty.findOne({_id: req.params.id}, {})
    .populate('device', ['serviceTag', 'model'])
    .populate('claims')
    .exec(function (e, warranty) {
      if (e) return console.error(e);
      res.json(warranty);
    })
  })
  // UPDATE a Warranty
  .put(function(req, res, next) {
    let warranty = {};
    let prop;
    for (prop in req.body) {
      warranty[prop] = req.body[prop];
    }
    Warranty.updateAsync({_id: req.params.id}, warranty)
    .then(function(updatedWarranty) {
      return res.json({'status': 'success', 'warranty': updatedWarranty})
    })
    .catch(function(e) {
      return res.status(400).json({'status': 'fail', 'error': e});
    });
  })
  // DELETE a Warranty
  .delete(function(req, res, next) {
    Warranty.findByIdAndRemoveAsync(req.params.id)
    .then(function(deletedWarranty) {
      res.json({'status': 'success', 'warranty': deletedWarranty});
    })
    .catch(function(e) {
      res.status(400).json({'status': 'fail', 'error': e})
    });
  });

module.exports = router;
