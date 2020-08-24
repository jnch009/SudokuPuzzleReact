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
} = require('./migrations');

chai.use(chaiHttp);

const sudokuClientId = 'eBLyUrakkSNPNOWrSe9zgcV8Uc92wFcg';
const sudokuAud = 'https://jnch009/sudoku';

const userNonExistant = '234u29340923840923';
const userFound = '12312312';
const userNoSaves = '123';
const gameToGet = 2;
const gameOutOfBounds = 23;

describe('First test', () => {
  it('Should assert true to be true', () => {
    expect(true).to.be.true;
  });
});

describe('GET', () => {
  beforeEach(async function () {
    await beforeGet();
  });

  afterEach(async () => {
    await cleanUp();
  });

  describe('Negative tests', () => {
    it('No saves found for user', async () => {
      const resp = await chai.request(app).get(`/sudoku/${userNoSaves}`);
      expect(resp).to.have.status(404);
      expect(resp.body).to.equal('No Saves Found');
    });

    it('Specific save game not found', async () => {
      const resp = await chai
        .request(app)
        .get(`/sudoku/${userFound}`)
        .query({ saveGame: gameOutOfBounds });
      expect(resp).to.have.status(404);
      expect(resp.body).to.equal('Save game not found');
    });

    it('User id does not match', async () => {
      const resp = await chai.request(app).get(`/sudoku/${userNonExistant}`);
      expect(resp.body).to.equal('No Saves Found');
    });
  });

  describe('GET /:userId/ Get all saved games for user', () => {
    it('Return all saved games for user', async () => {
      const resp = await chai.request(app).get(`/sudoku/${userFound}`);
      expect(resp).to.have.status(200);
      expect(resp.body).to.be.a('array');
      expect(resp.body).to.have.lengthOf(2);
    });
  });

  describe('GET /:userId/ Get specific saved game for user', () => {
    it('Return a specific saved game', async () => {
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

describe('/POST Add New Saved Game', () => {
  beforeEach(async function () {
    await beforeGet();
  });

  afterEach(async () => {
    await cleanUp();
  });

  describe('Negative tests', () => {
    it('Testing length of name, should be 100 characters max', async () => {});

    it('Testing of inappropriate name', async () => {});

    it('Saving past the limit', async () => {});
  });

  describe('Save Game saved correctly', () => {
    it('Save game added correctly to the array', async () => {});
  });
});

describe('/POST user registers', () => {
  beforeEach(async function () {
    await beforeRegister();
    await beforeGet();
  });

  afterEach(async function () {
    await afterRegister();
    await cleanUp();
  });

  it('Testing new entry added for user', async () => {
    const sudokuToken = await getToken(
      sudokuClientId,
      process.env.SUDOKU_CLIENT_SECRET,
      sudokuAud
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

describe('/PUT Update Saved Game(s)', () => {});

describe('/DELETE Delete Saved Game(s)', () => {});
