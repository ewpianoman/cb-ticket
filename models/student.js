const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  firstName: String,
  lastName: String,
  idNumber: String
});

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;
