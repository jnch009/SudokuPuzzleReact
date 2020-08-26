process.env['NODE_ENV'] = 'test';
const { DeleteTests } = require('../test/SavedGames/DELETE/DeleteTests');
const { PutTests } = require('../test/SavedGames/PUT/PutTests');
const {
  PostNewSaveGame,
  PostRegister,
} = require('./SavedGames/POST/PostTests');
const { GetTests } = require('./SavedGames/GET/GetTests');
const { testConstants } = require('../constants/imports');

describe('Sudoku Tests', function () {
  this.timeout(testConstants.TIMEOUT);
  GetTests();
  PostNewSaveGame();
  PostRegister();
  PutTests();
  DeleteTests();
});
