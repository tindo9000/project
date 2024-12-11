'use strict';

var utils = require('../utils/writer.js');
var Student = require('../service/StudentService');

module.exports.addStudent = function addStudent (req, res, next, body) {
  Student.addStudent(body)
    .then(function (response) {
      utils.writeJson(res, response, (response === undefined || response === '' || response.length == 0) ? 400: 201);
    })
    .catch(function (response) {
      utils.writeJson(res, response, 500);
    });
};

module.exports.deleteStudent = function deleteStudent (req, res, next, studentId) {
  Student.deleteStudent(studentId)
    .then(function (response) {
      console.log(response)
      utils.writeJson(res, response, response == '1' ? 204: 404);
    })
    .catch(function (response) {
      utils.writeJson(res, response, 500);
    });
};

module.exports.findStudentById = function findStudentById (req, res, next, studentId) {
  Student.findStudentById(studentId)
    .then(function (response) {
      utils.writeJson(res, response, (response === undefined || response === '' || response.length == 0) ? 404: 200);
    })
    .catch(function (response) {
      utils.writeJson(res, response, 500);
    });
};

module.exports.findStudentByRegistrationNumber = function findStudentByRegistrationNumber (req, res, next, body) {
  Student.findStudentByRegistrationNumber(body)
    .then(function (response) {
      utils.writeJson(res, response, (response === undefined || response === '' || response.length == 0) ? 404: 200);
    })
    .catch(function (response) {
      utils.writeJson(res, response, 500);
    });
};

module.exports.getStudents = function getStudents (req, res, next) {
  Student.getStudents()
    .then(function (response) {
      utils.writeJson(res, response, (response === undefined || response === '') ? 404: 200);
    })
    .catch(function (response) {
      utils.writeJson(res, response, 500);
    });
};

module.exports.updateStudent = function updateStudent (req, res, next, body, studentId) {
  Student.updateStudent(body, studentId)
    .then(function (response) {
      utils.writeJson(res, response, (response === undefined || response === '' || response.length == 0) ? 404: 200);
    })
    .catch(function (response) {
      utils.writeJson(res, response, 500);
    });
};
