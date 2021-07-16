const database = require('../../database');

module.exports = {
  getFlags: (callback) => database.query(`SELECT * FROM flags`, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  })
};
