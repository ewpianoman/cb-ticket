const express = require('express');
const router = express.Router();
const Invoice = require('../models/invoice');

router.route('/')
  // READ all Invoices.
  .get(function(req, res, next) {
    Invoice.findAsync({})
    .then(function(invoices) {
      res.json(invoices);
    })
    .catch(next)
    .error(console.error);
  })
  // CREATE new Invoice.
  .post(function(req, res, next) {
    let invoice = new Invoice();
    let prop;
    for (prop in req.body) {
      invoice[prop] = req.body[prop];
    }
    invoice.saveAsync()
    .then(function(invoice) {
      console.log('success');
      res.json({'status': 'success', 'invoice': invoice});
    })
    .catch(function(e) {
      console.log('fail');
      res.json({'status': 'error', 'error': e});
    })
    .error(console.error);
  });

router.route('/:id')
  // READ a single Invoice by ID
  .get(function(req, res, next) {
    Invoice.findOne({_id: req.params.id}, {})
    .populate('tickets')
    .exec(function (e, invoice) {
      if (e) return console.error(e);
      res.json(invoice);
    })
  })
  // UPDATE an Invoice
  .put(function(req, res, next) {
    let invoice = {};
    let prop;
    for (prop in req.body) {
      invoice[prop] = req.body[prop];
    }
    Invoice.updateAsync({_id: req.params.id}, invoice)
    .then(function(updatedInvoice) {
      return res.json({'status': 'success', 'invoice': updatedInvoice})
    })
    .catch(function(e) {
      return res.status(400).json({'status': 'fail', 'error': e});
    });
  })
  // DELETE an Invoice
  .delete(function(req, res, next) {
    Invoice.findByIdAndRemoveAsync(req.params.id)
    .then(function(deletedInvoice) {
      res.json({'status': 'success', 'invoice': deletedInvoice});
    })
    .catch(function(e) {
      res.status(400).json({'status': 'fail', 'error': e})
    });
  });

module.exports = router;
