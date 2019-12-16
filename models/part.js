const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Promise = require('bluebird');
const ObjectId = mongoose.Schema.Types.ObjectId;

Promise.promisifyAll(mongoose);

const PartSchema = new Schema({
  name: {type: String, required: 'true'},
  used: {type: Boolean, required: 'true'},
  quantity: {type: Number, required: 'true'},
  cost: {type: Number, required: 'true'}
});

const Part = mongoose.model('Part', PartSchema, 'parts');

module.exports = Part;
