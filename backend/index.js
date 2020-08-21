require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

const connect = require('./connect');

connect.run().catch(console.dir);

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.JWKS_URI
  }),

  audience: process.env.AUDIENCE,
  issuer: process.env.ISSUER,
  algorithms: ['RS256']
});

const checkScopes = jwtAuthz([ 'read:saves' ]);

app.get('/sudoku/', checkJwt, checkScopes, (req, res) => {
  res.send('Protected Route');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
