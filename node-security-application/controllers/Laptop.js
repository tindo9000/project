'use strict';

var utils = require('../utils/writer.js');
var Laptop = require('../service/LaptopService');

module.exports.addLaptop = function addLaptop (req, res, next, body) {
  Laptop.addLaptop(body)
    .then(function (response) {
      utils.writeJson(res, response, (response === undefined || response === '' || response.length == 0) ? 400: 201);
    })
    .catch(function (response) {
      utils.writeJson(res, response, 500);
    });
};

module.exports.deleteLaptop = function deleteLaptop (req, res, next, laptopId) {
  Laptop.deleteLaptop(laptopId)
    .then(function (response) {
      console.log(response)
      utils.writeJson(res, response, response == '1' ? 204: 404);
    })
    .catch(function (response) {
      utils.writeJson(res, response, 500);
    });
};

module.exports.findLaptopById = function findLaptopById (req, res, next, laptopId) {
  Laptop.findLaptopById(laptopId)
    .then(function (response) {
      utils.writeJson(res, response, (response === undefined || response === '' || response.length == 0) ? 404: 200);
    })
    .catch(function (response) {
      utils.writeJson(res, response, 500);
    });
};

module.exports.findStudentByLaptopSerialNumber = function findStudentByLaptopSerialNumber (req, res, next, body) {
  Laptop.findStudentByLaptopSerialNumber(body)
    .then(function (response) {
      utils.writeJson(res, response, (response === undefined || response === '' || response.length == 0) ? 404: 200);
    })
    .catch(function (response) {
      utils.writeJson(res, response, 500);
    });
};

module.exports.getLaptops = function getLaptops (req, res, next) {
  Laptop.getLaptops()
    .then(function (response) {
      utils.writeJson(res, response, (response === undefined || response === '') ? 404: 200);
    })
    .catch(function (response) {
      utils.writeJson(res, response, 500);
    });
};

module.exports.updateLaptop = function updateLaptop (req, res, next, body, laptopId) {
  Laptop.updateLaptop(body, laptopId)
    .then(function (response) {
      utils.writeJson(res, response, (response === undefined || response === '' || response.length == 0) ? 404: 200);
    })
    .catch(function (response) {
      utils.writeJson(res, response, 500);
    });
};
