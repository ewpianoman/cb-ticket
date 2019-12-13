const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Promise = require('bluebird');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Ticket = require('./ticket');

Promise.promisifyAll(mongoose);

const InvoiceSchema = new Schema({
  date: Date,
  parts: [{
    name: String,
    used: Boolean,
    cost: Number
  }],
  total: Number,
  paid: Boolean,
  ticket: {type: ObjectId, ref: 'Ticket'}
});

const Invoice = mongoose.model('Invoice', InvoiceSchema, 'invoices');

module.exports = Invoice;
