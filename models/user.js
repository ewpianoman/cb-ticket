const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Promise = require('bluebird');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Ticket = require('./ticket');

Promise.promisifyAll(mongoose);

const UserSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true},
  username: {type: String, required: true},
  tickets: [{type: ObjectId, ref: 'Ticket'}]
});

const User = mongoose.model('User', UserSchema, 'users');

module.exports = User;
