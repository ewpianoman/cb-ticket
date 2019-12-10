const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Promise = require('bluebird');
Promise.promisifyAll(mongoose);

const TicketSchema = new Schema({
  description: {type: String, required: true},
  done: Boolean
});

const Ticket = mongoose.model('Ticket', TicketSchema);

module.exports = Ticket;
