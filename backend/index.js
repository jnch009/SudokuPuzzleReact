require('dotenv').config();
const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const { appConstants } = require('./constants/constants');

const { handleGetSaves } = require('./controllers/GET');
const { handleRegistration, handleAddSave } = require('./controllers/POST');
const { handleUpdateSavedGame } = require('./controllers/PUT');
const { handleDeleteSavedGame } = require('./controllers/DELETE');

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
app.use(cors({ origin: true, credentials: true }));

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

app.get('/sudoku/:userId', checkJwt, checkScopes, async (req, res) => {
  handleGetSaves(req, res, client, dbName);
});

app.post('/sudoku/register', checkJwt, checkScopes, async (req, res) => {
  handleRegistration(req, res, client, dbName);
});

app.post('/sudoku', checkJwt, checkScopes, async (req, res) => {
  handleAddSave(req, res, client, dbName);
});

app.put(
  '/sudoku/:userId/:saveGame',
  checkJwt,
  checkScopes,
  async (req, res) => {
    handleUpdateSavedGame(req, res, client, dbName);
  }
);

app.delete(
  '/sudoku/:userId/:saveGame',
  checkJwt,
  checkScopes,
  async (req, res) => {
    handleDeleteSavedGame(req, res, client, dbName);
  }
);

app.get('/', (req, res) => {
  res.json('Sudoku root route');
})

app.listen(port, () => {
  console.log(`Sudoku app listening at http://localhost:${port}`);
});

module.exports = app;
