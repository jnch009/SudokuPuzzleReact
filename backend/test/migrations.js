const { MongoClient } = require('mongodb');

// Replace the following with your Atlas connection string
const url = `mongodb+srv://jnch009:${process.env.MONGO_PASS}@sudokusavedgames.xaesp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true`;
const dbName = 'test';

const beforeGet = async () => {
  const client = new MongoClient(url);
  const userFound = '12312312';
  const userNoSaves = '123';

  const userWithSaves = {
    _id: userFound, //technically the player's user id
    name: 'Jeremy Ng',
    saves: [[2, 3, 5, 6],[5, 6, 8, 9, 3]],
    date: new Date(Date.now()),
  };

  const userWithNoSaves = {
    _id: userNoSaves, //technically the player's user id
    name: 'Jeremy Ng',
    saves: [],
    date: new Date(Date.now()),
  };

  try {
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
  const client = new MongoClient(url);
  try {
    await client.connect();
    await client.db(dbName).dropDatabase();
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
};

module.exports = { beforeGet, cleanUp };
