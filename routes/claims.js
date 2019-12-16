const express = require('express');
const router = express.Router();
const Claim = require('../models/claim');

router.route('/')
  // READ all Claims.
  .get(function(req, res, next) {
    Claim.findAsync({})
    .then(function(claims) {
      res.json(claims);
    })
    .catch(next)
    .error(console.error);
  })
  // CREATE new Claim.
  .post(function(req, res, next) {
    let claim = new Claim();
    let prop;
    for (prop in req.body) {
      claim[prop] = req.body[prop];
    }
    claim.saveAsync()
    .then(function(claim) {
      console.log('success');
      res.json({'status': 'success', 'claim': claim});
    })
    .catch(function(e) {
      console.log('fail');
      res.json({'status': 'error', 'error': e});
    })
    .error(console.error);
  });

router.route('/:id')
  // READ a single Claim by ID
  .get(function(req, res, next) {
    Claim.findOne({_id: req.params.id}, {})
    .populate('insurance', ['active', 'policyNumber', 'device', 'endDate'])
    .populate('warranty', ['active', 'endDate', 'device'])
    .exec(function (e, claim) {
      if (e) return console.error(e);
      res.json(claim);
    })
  })
  // UPDATE a Claim
  .put(function(req, res, next) {
    let claim = {};
    let prop;
    for (prop in req.body) {
      claim[prop] = req.body[prop];
    }
    Claim.updateAsync({_id: req.params.id}, claim)
    .then(function(updatedClaim) {
      return res.json({'status': 'success', 'claim': updatedClaim})
    })
    .catch(function(e) {
      return res.status(400).json({'status': 'fail', 'error': e});
    });
  })
  // DELETE a Claim
  .delete(function(req, res, next) {
    Claim.findByIdAndRemoveAsync(req.params.id)
    .then(function(deletedClaim) {
      res.json({'status': 'success', 'claim': deletedClaim});
    })
    .catch(function(e) {
      res.status(400).json({'status': 'fail', 'error': e})
    });
  });

module.exports = router;
