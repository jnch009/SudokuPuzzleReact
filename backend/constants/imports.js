const expect = require('chai').expect;
const app = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const isEqual = require('lodash.isequal');
const {
  testConstants,
  objConstants,
  appConstants,
  errorMessages,
} = require('./constants');

const {
  beforeGet,
  cleanUp,
  beforeRegister,
  afterRegister,
  getUserByEmail,
  getManagementAPIToken,
} = require('../test/migrations');

module.exports = {
  expect,
  app,
  chai,
  chaiHttp,
  isEqual,
  testConstants,
  objConstants,
  appConstants,
  errorMessages,
  beforeGet,
  cleanUp,
  beforeRegister,
  afterRegister,
  getUserByEmail,
  getManagementAPIToken,
};
