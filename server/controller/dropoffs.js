const express = require('express');
const model = require('../model/dropoffs.js');
const router = express.Router();

router.get('/', (req, res) => {
  model.getDropoffs((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  })
});

module.exports = router;
