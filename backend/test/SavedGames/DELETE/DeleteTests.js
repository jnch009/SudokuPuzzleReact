require('dotenv').config();
const {
  getToken,
  beforeGet,
  cleanUp,
  chai,
  app,
  appConstants,
  testConstants,
  objConstants,
  errorMessages,
  expect,
} = require('../../../constants/imports');

function DeleteTests() {
  describe('/DELETE Delete Saved Game(s)', function () {
    beforeEach(async function () {
      await beforeGet();
    });

    afterEach(async function () {
      await cleanUp();
    });

    describe('Negative tests', function () {
      it('Attempting to delete game number which doesn’t exist', async function () {
        const sudokuToken = await getToken(
          process.env.SUDOKU_CLIENT_ID,
          process.env.SUDOKU_CLIENT_SECRET,
          process.env.SUDOKU_AUD
        );

        const deleteSaveGame = await chai
          .request(app)
          .delete(
            `/sudoku/${appConstants.USER_FOUND}/${testConstants.GAME_OUT_OF_BOUNDS}`
          )
          .set('Authorization', `Bearer ${sudokuToken}`);
        expect(deleteSaveGame).to.have.status(400);
        expect(deleteSaveGame.body).to.equal(errorMessages.SAVE_GAME_NOT_FOUND);
      });

      it('Attempting to delete game for user id that doesn’t match/exist', async function () {
        const sudokuToken = await getToken(
          process.env.SUDOKU_CLIENT_ID,
          process.env.SUDOKU_CLIENT_SECRET,
          process.env.SUDOKU_AUD
        );

        const deleteSaveGame = await chai
          .request(app)
          .delete(
            `/sudoku/${testConstants.USER_NON_EXISTENT}/${testConstants.GAME_TO_GET}`
          )
          .set('Authorization', `Bearer ${sudokuToken}`);
        expect(deleteSaveGame).to.have.status(400);
        expect(deleteSaveGame.body).to.equal(errorMessages.USER_NON_EXISTENT);
      });
    });

    describe('Saved game deleted', function () {
      it('Saved Game is successfully deleted', async function () {
        const sudokuToken = await getToken(
          process.env.SUDOKU_CLIENT_ID,
          process.env.SUDOKU_CLIENT_SECRET,
          process.env.SUDOKU_AUD
        );

        const deleteSaveGame = await chai
          .request(app)
          .delete(
            `/sudoku/${appConstants.USER_FOUND}/${testConstants.GAME_TO_GET}`
          )
          .set('Authorization', `Bearer ${sudokuToken}`);
        expect(deleteSaveGame).to.have.status(200);
        expect(deleteSaveGame.body.saves.length).to.equal(
          objConstants.USER_SAVES_OBJ.saves.length - 1
        );
      });
    });
  });
}

module.exports = { DeleteTests };
