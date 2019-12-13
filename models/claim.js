const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Promise = require('bluebird');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Insurance = require('./insurance');
const Warranty = require('./warranty');

Promise.promisifyAll(mongoose);

const ClaimSchema = new Schema({
  type: String,
  filed: Date,
  shipped: Date,
  received: Date,
  closed: Boolean,
  turnaround: Number,
  workOrder: String,
  confirmation: String,
  insurance: [{type: ObjectId, ref: 'Insurance'}],
  warranty: {type: ObjectId, ref: 'Warranty'}
});

const Claim = mongoose.model('Claim', ClaimSchema, 'claims');

module.exports = Claim;
