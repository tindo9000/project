'use strict';

var MySQL = require('../utils/MySQL.js');

/**
 * Add a new laptop
 * Adds a new laptop for an existing student into the database.
 *
 * body Laptop The id and registeredAt in the request body are not required and any values submitted for them will be ignored.

The studentId in the request body should have a value for an existing student in the database.
 * returns Laptop
 **/
exports.addLaptop = function(body) {
  return new Promise(function(resolve, reject) {
    MySQL.db().query('INSERT INTO laptops(student_id, serial_number, color, model, brand) VALUES (?,?,?,?,?)', [body.studentId, body.serialNumber, body.color, body.model, body.brand], (error, results) => {
      if (error) {
        resolve()
      } else {
        MySQL.db().query('SELECT * FROM laptops WHERE id = ? LIMIT 1', [results.insertId], (error, results) => {
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
 * Delete a laptop
 * Deletes a laptop with id that matches the laptopId value
 *
 * laptopId Long Id of laptop that needs to be deleted
 * no response value expected for this operation
 **/
exports.deleteLaptop = function(laptopId) {
  return new Promise(function(resolve, reject) {
    MySQL.db().query('DELETE FROM laptops WHERE id = ? LIMIT 1', [laptopId], (error, results) => {
      if (error) {
        resolve()
      } else {
        resolve(results.affectedRows.toString())
      }
    });
  });
}


/**
 * Find a laptop by id
 * Returns a single laptop with an id that matches the provided laptopId value
 *
 * laptopId Long Id of laptop to return
 * returns Laptop
 **/
exports.findLaptopById = function(laptopId) {
  return new Promise(function(resolve, reject) {
    MySQL.db().query('SELECT * FROM laptops WHERE id = ? LIMIT 1', [laptopId], (error, results) => {
      if (error) {
        resolve()
      } else {
        resolve(results[0])
      }
    });
  });
}


/**
 * Find a student by laptop serial number
 * Returns a single student that owns a laptop with serial number that matches the serial number which will be extracted from the jpeg image in the request body from the database
 *
 * body ScannedImageRequest 
 * returns Student
 **/
exports.findStudentByLaptopSerialNumber = function(body) {
  return new Promise(function(resolve, reject) {
    MySQL.db().query('SELECT * FROM laptops WHERE serial_number = ? LIMIT 1', [body.scannedImage], (error, results) => {
      if (error) {
        resolve()
      } else {
        if(results.length > 0){
          MySQL.db().query('SELECT * FROM students WHERE id = ? LIMIT 1', [results[0]['student_id']], (error, results) => {
            if (error) {
              resolve()
            } else {
              resolve(results[0])
            }
          });
        } else {
          resolve()
        } 
      }
    });
  });
}


/**
 * List all laptops
 * Returns an array of all laptops
 *
 * returns List
 **/
exports.getLaptops = function() {
  return new Promise(function(resolve, reject) {
    MySQL.db().query('SELECT * FROM laptops', (error, results) => {
      if (error) {
        resolve()
      } else {
        resolve(results)
      }
    });
  });
}


/**
 * Update a laptop
 * Updates a laptop with id that matches laptopId value using new values from the request body.
 *
 * body Laptop The id and registeredAt in the request body are not required and any values submitted for them will be ignored.
 * laptopId Long Id of laptop that needs to be updated
 * returns Laptop
 **/
exports.updateLaptop = function(body,laptopId) {
  return new Promise(function(resolve, reject) {
    MySQL.db().query('UPDATE laptops SET student_id = ?, serial_number = ?, color = ?, model = ?, brand = ? WHERE id = ? LIMIT 1', [body.studentId, body.serialNumber, body.color, body.model, body.brand, laptopId], (error, results) => {
      if (error) {
        resolve()
      } else {
        MySQL.db().query('SELECT * FROM laptops WHERE id = ? LIMIT 1', [laptopId], (error, results) => {
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

