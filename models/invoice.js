const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Promise = require('bluebird');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Ticket = require('./ticket');
const Part = require('./part');

Promise.promisifyAll(mongoose);

const InvoiceSchema = new Schema({
  date: Date,
  billedDate: Date,
  parts: [{type: ObjectId, ref: 'Part'}],
  total: Number,
  paid: Boolean,
  ticket: {type: ObjectId, ref: 'Ticket'}
});

const Invoice = mongoose.model('Invoice', InvoiceSchema, 'invoices');

module.exports = Invoice;
