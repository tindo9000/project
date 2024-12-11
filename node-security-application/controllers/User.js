'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

module.exports.addUser = function addUser (req, res, next, body) {
  User.addUser(body)
    .then(function (response) {
      utils.writeJson(res, response, (response === undefined || response === '' || response.length == 0) ? 400: 201);
    })
    .catch(function (response) {
      utils.writeJson(res, response, 500);
    });
};

module.exports.deleteUser = function deleteUser (req, res, next, userId) {
  User.deleteUser(userId)
    .then(function (response) {
      console.log(response)
      utils.writeJson(res, response, response == '1' ? 204: 404);
    })
    .catch(function (response) {
      utils.writeJson(res, response, 500);
    });
};

module.exports.findUserById = function findUserById (req, res, next, userId) {
  User.findUserById(userId)
    .then(function (response) {
      utils.writeJson(res, response, (response === undefined || response === '' || response.length == 0) ? 404: 200);
    })
    .catch(function (response) {
      utils.writeJson(res, response, 500);
    });
};

module.exports.getUsers = function getUsers (req, res, next) {
  User.getUsers()
    .then(function (response) {
      utils.writeJson(res, response, (response === undefined || response === '') ? 404: 200);
    })
    .catch(function (response) {
      utils.writeJson(res, response, 500);
    });
};

module.exports.loginUser = function loginUser (req, res, next, body) {
  User.loginUser(body)
    .then(function (response) {
      utils.writeJson(res, response, (response === undefined || response === '' || response.length == 0) ? 403: 200);
    })
    .catch(function (response) {
      utils.writeJson(res, response, 500);
    });
};

module.exports.logoutUser = function logoutUser (req, res, next) {
  User.logoutUser()
    .then(function (response) {
      utils.writeJson(res, response, 204);
    })
    .catch(function (response) {
      utils.writeJson(res, response, 500);
    });
};

module.exports.updateUser = function updateUser (req, res, next, body, userId) {
  User.updateUser(body, userId)
    .then(function (response) {
      utils.writeJson(res, response, (response === undefined || response === '' || response.length == 0) ? 404: 200);
    })
    .catch(function (response) {
      utils.writeJson(res, response, 500);
    });
};
