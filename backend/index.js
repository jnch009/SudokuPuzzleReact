require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

const connect = require('./connect');

connect.run().catch(console.dir);

// Authentication middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and 
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.JWKS_URI
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUDIENCE,
  issuer: process.env.ISSUER,
  algorithms: ['RS256']
});

app.get('/sudoku/', checkJwt, (req, res) => {
  res.send('Protected Route');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
