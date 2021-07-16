const database = require('../../database');

module.exports = {
  getDropoffs: (callback) => database.query(`SELECT * FROM dropoffs`, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  })
};
