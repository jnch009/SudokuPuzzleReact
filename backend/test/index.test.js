require('dotenv').config();
process.env['NODE_ENV'] = 'test';

const expect = require('chai').expect;
const app = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');

const {
  beforeGet,
  cleanUp,
  beforeRegister,
  afterRegister,
  getToken,
  getUserByEmail,
  getManagementAPIToken,
  userFound,
  userNoSaves,
  userIdMaxSaves,
} = require('./migrations');

chai.use(chaiHttp);

const userNonExistant = '234u29340923840923';
const gameToGet = 2;
const gameOutOfBounds = 23;

describe('Sudoku Tests', function () {
  this.timeout(5000);

  describe('GET', function () {
    beforeEach(async function () {
      await beforeGet();
    });

    afterEach(async function () {
      await cleanUp();
    });

    describe('Negative tests', function () {
      it('No saves found for user', async function () {
        const resp = await chai.request(app).get(`/sudoku/${userNoSaves}`);
        expect(resp).to.have.status(404);
        expect(resp.body).to.equal('No Saves Found');
      });

      it('Specific save game not found', async function () {
        const resp = await chai
          .request(app)
          .get(`/sudoku/${userFound}`)
          .query({ saveGame: gameOutOfBounds });
        expect(resp).to.have.status(404);
        expect(resp.body).to.equal('Save game not found');
      });

      it('User id does not match', async function () {
        const resp = await chai.request(app).get(`/sudoku/${userNonExistant}`);
        expect(resp.body).to.equal('No Saves Found');
      });
    });

    describe('GET /:userId/ Get all saved games for user', function () {
      it('Return all saved games for user', async function () {
        const resp = await chai.request(app).get(`/sudoku/${userFound}`);
        expect(resp).to.have.status(200);
        expect(resp.body).to.be.a('array');
        expect(resp.body).to.have.lengthOf(2);
      });
    });

    describe('GET /:userId/ Get specific saved game for user', function () {
      it('Return a specific saved game', async function () {
        const resp = await chai
          .request(app)
          .get(`/sudoku/${userFound}`)
          .query({ saveGame: gameToGet });
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
          .send({
            user_id: userFound,
            saveGame: {
              name: process.env.EXCEEDED_NAME,
              grid: [1, 2, 3, 4, 5],
              date: new Date(Date.now()),
            },
          });
        expect(postSaveGame).to.have.status(400);
        expect(postSaveGame.body).to.equal('Maximum length is 100 characters');
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
          .send({
            user_id: userFound,
            saveGame: {
              name: process.env.INAPPROPRIATE_NAME,
              grid: [1, 2, 3, 4, 5],
              date: new Date(Date.now()),
            },
          });
        expect(postSaveGame).to.have.status(400);
        expect(postSaveGame.body).to.equal(
          'Inappropriate words found, please be courteous'
        );
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
          .send({
            user_id: userIdMaxSaves,
            saveGame: {
              name: 'Testing max',
              grid: [1, 2, 3, 4, 5],
              date: new Date(Date.now()),
            },
          });
        expect(postSaveGame).to.have.status(400);
        expect(postSaveGame.body).to.equal(
          'Maximum saves is 9, please overwrite or delete a save file'
        );
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
          .send({
            user_id: userNoSaves,
            saveGame: {
              name: 'Testing Success',
              grid: [1, 2, 3, 4, 5],
              date: new Date(Date.now()),
            },
          });
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

  describe('/PUT Update Saved Game(s)', function () {});

  describe('/DELETE Delete Saved Game(s)', function () {});
});
