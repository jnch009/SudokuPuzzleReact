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
  isEqual,
  expect,
} = require('../../../constants/imports');

function PutTests() {
  describe('/PUT Update Saved Game(s)', function () {
    beforeEach(async function () {
      await beforeGet();
    });

    afterEach(async function () {
      await cleanUp();
    });

    describe('Negative tests', function () {
      it("Attempting to update game for user id which doesn't exist", async function () {
        const sudokuToken = await getToken(
          process.env.SUDOKU_CLIENT_ID,
          process.env.SUDOKU_CLIENT_SECRET,
          process.env.SUDOKU_AUD
        );

        const putSaveGame = await chai
          .request(app)
          .put(
            `/sudoku/${testConstants.USER_NON_EXISTENT}/${testConstants.GAME_TO_GET}`
          )
          .set('Authorization', `Bearer ${sudokuToken}`)
          .type('form')
          .send(objConstants.SUCCESS_PUT_OBJ);
        expect(putSaveGame).to.have.status(400);
        expect(putSaveGame.body).to.equal(errorMessages.USER_NON_EXISTENT);
      });

      it("Attempting to update game number which doesn't exist", async function () {
        const sudokuToken = await getToken(
          process.env.SUDOKU_CLIENT_ID,
          process.env.SUDOKU_CLIENT_SECRET,
          process.env.SUDOKU_AUD
        );

        const putSaveGame = await chai
          .request(app)
          .put(
            `/sudoku/${appConstants.USER_FOUND}/${testConstants.GAME_OUT_OF_BOUNDS}`
          )
          .set('Authorization', `Bearer ${sudokuToken}`)
          .type('form')
          .send(objConstants.SUCCESS_PUT_OBJ);
        expect(putSaveGame).to.have.status(400);
        expect(putSaveGame.body).to.equal(errorMessages.SAVE_GAME_NOT_FOUND);
      });

      it('Attempting to save game with name longer than 100 characters', async function () {
        const sudokuToken = await getToken(
          process.env.SUDOKU_CLIENT_ID,
          process.env.SUDOKU_CLIENT_SECRET,
          process.env.SUDOKU_AUD
        );

        const putSaveGame = await chai
          .request(app)
          .put(
            `/sudoku/${appConstants.USER_FOUND}/${testConstants.GAME_TO_GET}`
          )
          .set('Authorization', `Bearer ${sudokuToken}`)
          .type('form')
          .send(objConstants.EXCEEDED_NAME_PUT_OBJ);
        expect(putSaveGame).to.have.status(400);
        expect(putSaveGame.body).to.equal(errorMessages.MAX_LENGTH);
      });

      it('Attempting to save game number with an inappropriate name', async function () {
        const sudokuToken = await getToken(
          process.env.SUDOKU_CLIENT_ID,
          process.env.SUDOKU_CLIENT_SECRET,
          process.env.SUDOKU_AUD
        );

        const putSaveGame = await chai
          .request(app)
          .put(
            `/sudoku/${appConstants.USER_FOUND}/${testConstants.GAME_TO_GET}`
          )
          .set('Authorization', `Bearer ${sudokuToken}`)
          .type('form')
          .send(objConstants.INAPPROPRIATE_NAME_PUT_OBJ);
        expect(putSaveGame).to.have.status(400);
        expect(putSaveGame.body).to.equal(errorMessages.INAPPROPRIATE);
      });
    });

    describe('Saved game is updated', function () {
      it('Saved Game is successfully updated', async function () {
        const sudokuToken = await getToken(
          process.env.SUDOKU_CLIENT_ID,
          process.env.SUDOKU_CLIENT_SECRET,
          process.env.SUDOKU_AUD
        );

        const saveGameToUpdate = testConstants.GAME_TO_GET;
        const putSaveGame = await chai
          .request(app)
          .put(`/sudoku/${appConstants.USER_FOUND}/${saveGameToUpdate}`)
          .set('Authorization', `Bearer ${sudokuToken}`)
          .type('form')
          .send(objConstants.SUCCESS_PUT_OBJ);

        expect(putSaveGame).to.have.status(200);

        expect(putSaveGame.body.saves[saveGameToUpdate].date).to.not.equal(
          objConstants.USER_SAVES_OBJ.saves[saveGameToUpdate].date
        );
        expect(
          isEqual(
            putSaveGame.body.saves[saveGameToUpdate].grid,
            objConstants.USER_SAVES_OBJ.saves[saveGameToUpdate].grid
          )
        ).to.be.false;
        expect(putSaveGame.body.saves[saveGameToUpdate].name).to.not.equal(
          objConstants.USER_SAVES_OBJ.saves[saveGameToUpdate].name
        );
      });
    });
  });
}

module.exports = {
  PutTests,
};
