const database = require('../../database');

let getAvailablePiles = async () => {
    console.log('available pile')

    try {
      const res = await database.queryDb(`SELECT * FROM available_piles`);
      console.log(res);
      return res.map((pile) => {
          return {
              id: pile.id,
              coords: {lat: pile.coords.x, lng: pile.coords.y},
              caregiver_user_id: pile.caregiver_user_id,
          }
      });
    } catch (error) {
      console.log("Error with available pile")
      console.log(error);
    }
  };

const insertAvailablePile = async (availablePile) => {
    console.log("Inserting available pile");
    console.log(availablePile);

    const insertSql = `INSERT INTO available_piles (coords, caregiver_user_id) VALUES (Point(${availablePile.coords.lat}, ${availablePile.coords.lng}), ${availablePile.caregiver_user_id})`;
    console.log(insertSql);
    const result = await database.queryDb(insertSql);

    console.log("insert success");
    console.log(result);

    var insertedPile = availablePile;
    insertedPile.id = result.insertId;
    return insertedPile;
}

module.exports = {
  getAvailablePiles: getAvailablePiles,
  insertAvailablePile: insertAvailablePile
};
