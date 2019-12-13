const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Promise = require('bluebird');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Ticket = require('./ticket');
const Student = require('./device');

Promise.promisifyAll(mongoose);

const DeviceSchema = new Schema({
  serviceTag: {type: String, required: true},
  tickets: [{type: ObjectId, ref: 'Ticket'}],
  student: {type: ObjectId, ref: 'Student'}
});

const Device = mongoose.model('Device', DeviceSchema, 'devices');

module.exports = Device;
