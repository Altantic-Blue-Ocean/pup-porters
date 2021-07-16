const database = require('../../database');

const claimPile = async (claim) => {
    console.log("Claiming pile");
    console.log(claim);

    await database.beginTransaction();

    try {
        const selectAvailableSql = `SELECT * FROM available_piles WHERE id="${claim.available_pile_id}"`;
        console.log(selectAvailableSql);
        const availablePiles = await database.queryDb(selectAvailableSql);

        if (availablePiles.length !== 1) {
            throw new Error("Claimed pile should match exactly one available pile");
        }

        const availablePile = availablePiles[0];

        const deleteAvailableSql = `DELETE FROM available_piles WHERE id="${claim.available_pile_id}"`;
        console.log(deleteAvailableSql);
        await database.queryDb(deleteAvailableSql);

        const insertClaimedSql = `INSERT INTO claimed_piles (coords, remover_user_id) VALUES (Point(${availablePile.coords.x}, ${availablePile.coords.y}), ${claim.remover_user_id})`;
        console.log(insertClaimedSql);
        const insertResult = await database.queryDb(insertClaimedSql);

        database.commit();

        return {
            id: insertResult.insertId,
            coords: {
                lat: availablePile.coords.x,
                lng: availablePile.coords.y,
            },
            remover_user_id: claim.remover_user_id
        };
    } catch (error) {
        console.log("Error claiming pile")
        console.log(error);
        database.rollback();
    }
}

const deletePile = async (id) => {
  let str = `DELETE FROM claimed_piles WHERE id="${id}"`
  console.log(str);
  await database.queryDb(str);
};


const getClaimedPile = async () => {

  try {

    const res = await database.queryDb(`SELECT * FROM claimed_piles`);
    console.log(res)
    return res.map((pile) => {
      return {
        id: pile.id,
        coords: {lat: pile.coords.x, lng: pile.coords.y},
        remover_user_id: pile.remover_user_id,
      }
    });
  } catch(error) {
    console.log(error)
  }
}

module.exports = {
  claimPile: claimPile,
  deletePile: deletePile,
  getClaimedPile: getClaimedPile
};
