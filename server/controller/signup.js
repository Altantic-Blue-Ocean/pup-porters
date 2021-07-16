const express = require('express');
const model = require('../model/signup.js');
const router = express.Router();

router.post('/', (req, res) => {
  console.log(req.body);
  model.addUser(req.body, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(201).send();
    }
  })
});

module.exports = router;
