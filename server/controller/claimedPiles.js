const express = require('express');
const model = require('../model/claimedPiles.js');
const router = express.Router();

router.post('/', async (req, res) => {
    console.log("Handling claim pile post");
    const claim = req.body;
    console.log('CLAIM')
    console.log(claim);
    try {
        const result = await model.claimPile(claim);
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});


router.delete('/:id', async (req, res) => {
    console.log("Handling delete claimed pile");
    const id = req.params.id;
    console.log(id);
    try {
        await model.deletePile(id);
        res.status(200).send();
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
})


router.get('/', async (req, res) => {

    try {
        const result = await model.getClaimedPile();
        console.log(result)
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;
