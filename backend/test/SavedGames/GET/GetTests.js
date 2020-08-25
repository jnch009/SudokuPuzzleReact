require('dotenv').config();
const {
  getToken,
  beforeGet,
  cleanUp,
  appConstants,
  testConstants,
  chai,
  app,
  errorMessages,
  expect,
} = require('../../../constants/imports');

function GetTests() {
  describe('/GET', function () {
    beforeEach(async function () {
      await beforeGet();
    });

    afterEach(async function () {
      await cleanUp();
    });

    describe('Negative tests', function () {
      it('No saves found for user', async function () {
        const sudokuToken = await getToken(
          process.env.SUDOKU_CLIENT_ID,
          process.env.SUDOKU_CLIENT_SECRET,
          process.env.SUDOKU_AUD
        );

        const resp = await chai
          .request(app)
          .get(`/sudoku/${appConstants.USER_NO_SAVES}`)
          .set('Authorization', `Bearer ${sudokuToken}`);
        expect(resp).to.have.status(404);
        expect(resp.body).to.equal(errorMessages.NO_SAVES);
      });

      it('Specific save game not found', async function () {
        const sudokuToken = await getToken(
          process.env.SUDOKU_CLIENT_ID,
          process.env.SUDOKU_CLIENT_SECRET,
          process.env.SUDOKU_AUD
        );

        const resp = await chai
          .request(app)
          .get(`/sudoku/${appConstants.USER_FOUND}`)
          .query({ saveGame: testConstants.GAME_OUT_OF_BOUNDS })
          .set('Authorization', `Bearer ${sudokuToken}`);
        expect(resp).to.have.status(404);
        expect(resp.body).to.equal(errorMessages.SAVE_GAME_NOT_FOUND);
      });

      it('User id does not match', async function () {
        const sudokuToken = await getToken(
          process.env.SUDOKU_CLIENT_ID,
          process.env.SUDOKU_CLIENT_SECRET,
          process.env.SUDOKU_AUD
        );

        const resp = await chai
          .request(app)
          .get(`/sudoku/${testConstants.USER_NON_EXISTENT}`)
          .set('Authorization', `Bearer ${sudokuToken}`);
        expect(resp.body).to.equal(errorMessages.NO_SAVES);
      });
    });

    describe('GET /:userId/ Get all saved games for user', function () {
      it('Return all saved games for user', async function () {
        const sudokuToken = await getToken(
          process.env.SUDOKU_CLIENT_ID,
          process.env.SUDOKU_CLIENT_SECRET,
          process.env.SUDOKU_AUD
        );

        const resp = await chai
          .request(app)
          .get(`/sudoku/${appConstants.USER_FOUND}`)
          .set('Authorization', `Bearer ${sudokuToken}`);
        expect(resp).to.have.status(200);
        expect(resp.body).to.be.a('array');
        expect(resp.body).to.have.lengthOf(2);
      });
    });

    describe('GET /:userId/ Get specific saved game for user', function () {
      it('Return a specific saved game', async function () {
        const sudokuToken = await getToken(
          process.env.SUDOKU_CLIENT_ID,
          process.env.SUDOKU_CLIENT_SECRET,
          process.env.SUDOKU_AUD
        );

        const resp = await chai
          .request(app)
          .get(`/sudoku/${appConstants.USER_FOUND}`)
          .query({ saveGame: testConstants.GAME_TO_GET })
          .set('Authorization', `Bearer ${sudokuToken}`);
        expect(resp).to.have.status(200);
        expect(resp.body.name).to.be.a('string');
        expect(resp.body.grid).to.be.a('array');
        expect(resp.body.grid).to.have.lengthOf(5);
      });
    });
  });
}

module.exports = {
    GetTests
}