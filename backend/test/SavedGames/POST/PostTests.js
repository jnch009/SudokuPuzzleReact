require('dotenv').config();
const {
  beforeGet,
  cleanUp,
  beforeRegister,
  afterRegister,
  getUserByEmail,
  getManagementAPIToken,
  chai,
  app,
  objConstants,
  errorMessages,
  expect,
} = require('../../../constants/imports');

function PostRegister() {
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
      const getUser = await getUserByEmail(
        process.env.MOCK_EMAIL,
        await getManagementAPIToken()
      );

      const postRegistration = await chai
        .request(app)
        .post(`/sudoku/register`)
        .set('Authorization', `Bearer ${process.env.SUDOKU_TOKEN}`)
        .type('form')
        .send({ user_id: getUser[0].user_id });

      expect(postRegistration).to.have.status(200);
      expect(postRegistration.body._id).to.be.a('string');
      expect(postRegistration.body.saves).to.be.a('array');
    });
  });
}

function PostNewSaveGame() {
  describe('/POST Add New Saved Game', function () {
    beforeEach(async function () {
      await beforeGet();
    });

    afterEach(async function () {
      await cleanUp();
    });

    describe('Negative tests', function () {
      it('Testing length of name, should be 100 characters max', async function () {
        const postSaveGame = await chai
          .request(app)
          .post('/sudoku')
          .set('Authorization', `Bearer ${process.env.SUDOKU_TOKEN}`)
          .type('form')
          .send(objConstants.EXCEEDED_NAME_POST_OBJ);
        expect(postSaveGame).to.have.status(400);
        expect(postSaveGame.body).to.equal(errorMessages.MAX_LENGTH);
      });

      it('Testing of inappropriate name', async function () {
        const postSaveGame = await chai
          .request(app)
          .post('/sudoku')
          .set('Authorization', `Bearer ${process.env.SUDOKU_TOKEN}`)
          .type('form')
          .send(objConstants.INAPPROPRIATE_NAME_POST_OBJ);
        expect(postSaveGame).to.have.status(400);
        expect(postSaveGame.body).to.equal(errorMessages.INAPPROPRIATE);
      });

      it('Saving past the limit', async function () {
        const postSaveGame = await chai
          .request(app)
          .post('/sudoku')
          .set('Authorization', `Bearer ${process.env.SUDOKU_TOKEN}`)
          .type('form')
          .send(objConstants.MAX_SAVES_POST_OBJ);
        expect(postSaveGame).to.have.status(400);
        expect(postSaveGame.body).to.equal(errorMessages.MAX_SAVES);
      });
    });

    describe('Save Game saved correctly', function () {
      it('Save game added correctly to the array', async function () {
        const postSaveGame = await chai
          .request(app)
          .post('/sudoku')
          .set('Authorization', `Bearer ${process.env.SUDOKU_TOKEN}`)
          .type('form')
          .send(objConstants.SUCCESS_POST_OBJ);
        expect(postSaveGame).to.have.status(200);
        expect(postSaveGame.body.saves).to.have.lengthOf(1);
      });
    });
  });
}

module.exports = {
  PostNewSaveGame,
  PostRegister,
};
