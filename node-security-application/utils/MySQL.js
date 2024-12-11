'use strict';

var mysql = require('mysql');

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'security_application'
});

db.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL: ' + error.stack);
    return;
  }
});

exports.db = function() {
  return db;
}