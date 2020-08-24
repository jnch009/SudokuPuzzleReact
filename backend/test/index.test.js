require('dotenv').config();
process.env['NODE_ENV'] = 'test';

const expect = require('chai').expect;
const app = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const isEqual = require('lodash.isequal');
const {
  testConstants,
  objConstants,
  appConstants,
  errorMessages,
} = require('../constants/constants');

const {
  beforeGet,
  cleanUp,
  beforeRegister,
  afterRegister,
  getToken,
  getUserByEmail,
  getManagementAPIToken,
} = require('./migrations');

chai.use(chaiHttp);

describe('Sudoku Tests', function () {
  this.timeout(10000);

  describe('/GET', function () {
    beforeEach(async function () {
      await beforeGet();
    });

    afterEach(async function () {
      await cleanUp();
    });

    describe('Negative tests', function () {
      it('No saves found for user', async function () {
        const resp = await chai
          .request(app)
          .get(`/sudoku/${appConstants.USER_NO_SAVES}`);
        expect(resp).to.have.status(404);
        expect(resp.body).to.equal(errorMessages.NO_SAVES);
      });

      it('Specific save game not found', async function () {
        const resp = await chai
          .request(app)
          .get(`/sudoku/${appConstants.USER_FOUND}`)
          .query({ saveGame: testConstants.GAME_OUT_OF_BOUNDS });
        expect(resp).to.have.status(404);
        expect(resp.body).to.equal(errorMessages.SAVE_GAME_NOT_FOUND);
      });

      it('User id does not match', async function () {
        const resp = await chai
          .request(app)
          .get(`/sudoku/${testConstants.USER_NON_EXISTENT}`);
        expect(resp.body).to.equal(errorMessages.NO_SAVES);
      });
    });

    describe('GET /:userId/ Get all saved games for user', function () {
      it('Return all saved games for user', async function () {
        const resp = await chai
          .request(app)
          .get(`/sudoku/${appConstants.USER_FOUND}`);
        expect(resp).to.have.status(200);
        expect(resp.body).to.be.a('array');
        expect(resp.body).to.have.lengthOf(2);
      });
    });

    describe('GET /:userId/ Get specific saved game for user', function () {
      it('Return a specific saved game', async function () {
        const resp = await chai
          .request(app)
          .get(`/sudoku/${appConstants.USER_FOUND}`)
          .query({ saveGame: testConstants.GAME_TO_GET });
        expect(resp).to.have.status(200);
        expect(resp.body.name).to.be.a('string');
        expect(resp.body.grid).to.be.a('array');
        expect(resp.body.grid).to.have.lengthOf(5);
      });
    });
  });

  describe('/POST Add New Saved Game', function () {
    beforeEach(async function () {
      await beforeGet();
    });

    afterEach(async function () {
      await cleanUp();
    });

    describe('Negative tests', function () {
      it('Testing length of name, should be 100 characters max', async function () {
        const sudokuToken = await getToken(
          process.env.SUDOKU_CLIENT_ID,
          process.env.SUDOKU_CLIENT_SECRET,
          process.env.SUDOKU_AUD
        );

        const postSaveGame = await chai
          .request(app)
          .post('/sudoku')
          .set('Authorization', `Bearer ${sudokuToken}`)
          .type('form')
          .send(objConstants.EXCEEDED_NAME_POST_OBJ);
        expect(postSaveGame).to.have.status(400);
        expect(postSaveGame.body).to.equal(errorMessages.MAX_LENGTH);
      });

      it('Testing of inappropriate name', async function () {
        const sudokuToken = await getToken(
          process.env.SUDOKU_CLIENT_ID,
          process.env.SUDOKU_CLIENT_SECRET,
          process.env.SUDOKU_AUD
        );

        const postSaveGame = await chai
          .request(app)
          .post('/sudoku')
          .set('Authorization', `Bearer ${sudokuToken}`)
          .type('form')
          .send(objConstants.INAPPROPRIATE_NAME_POST_OBJ);
        expect(postSaveGame).to.have.status(400);
        expect(postSaveGame.body).to.equal(errorMessages.INAPPROPRIATE);
      });

      it('Saving past the limit', async function () {
        const sudokuToken = await getToken(
          process.env.SUDOKU_CLIENT_ID,
          process.env.SUDOKU_CLIENT_SECRET,
          process.env.SUDOKU_AUD
        );

        const postSaveGame = await chai
          .request(app)
          .post('/sudoku')
          .set('Authorization', `Bearer ${sudokuToken}`)
          .type('form')
          .send(objConstants.MAX_SAVES_POST_OBJ);
        expect(postSaveGame).to.have.status(400);
        expect(postSaveGame.body).to.equal(errorMessages.MAX_SAVES);
      });
    });

    describe('Save Game saved correctly', function () {
      it('Save game added correctly to the array', async function () {
        const sudokuToken = await getToken(
          process.env.SUDOKU_CLIENT_ID,
          process.env.SUDOKU_CLIENT_SECRET,
          process.env.SUDOKU_AUD
        );

        const postSaveGame = await chai
          .request(app)
          .post('/sudoku')
          .set('Authorization', `Bearer ${sudokuToken}`)
          .type('form')
          .send(objConstants.SUCCESS_POST_OBJ);
        expect(postSaveGame).to.have.status(200);
        expect(postSaveGame.body.saves).to.have.lengthOf(1);
      });
    });
  });

  describe('/POST user registers', function () {
    beforeEach(async function () {
      await beforeRegister();
      await beforeGet();
    });

    afterEach(async function () {
      await afterRegister();
      await cleanUp();
    });

    it('Testing new entry added for user', async function () {
      const sudokuToken = await getToken(
        process.env.SUDOKU_CLIENT_ID,
        process.env.SUDOKU_CLIENT_SECRET,
        process.env.SUDOKU_AUD
      );

      const getUser = await getUserByEmail(
        process.env.MOCK_EMAIL,
        await getManagementAPIToken()
      );

      const postRegistration = await chai
        .request(app)
        .post(`/sudoku/register`)
        .set('Authorization', `Bearer ${sudokuToken}`)
        .type('form')
        .send({ user_id: getUser[0].user_id });

      expect(postRegistration).to.have.status(200);
      expect(postRegistration.body._id).to.be.a('string');
      expect(postRegistration.body.saves).to.be.a('array');
    });
  });

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
});
