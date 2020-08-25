process.env['NODE_ENV'] = 'test';
const { DeleteTests } = require('../test/SavedGames/DELETE/DeleteTests');
const { PutTests } = require('../test/SavedGames/PUT/PutTests');
const { PostNewSaveGame, PostRegister }  = require('./SavedGames/POST/PostTests');
const { GetTests } = require('./SavedGames/GET/GetTests');

describe('Sudoku Tests', function () {
  this.timeout(10000);
  GetTests();
  PostNewSaveGame();
  PostRegister();
  PutTests();
  DeleteTests();
});
