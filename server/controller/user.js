const express = require('express');
const model = require('../model/user.js');
const router = express.Router();

router.get('/:uid', (req, res) => {
  const { uid } = req.params;
  model.getUser(uid, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  })
});
// e.g. localhost:3000/user/1


module.exports = router;
