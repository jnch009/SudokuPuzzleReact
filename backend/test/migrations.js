require('dotenv').config();
const { MongoClient } = require('mongodb');
const axios = require('axios');

// Replace the following with your Atlas connection string
const url = `mongodb+srv://jnch009:${process.env.MONGO_PASS}@sudokusavedgames.xaesp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true`;
const mockPassword = "kTL&4e?R9'_dH3.q";

const dbName = 'test';
const userFound = '12312312';
const userNoSaves = '123';
const userIdMaxSaves = '6969';
const connection = 'Username-Password-Authentication';

const userWithSaves = {
  _id: userFound, //technically the player's user id
  saves: [
    { name: 'jeremy1', grid: [2, 3, 5, 6], date: new Date(Date.now()) },
    { name: 'jeremy2', grid: [5, 6, 8, 9, 3], date: new Date(Date.now()) },
  ],
};

const userWithNoSaves = {
  _id: userNoSaves, //technically the player's user id
  saves: [],
};

const userMaxSaves = {
  _id: userIdMaxSaves,
  saves: [
    { name: 'jeremy1', grid: [2, 3, 5, 6], date: new Date(Date.now()) },
    { name: 'jeremy2', grid: [2, 3, 5, 6], date: new Date(Date.now()) },
    { name: 'jeremy3', grid: [2, 3, 5, 6], date: new Date(Date.now()) },
    { name: 'jeremy4', grid: [2, 3, 5, 6], date: new Date(Date.now()) },
    { name: 'jeremy5', grid: [2, 3, 5, 6], date: new Date(Date.now()) },
    { name: 'jeremy6', grid: [2, 3, 5, 6], date: new Date(Date.now()) },
    { name: 'jeremy7', grid: [2, 3, 5, 6], date: new Date(Date.now()) },
    { name: 'jeremy8', grid: [2, 3, 5, 6], date: new Date(Date.now()) },
    { name: 'jeremy9', grid: [2, 3, 5, 6], date: new Date(Date.now()) },
  ],
  date: new Date(Date.now()),
};

let client;

const getToken = async (client_id, secret, aud) => {
  const res = await axios.post(
    process.env.TOKEN_API_ENDPOINT,
    {
      grant_type: 'client_credentials',
      client_id: client_id,
      client_secret: secret,
      audience: aud,
    },
    { headers: { 'content-type': 'application/json' } }
  );

  return res.data.access_token;
};

const getUserByEmail = async (email, access_token) => {
  const res = await axios.get(process.env.GET_USER_BY_EMAIL_ENDPOINT, {
    params: {
      email,
    },
    headers: { Authorization: `Bearer ${access_token}` },
  });
  return res.data;
};

const getManagementAPIToken = async () => {
  return await getToken(
    process.env.MANAGEMENT_CLIENT_ID,
    process.env.MANAGEMENT_CLIENT_SECRET,
    process.env.MANAGEMENT_AUD
  );
}

const beforeGet = async () => {
  try {
    client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);

    const col = db.collection('saves');
    await col.insertMany([userWithSaves, userWithNoSaves]);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
};

const cleanUp = async () => {
  client = new MongoClient(url);
  try {
    await client.connect();
    await client.db(dbName).dropDatabase();
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
};

const beforeRegister = async () => {
  try {
    await axios.post(process.env.REGISTER_ENDPOINT, {
      client_id: process.env.SPA_CLIENT_ID,
      email: process.env.MOCK_EMAIL,
      password: mockPassword,
      connection: connection,
    });
  } catch (err) {
    console.log(err);
  }
};

const afterRegister = async () => {
  try {
    const apiToken = await getManagementAPIToken();
    const getUser = await getUserByEmail(process.env.MOCK_EMAIL, apiToken);

    await axios.delete(`${process.env.DELETE_USER_BY_ID_ENDPOINT}${getUser[0].user_id}`, {
      headers: { Authorization: `Bearer ${apiToken}` },
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  beforeGet,
  cleanUp,
  beforeRegister,
  afterRegister,
  getToken,
  getUserByEmail,
  getManagementAPIToken
};
