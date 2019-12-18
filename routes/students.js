const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const auth = require('./auth');

router.route('/')
  // READ all students.
  .get(auth.required, function(req, res, next) {
    Student.findAsync({})
    .then(function(students) {
      res.json(students);
    })
    .catch(next)
    .error(console.error);
  })
  // CREATE new student.
  .post(auth.required, function(req, res, next) {
    let student = new Student();
    let prop;
    for (prop in req.body) {
      student[prop] = req.body[prop];
    }
    student.saveAsync()
    .then(function(student) {
      console.log('success');
      res.json({'status': 'success', 'student': student});
    })
    .catch(function(e) {
      console.log('fail');
      res.json({'status': 'error', 'error': e});
    })
    .error(console.error);
  });

router.route('/:id')
  // READ a single Student by ID
  .get(auth.required, function(req, res, next) {
    Student.findOne({_id: req.params.id}, {})
    .populate('device')
    .populate('loaner')
    .exec(function (e, student) {
      if (e) return console.error(e);
      res.json(student);
    })
  })
  // UPDATE a Student
  .put(auth.required, function(req, res, next) {
    let student = {};
    let prop;
    for (prop in req.body) {
      student[prop] = req.body[prop];
    }
    Student.updateAsync({_id: req.params.id}, student)
    .then(function(updatedStudent) {
      return res.json({'status': 'success', 'student': updatedStudent})
    })
    .catch(function(e) {
      return res.status(400).json({'status': 'fail', 'error': e});
    });
  })
  // DELETE a Student
  .delete(auth.required, function(req, res, next) {
    Student.findByIdAndRemoveAsync(req.params.id)
    .then(function(deletedStudent) {
      res.json({'status': 'success', 'student': deletedStudent});
    })
    .catch(function(e) {
      res.status(400).json({'status': 'fail', 'error': e})
    });
  });

module.exports = router;
