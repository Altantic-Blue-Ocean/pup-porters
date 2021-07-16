const mysql = require('mysql');
const config = require('./config.js');

const connection = mysql.createConnection(config);

connection.connect(err => {
  if (err) {
    console.log('Failed to connect to database');
    console.error(err);
  } else {
    console.log('Connected to database');
  }
});

module.exports = connection;

module.exports.queryDb = function(queryString) {

  return new Promise((resolve, reject) => {
    connection.query(queryString, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
