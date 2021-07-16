const express = require('express');
const model = require('../model/puppile.js');
const router = express.Router();

// Caregivers
router.post('/caregiver/:uid&:lat&:lng', (req, res) => {
  const { uid, lat, lng } = req.params;
  model.addFlag(uid, lat, lng, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  })
});
// e.g. localhost:3000/puppile/caregiver/1&37.75718&-122.48653

// Removers
router.get('/remover/:uid', (req, res) => {
  const { uid } = req.params;
  model.getFlags(uid, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  })
});
// e.g. localhost:3000/puppile/remover/1

router.put('/remover/:flagId', (req, res) => {
  const { flagId } = req.params;
  const { status } = req.query.status; // correct syntax?
  model.updateFlag(uid, flagId, status, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  })
});
// e.g. localhost:3000/puppile/remover/1/?status=claimed

module.exports = router;
