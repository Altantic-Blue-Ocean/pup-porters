const database = require('../../database');

module.exports = {
  getUser: (uid, callback) => database.query(`SELECT email, is_caregiver, dog_type, dog_name, card_num, exp_month, exp_year, cvv, zip_code FROM users WHERE id = ${uid}`, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  })
};
