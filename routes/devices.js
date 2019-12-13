const express = require('express');
const router = express.Router();
const Device = require('../models/device');

router.route('/')
  // READ all device.
  .get(function(req, res, next) {
    Device.findAsync({})
    .then(function(devices) {
      res.json(devices);
    })
    .catch(next)
    .error(console.error);
  })
  // CREATE new device.
  .post(function(req, res, next) {
    let device = new Device();
    let prop;
    for (prop in req.body) {
      device[prop] = req.body[prop];
    }
    device.saveAsync()
    .then(function(device) {
      console.log('success');
      res.json({'status': 'success', 'device': device});
    })
    .catch(function(e) {
      console.log('fail');
      res.json({'status': 'error', 'error': e});
    })
    .error(console.error);
  });

router.route('/:id')
  // READ a single Device by ID
  .get(function(req, res, next) {
    Device.findOne({_id: req.params.id}, {})
    .populate('student')
    .populate('tickets')
    .exec(function (e, device) {
      if (e) return console.error(e);
      res.json(device);
    })
  })
  // UPDATE a Device
  .put(function(req, res, next) {
    let device = {};
    let prop;
    for (prop in req.body) {
      device[prop] = req.body[prop];
    }
    Device.updateAsync({_id: req.params.id}, device)
    .then(function(updatedDevice) {
      return res.json({'status': 'success', 'device': updatedDevice})
    })
    .catch(function(e) {
      return res.status(400).json({'status': 'fail', 'error': e});
    });
  })
  // DELETE a Device
  .delete(function(req, res, next) {
    Device.findByIdAndRemoveAsync(req.params.id)
    .then(function(deletedDevice) {
      res.json({'status': 'success', 'device': deletedDevice});
    })
    .catch(function(e) {
      res.status(400).json({'status': 'fail', 'error': e})
    });
  });

module.exports = router;
