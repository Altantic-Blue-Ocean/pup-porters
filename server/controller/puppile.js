const express = require('express');
const model = require('../model/puppile.js');
const router = express.Router();

router.get('/', (req, res) => {
  model.getFlags((err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  })
});

module.exports = router;
