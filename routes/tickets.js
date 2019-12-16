const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticket');

router.route('/')
  // READ all tickets.
  .get(function(req, res, next) {
    Ticket.findAsync({})
    .then(function(tickets) {
      res.json(tickets);
    })
    .catch(next)
    .error(console.error);
  })
  // CREATE new ticket.
  .post(function(req, res, next) {
    let ticket = new Ticket();
    let prop;
    for (prop in req.body) {
      ticket[prop] = req.body[prop];
    }
    ticket.saveAsync()
    .then(function(ticket) {
      console.log('success');
      res.json({'status': 'success', 'ticket': ticket});
    })
    .catch(function(e) {
      console.log('fail');
      res.json({'status': 'error', 'error': e});
    })
    .error(console.error);
  });

router.route('/:id')
  // READ a single Ticket by ID
  .get(function(req, res, next) {
    Ticket.findOne({_id: req.params.id}, {})
    .populate('device')
    .populate('ticketOwners')
    .populate('createdBy')
    .populate('invoice')
    .populate('parts')
    .exec(function (e, ticket) {
      if (e) return console.error(e);
      res.json(ticket);
    })
  })
  // UPDATE a Ticket
  .put(function(req, res, next) {
    let ticket = {};
    let prop;
    for (prop in req.body) {
      ticket[prop] = req.body[prop];
    }
    Ticket.updateAsync({_id: req.params.id}, ticket)
    .then(function(updatedTicket) {
      return res.json({'status': 'success', 'ticket': updatedTicket})
    })
    .catch(function(e) {
      return res.status(400).json({'status': 'fail', 'error': e});
    });
  })
  // DELETE a Ticket
  .delete(function(req, res, next) {
    Ticket.findByIdAndRemoveAsync(req.params.id)
    .then(function(deletedTicket) {
      res.json({'status': 'success', 'ticket': deletedTicket});
    })
    .catch(function(e) {
      res.status(400).json({'status': 'fail', 'error': e})
    });
  });

module.exports = router;
