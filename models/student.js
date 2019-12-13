const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Promise = require('bluebird');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Device = require('./device');

Promise.promisifyAll(mongoose);

const StudentSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  studentId: Number,
  device: {type: ObjectId, ref: 'Device'},
  loaner: {type: ObjectId, ref: 'Device'}
});

const Student = mongoose.model('Student', StudentSchema, 'students');

module.exports = Student;
