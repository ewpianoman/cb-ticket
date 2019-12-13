const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Promise = require('bluebird');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Device = require('./device');

Promise.promisifyAll(mongoose);

const InsuranceSchema = new Schema({
  policyNumber: {type: String, required: 'true'},
  endDate: {type: Date, required: 'true'},
  device: {type: ObjectId, ref: 'Device'}
});

const Insurance = mongoose.model('Insurance', InsuranceSchema, 'insurances');

module.exports = Insurance;
