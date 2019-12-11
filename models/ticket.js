const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Promise = require('bluebird');
Promise.promisifyAll(mongoose);

const TicketSchema = new Schema({
  open: {type: Date, required: true},
  close: Date,
  description: {type: String, required: true},
  done: Boolean,
  status: String,
  repairType: {type: String, required: true},
  ticketOwner: {type: ObjectId, ref: 'User'}
});

const Ticket = mongoose.model('Ticket', TicketSchema);

module.exports = Ticket;
