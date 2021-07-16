const express = require('express');
const model = require('../model/user.js');
const router = express.Router();

router.get('/:uid', (req, res) => {
  const { uid } = req.params;
  model.getUser(uid, (err, data) => {
    if (err) {
      console.log(err)
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  })
});

module.exports = router;
