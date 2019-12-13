const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Promise = require('bluebird');
const ObjectId = mongoose.Schema.Types.ObjectId;
const User = require('./user');
const Device = require('./device');
const Invoice = require('./invoice');

Promise.promisifyAll(mongoose);

const TicketSchema = new Schema({
  open: {type: Date, required: true},
  close: Date,
  description: {type: String, required: true},
  device: {type: ObjectId, ref: 'Device', required: true},
  done: Boolean,
  status: String,
  repairType: {type: String, required: true},
  ticketOwners: [{type: ObjectId, ref: 'User', required: true}],
  createdBy: {type: ObjectId, ref: 'User', required: true},
  invoice: {type: ObjectId, ref: 'Invoice'},
  cost: Number
});

const Ticket = mongoose.model('Ticket', TicketSchema, 'tickets');

module.exports = Ticket;
