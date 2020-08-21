const expect = require('chai').expect;
const app = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');

const { beforeGet, cleanUp } = require('./migrations');

chai.use(chaiHttp);

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
    //1. No saves found for user
    it('No saves found for user', () => {});
    //2. Specific save game not found for user
    it('Specific save game not found', () => {});
  });
  describe('GET /:userId/ Get all saved games for user', () => {
    //1. Return all saved games for user
    it('Return all saved games for user', () => {});
  });
  describe('GET /:userId/:savedGame Get specific saved game for user', () => {
    //1. Return a specific saved game
    it('Return a specific saved game', () => {});
  });
});

describe('/GET Get all saved games for user', () => {
  //   it('Expect API to work', async () => {
  //     const resp = await chai.request(app).get('/');
  //     expect(resp.body).to.equal('HELLO WORLD!');
  //   });
  //   it('API Wrong Route', async () => {
  //     const resp = await chai.request(app).get('/234');
  //     expect(resp.body).to.not.equal('HELLO WORLD!');
  //   });
});

describe('/PUT Update Saved Game(s)', () => {});

describe('/POST Add New Saved Game', () => {
  //1. On login/registration, make a request to this endpoint to add a new collection
});

describe('/DELETE Delete Saved Game', () => {});
