const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeviceSchema = new Schema({
  serviceTag: String,
  model: String
});

const Device = mongoose.model('Device', DeviceSchema);

module.exports = Device;
