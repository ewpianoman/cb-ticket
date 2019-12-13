const express = require('express');
const router = express.Router();
const Insurance = require('../models/insurance');

router.route('/')
  // READ all insurance policies.
  .get(function(req, res, next) {
    Insurance.findAsync({})
    .then(function(insurances) {
      res.json(insurances);
    })
    .catch(next)
    .error(console.error);
  })
  // CREATE new insurance policy.
  .post(function(req, res, next) {
    let insurance = new Insurance();
    let prop;
    for (prop in req.body) {
      insurance[prop] = req.body[prop];
    }
    insurance.saveAsync()
    .then(function(insurance) {
      console.log('success');
      res.json({'status': 'success', 'insurance': insurance});
    })
    .catch(function(e) {
      console.log('fail');
      res.json({'status': 'error', 'error': e});
    })
    .error(console.error);
  });

router.route('/:id')
  // READ a single Insurance policy by ID
  .get(function(req, res, next) {
    Insurance.findOne({_id: req.params.id}, {})
    .populate('device')
    .populate('claims')
    .exec(function (e, insurance) {
      if (e) return console.error(e);
      res.json(insurance);
    })
  })
  // UPDATE an Insurance Policy
  .put(function(req, res, next) {
    let insurance = {};
    let prop;
    for (prop in req.body) {
      insurance[prop] = req.body[prop];
    }
    Insurance.updateAsync({_id: req.params.id}, insurance)
    .then(function(updatedInsurance) {
      return res.json({'status': 'success', 'insurance': updatedInsurance})
    })
    .catch(function(e) {
      return res.status(400).json({'status': 'fail', 'error': e});
    });
  })
  // DELETE an Insurance policy
  .delete(function(req, res, next) {
    Insurance.findByIdAndRemoveAsync(req.params.id)
    .then(function(deletedInsurance) {
      res.json({'status': 'success', 'insurance': deletedInsurance});
    })
    .catch(function(e) {
      res.status(400).json({'status': 'fail', 'error': e})
    });
  });

module.exports = router;
