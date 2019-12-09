const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  open: Date,
  close: Date,
  issue: Array,
  description: String,
  done: Boolean,
  status: String,
  repairType: String
});

const Ticket = mongoose.model('Ticket', TicketSchema);

module.exports = Ticket;
