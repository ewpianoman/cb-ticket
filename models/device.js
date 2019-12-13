const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Promise = require('bluebird');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Ticket = require('./ticket');
const Student = require('./student');
const Insurance = require('./insurance');
const Warranty = require('./warranty');

Promise.promisifyAll(mongoose);

const DeviceSchema = new Schema({
  serviceTag: {type: String, required: true},
  model: {type: String, required: true},
  student: {type: ObjectId, ref: 'Student'},
  tickets: [{type: ObjectId, ref: 'Ticket'}],
  insurance: [{type: ObjectId, ref: 'Insurance'}],
  warranty: {type: ObjectId, ref: 'Warranty'}
});

const Device = mongoose.model('Device', DeviceSchema, 'devices');

module.exports = Device;
