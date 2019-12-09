const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const TicketSchema = new Schema({
  open: Date,
  close: Date,
  issue: Array,
  description: String,
  done: Boolean,
  status: String,
  repairType: String,
  device: {
    type: ObjectId,
    ref: 'Device'
  },
  claim: {
    type: ObjectId,
    ref: 'Claim'
  },
  deviceOwner: {
    type: ObjectId,
    ref: 'Student'
  },
  ticketOwner: {
    type: ObjectId,
    ref: 'User'
  }
});

const Ticket = mongoose.model('Ticket', TicketSchema);

module.exports = Ticket;
