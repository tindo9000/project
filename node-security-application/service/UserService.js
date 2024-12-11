'use strict';

var MySQL = require('../utils/MySQL.js');
var crypto = require('crypto');

/**
 * Add a new user
 * Adds a new user into the database.
 *
 * body User The id and registeredAt in the request body are not required and any values submitted for them will be ignored.
 * returns User
 **/
exports.addUser = function(body) {
  return new Promise(function(resolve, reject) {
    MySQL.db().query('INSERT INTO users(first_name, last_name, email, password, token) VALUES (?,?,?,?,?)', [body.firstName, body.lastName, body.email, crypto.createHash('md5').update(body.password).digest("hex"), crypto.randomBytes(64).toString('hex')], (error, results) => {
      if (error) {
        resolve()
      } else {
        MySQL.db().query('SELECT id, first_name, last_name, email, registered_at FROM users WHERE id = ? LIMIT 1', [results.insertId], (error, results) => {
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
 * Delete a user
 * Deletes a user with id that matches the userId value
 *
 * userId Long Id of user that needs to be deleted
 * no response value expected for this operation
 **/
exports.deleteUser = function(userId) {
  return new Promise(function(resolve, reject) {
    MySQL.db().query('DELETE FROM users WHERE id = ? LIMIT 1', [userId], (error, results) => {
      if (error) {
        resolve()
      } else {
        resolve(results.affectedRows.toString())
      }
    });
  });
}


/**
 * Find a user by id
 * Returns a single user with an id that matches the provided userId value
 *
 * userId Long Id of user to return
 * returns User
 **/
exports.findUserById = function(userId) {
  return new Promise(function(resolve, reject) {
    MySQL.db().query('SELECT id, first_name, last_name, email, registered_at FROM users WHERE id = ? LIMIT 1', [userId], (error, results) => {
      if (error) {
        resolve()
      } else {
        resolve(results[0])
      }
    });
  });
}


/**
 * List all users
 * Returns an array of all users
 *
 * returns List
 **/
exports.getUsers = function() {
  return new Promise(function(resolve, reject) {
    MySQL.db().query('SELECT * FROM users', (error, results) => {
      if (error) {
        resolve()
      } else {
        resolve(results)
      }
    });
  });
}


/**
 * Login and retrieve plain text token
 * This endpoint is for logging in a user by their email and password, the endpoint returns a token which should be sent on accessing any other endpoint in this API
 *
 * body LoginRequest 
 * no response value expected for this operation
 **/
exports.loginUser = function(body) {
  return new Promise(function(resolve, reject) {
    MySQL.db().query('SELECT token FROM users WHERE email = ? AND password = ? LIMIT 1', [body.email, crypto.createHash('md5').update(body.password).digest("hex")], (error, results) => {
      if (error) {
        resolve()
      } else {
        if(results.length > 0){
          resolve({"access_token": results[0]["token"], "token_type": "Bearer"})
        }
        resolve()
      }
    });
  });
}


/**
 * Logout signed in user
 * Logs out currently logged in user and destroys their session
 *
 * no response value expected for this operation
 **/
exports.logoutUser = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Update a user
 * Updates a user with id that matches userId value using new values from the request body.
 *
 * body User The id and registeredAt in the request body are not required and any values submitted for them will be ignored.
 * userId Long Id of user that needs to be updated
 * returns User
 **/
exports.updateUser = function(body,userId) {
  return new Promise(function(resolve, reject) {
    MySQL.db().query('UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ? WHERE id = ? LIMIT 1', [body.firstName, body.lastName, body.email, crypto.createHash('md5').update(body.password).digest("hex"), userId], (error, results) => {
      if (error) {
        resolve()
      } else {
        MySQL.db().query('SELECT id, first_name, last_name, email, registered_at FROM users WHERE id = ? LIMIT 1', [userId], (error, results) => {
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

