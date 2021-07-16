const express = require('express');
const model = require('../model/user.js');
const router = express.Router();

router.get('/', (req, res) => {
  model.getUser(req.params.uid, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  })
});

module.exports = router;
