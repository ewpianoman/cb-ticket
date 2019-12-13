const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Promise = require('bluebird');
const ObjectId = mongoose.Schema.Types.ObjectId;
const User = require('./user');

Promise.promisifyAll(mongoose);

const TicketSchema = new Schema({
  open: {type: Date, required: true},
  close: Date,
  description: {type: String, required: true},
  done: Boolean,
  status: String,
  repairType: {type: String, required: true},
  ticketOwner: {type: ObjectId, ref: 'User', required: true}
});

const Ticket = mongoose.model('Ticket', TicketSchema, 'tickets');

module.exports = Ticket;
