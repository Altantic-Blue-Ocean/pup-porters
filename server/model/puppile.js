const database = require('../../database');
module.exports = {
  // Caregivers
  addFlag: (uid, lat, lng, callback) => { // REFACTOR NEEDED (only returns available flags)
    const price = 5.00;
    const query = `INSERT INTO flags (caregiver_id, coords, price) VALUES ('${uid}', Point(${lat}, ${lng}), ${price})`;
    database.query(query, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });
  },

  // Removers
  getFlags: (uid, callback) => { // REFACTOR NEEDED (only returns available flags)
    const query = `
      SELECT
        flags.id as flag_id,
        (SELECT dog_type WHERE flags.caregiver_id = users.id) as dog_type,
        (SELECT ST_X(coords)) as lat,
        (SELECT ST_Y(coords)) as lng,
        price
      FROM users INNER JOIN flags
      WHERE users.id = flags.caregiver_id and flags.pile_status = 'available';
    `;
    database.query(query, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });
  },

  updateFlag: (uid, flagId, status, callback) => {
    const query = `UPDATE flags SET status = ${status} WHERE id = ${flagId}`;
    database.query(query, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });
  }
};
