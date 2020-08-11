const express = require('express');
const app = express();
const port = 3000;

const connect = require('./connect');

connect.run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
