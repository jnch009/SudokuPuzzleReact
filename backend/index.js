require('dotenv').config();
const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
const port = 3000;
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

const url = `mongodb+srv://jnch009:${process.env.MONGO_PASS}@sudokusavedgames.xaesp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true`;
const client = new MongoClient(url);

async function connectMongoClient(req, res, next) {
  try {
    if (!client.isConnected()) await client.connect();
  } catch (err) {
    console.log(err.stack);
  }
  next();
}

app.use(connectMongoClient);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

let dbName = 'sudokuSaves';

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.JWKS_URI,
  }),

  audience: process.env.AUDIENCE,
  issuer: process.env.ISSUER,
  algorithms: ['RS256'],
});

const checkScopes = jwtAuthz(['read:saves', 'write:saves'], {
  checkAllScopes: true,
});

app.get('/', (req, res) => {
  res.json('HELLO WORLD!');
});

app.get('/sudoku/', checkJwt, checkScopes, (req, res) => {
  res.send('Protected Route');
});

app.get('/sudoku/:userId', async (req, res) => {
  try {
    const db = client.db(process.env['NODE_ENV'] === 'test' ? 'test' : dbName);
    const col = db.collection('saves');
    const toGet = req.query.saveGame;

    const getSaves = await col.findOne({ _id: req.params.userId });
    if (getSaves === null || getSaves.saves.length === 0) {
      res.status(404).json('No Saves Found');
    } else if (toGet > getSaves.saves.length) {
      res.status(404).json('Save game not found');
    } else {
      toGet === undefined
        ? res.json(getSaves.saves)
        : res.json(getSaves.saves[toGet - 1]);
    }
  } catch (err) {
    res.status(400).json(err.stack);
  }
});

app.post('/sudoku/register', checkJwt, checkScopes, async (req, res) => {
  try {
    const db = client.db(process.env['NODE_ENV'] === 'test' ? 'test' : dbName);
    const col = db.collection('saves');
    const userDocument = {
      _id: req.body.user_id,
      saves: [],
    };

    await col.insertOne(userDocument);
    res.json(await col.findOne({_id: req.body.user_id}));
  } catch (err) {
    res.status(400).json(err.stack);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
