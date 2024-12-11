'use strict';

var MySQL = require('../utils/MySQL.js');

/**
 * Add a new student
 * Adds a new student into the database.
 *
 * body Student The id and registeredAt in the request body are not required and any values submitted for them will be ignored.
 * returns Student
 **/
exports.addStudent = function(body) {
  return new Promise(function(resolve, reject) {
    MySQL.db().query('INSERT INTO students(first_name, last_name, email_address, phone_number, registration_number, program) VALUES (?,?,?,?,?,?)', [body.firstName, body.lastName, body.emailAddress, body.phoneNumber, body.registrationNumber, body.program], (error, results) => {
      if (error) {
        resolve()
      } else {
        MySQL.db().query('SELECT * FROM students WHERE id = ? LIMIT 1', [results.insertId], (error, results) => {
          if (error) {
            resolve()
          } else {
            resolve(results[0])
          }
        });
      }
    });
  });
}


/**
 * Delete a student
 * Deletes a student with id that matches the studentId value
 *
 * studentId Long Id of student that needs to be deleted
 * no response value expected for this operation
 **/
exports.deleteStudent = function(studentId) {
  return new Promise(function(resolve, reject) {
    MySQL.db().query('DELETE FROM students WHERE id = ? LIMIT 1', [studentId], (error, results) => {
      if (error) {
        resolve()
      } else {
        resolve(results.affectedRows.toString())
      }
    });
  });
}


/**
 * Find a student by id
 * Returns a single student with an id that matches the provided studentId value
 *
 * studentId Long Id of student to return
 * returns Student
 **/
exports.findStudentById = function(studentId) {
  return new Promise(function(resolve, reject) {
    MySQL.db().query('SELECT * FROM students WHERE id = ? LIMIT 1', [studentId], (error, results) => {
      if (error) {
        resolve()
      } else {
        resolve(results[0])
      }
    });
  });
}


/**
 * Find a student by registration number
 * Returns a single student with registration number that matches the registration number which will be extracted from the jpeg image in the request body from the database
 *
 * body ScannedImageRequest 
 * returns Student
 **/
exports.findStudentByRegistrationNumber = function(body) {
  return new Promise(function(resolve, reject) {
    MySQL.db().query('SELECT * FROM students WHERE registration_number = ? LIMIT 1', [body.scannedImage], (error, results) => {
      if (error) {
        resolve()
      } else {
        resolve(results[0])
      }
    });
  });
}


/**
 * List all students
 * Returns an array of all students
 *
 * returns List
 **/
exports.getStudents = function() {
  return new Promise(function(resolve, reject) {
    MySQL.db().query('SELECT * FROM students', (error, results) => {
      if (error) {
        resolve()
      } else {
        resolve(results)
      }
    });
  });
}


/**
 * Update a student
 * Updates a student with id that matches studentId value using new values from the request body.
 *
 * body Student The id and registeredAt in the request body are not required and any values submitted for them will be ignored.
 * studentId Long Id of student that needs to be updated
 * returns Student
 **/
exports.updateStudent = function(body,studentId) {
  return new Promise(function(resolve, reject) {
    MySQL.db().query('UPDATE students SET first_name = ?, last_name = ?, email_address = ?, phone_number = ?, registration_number = ?, program = ? WHERE id = ? LIMIT 1', [body.firstName, body.lastName, body.emailAddress, body.phoneNumber, body.registrationNumber, body.program, studentId], (error, results) => {
      if (error) {
        resolve()
      } else {
        MySQL.db().query('SELECT * FROM students WHERE id = ? LIMIT 1', [studentId], (error, results) => {
          if (error) {
            resolve()
          } else {
            resolve(results[0])
          }
        });
      }
    });
  });
}

