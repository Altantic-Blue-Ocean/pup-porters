const express = require('express')
const path = require('path')
const maphelper = require('./mapHelper');

const app = express()
const PORT = 300;

const filePath = path.join(__dirname, '../client/dist');

const serveStatic = express.static(filePath);

app.use(serveStatic);

app.get('/center', async (req, res) => {
  console.log(req.query.input)
  try {
    const result = await maphelper.getLongLatByPlace(req.query.input);
    console.log('get place result here:')
    console.log(result);
    res.status(200).send(result)
  } catch(error) {
    console.log('get place error here:')
    console.log(error)
  }
});


app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})