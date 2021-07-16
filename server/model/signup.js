const database = require('../../database');

module.exports = {
  addUser: (user, callback) => {
    const { uid, email, isCaregiver, dogType, dogName, cardNum, expMonth, expYear, cvv, zip } = user;
    const query = `INSERT INTO users VALUES ('${uid}', '${email}', ${isCaregiver}, '${dogType}', '${dogName}', '${cardNum}', '${expMonth}', '${expYear}', '${cvv}', '${zip}')`;

    database.query(query, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    })
  }
};
