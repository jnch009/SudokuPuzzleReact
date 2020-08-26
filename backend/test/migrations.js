require('dotenv').config();
const { MongoClient } = require('mongodb');
const axios = require('axios');
const { appConstants, objConstants } = require('../constants/constants');

const dbName = 'test';
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
};

const beforeGet = async () => {
  try {
    client = new MongoClient(appConstants.MONGO_URL);
    await client.connect();
    const db = client.db(dbName);

    const col = db.collection('saves');
    await col.insertMany([
      objConstants.USER_SAVES_OBJ,
      objConstants.USER_NO_SAVES_OBJ,
      objConstants.USER_MAX_SAVES_OBJ,
    ]);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
};

const cleanUp = async () => {
  client = new MongoClient(appConstants.MONGO_URL);
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
      password: appConstants.MOCK_PASSWORD,
      connection: appConstants.CONNECTION,
    });
  } catch (err) {
    console.log(err);
  }
};

const afterRegister = async () => {
  try {
    const apiToken = await getManagementAPIToken();
    const getUser = await getUserByEmail(process.env.MOCK_EMAIL, apiToken);

    await axios.delete(
      `${process.env.DELETE_USER_BY_ID_ENDPOINT}${getUser[0].user_id}`,
      {
        headers: { Authorization: `Bearer ${apiToken}` },
      }
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  beforeGet,
  cleanUp,
  beforeRegister,
  afterRegister,
  getUserByEmail,
  getManagementAPIToken,
};
