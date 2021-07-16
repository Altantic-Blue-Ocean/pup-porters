const express = require('express');
const model = require('../model/availablePiles.js');
const router = express.Router();

router.get('/', async (req, res) => {
    console.log("Handling get available piles");
    try {
        const result = await model.getAvailablePiles();
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/', async (req, res) => {
  console.log("Handling post available pile");
  const pile = req.body;
  console.log(pile);

  try {
      const result = await model.insertAvailablePile(pile);
      res.status(201).send(result);
  } catch (error) {
      res.status(500).send(error);
  }
});

module.exports = router;
