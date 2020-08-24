require('dotenv').config();
const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
const port = 3000;
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const {
  errorMessages,
  appConstants,
  objConstants,
} = require('./constants/constants');
const e = require('express');

const client = new MongoClient(appConstants.MONGO_URL);
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

app.get('/sudoku/:userId', async (req, res) => {
  try {
    const db = client.db(process.env['NODE_ENV'] === 'test' ? 'test' : dbName);
    const col = db.collection('saves');
    const toGet = req.query.saveGame;

    const getSaves = await col.findOne({ _id: req.params.userId });
    if (getSaves === null || getSaves.saves.length === 0) {
      res.status(404).json(errorMessages.NO_SAVES);
    } else if (toGet > getSaves.saves.length) {
      res.status(404).json(errorMessages.SAVE_GAME_NOT_FOUND);
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
    res.json(await col.findOne({ _id: req.body.user_id }));
  } catch (err) {
    res.status(400).json(err.stack);
  }
});

app.post('/sudoku', checkJwt, checkScopes, async (req, res) => {
  try {
    const regex = new RegExp(process.env.REGEX_CURSE_WORDS);
    if (req.body.saveGame.name.length > 100) {
      res.status(400).json(errorMessages.MAX_LENGTH);
    } else if (regex.test(req.body.saveGame.name)) {
      res.status(400).json(errorMessages.INAPPROPRIATE);
    } else {
      const db = client.db(
        process.env['NODE_ENV'] === 'test' ? 'test' : dbName
      );
      const col = db.collection('saves');
      const getSaves = await col.findOne({ _id: req.body.user_id });
      if (getSaves.saves.length >= 9) {
        res.status(400).json(errorMessages.MAX_SAVES);
      } else {
        await col.updateOne(
          { _id: req.body.user_id },
          {
            $push: {
              saves: req.body.saveGame,
            },
          }
        );
        res.json(await col.findOne({ _id: req.body.user_id }));
      }
    }
  } catch (err) {
    res.status(400).json(err.stack);
  }
});

app.put(
  '/sudoku/:userId/:saveGame',
  checkJwt,
  checkScopes,
  async (req, res) => {
    try {
      const regex = new RegExp(process.env.REGEX_CURSE_WORDS);
      if (req.body.saveGame.name.length > 100) {
        res.status(400).json(errorMessages.MAX_LENGTH);
      } else if (regex.test(req.body.saveGame.name)) {
        res.status(400).json(errorMessages.INAPPROPRIATE);
      } else {
        const db = client.db(
          process.env['NODE_ENV'] === 'test' ? 'test' : dbName
        );
        const col = db.collection('saves');
        const getSaves = await col.findOne({ _id: req.params.userId });

        if (getSaves === null) {
          res.status(400).json(errorMessages.USER_NON_EXISTENT);
        } else {
          if (getSaves.saves[req.params.saveGame - 1] === undefined) {
            res.status(400).json(errorMessages.SAVE_GAME_NOT_FOUND);
          } else {
            const updatedSaveGame = req.body.saveGame;
            getSaves.saves.splice(req.params.saveGame - 1, 1, updatedSaveGame);

            await col.updateOne(
              { _id: req.params.userId },
              {
                $set: {
                  saves: getSaves.saves,
                },
              }
            );
            res.json(await col.findOne({ _id: req.params.userId }));
          }
        }
      }
    } catch (err) {
      res.status(400).json(err.stack);
    }
  }
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
