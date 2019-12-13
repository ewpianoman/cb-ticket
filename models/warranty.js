const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Promise = require('bluebird');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Device = require('./device');
const Claim = require('./claim');

Promise.promisifyAll(mongoose);

const WarrantySchema = new Schema({
  active: {type: Boolean, required: 'true'},
  endDate: {type: Date, required: 'true'},
  device: {type: ObjectId, ref: 'Device'},
  claims: [{type: ObjectId, ref: 'Claim'}]
});

const Warranty = mongoose.model('Warranty', WarrantySchema, 'warranties');

module.exports = Warranty;
