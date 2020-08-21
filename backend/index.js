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
    jwksUri: `https://jnch009.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 'https://jnch009/sudoku',
  issuer: 'https://jnch009.auth0.com/',
  algorithms: ['RS256']
});

app.get('/sudoku/', checkJwt, (req, res) => {
  res.send('Protected Route');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
