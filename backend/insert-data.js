require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');

// Replace the following with your Atlas connection string

const url = `mongodb+srv://jnch009:${process.env.MONGO_PASS}@sudokusavedgames.xaesp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true`;
const client = new MongoClient(url);

// The database to use
const dbName = 'test';

async function run() {
  try {
    await client.connect();
    console.log('Connected correctly to server');
    const db = client.db(dbName);

    // Use the collection "people"
    const col = db.collection('people');

    // Construct a document
    let personsDocument = [
      {
        name: { first: 'Alan', last: 'Turing' },
        birth: new Date(1912, 5, 23), // June 23, 1912
        death: new Date(1954, 5, 7), // June 7, 1954
        contribs: ['Turing machine', 'Turing test', 'Turingery'],
        views: 1250000,
      },
      {
        name: { first: 'Alan', last: 'Turing2' },
        birth: new Date(1912, 5, 23), // June 23, 1912
        death: new Date(1954, 10, 7), // June 7, 1954
        contribs: ['Turing machine23', 'Turing test', 'Turingery'],
        views: 1250000,
      },
      {
        name: { first: 'Alan', last: 'Turing3' },
        birth: new Date(1912, 5, 30), // June 23, 1912
        death: new Date(1954, 5, 7), // June 7, 1954
        contribs: ['Turing machine', 'Turing1231 test', 'Turingery'],
        views: 1250000121212,
      },
    ];

    // Insert a single document, wait for promise so we can read it back
    const p = await col.insertMany(personsDocument);
    console.log('successfully added!');
    // Find one document
    //const myDoc = await col.findOne();
    // Print to the console
    //console.log(myDoc);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

async function view() {
  try {
    await client.connect();
    console.log('Connected correctly to server');
    const db = client.db(dbName);
    // Use the collection "people"
    const col = db.collection('people');
    const documents = await col.find().toArray();
    console.log(documents);
    console.log(documents.length);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

async function list() {
  try {
    await client.connect();
    console.log('Connected correctly to server');
    let listDBs = await client.db().admin().listDatabases();
    console.log(listDBs);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

async function addDB() {
  const dbName = 'sudokuSaves';
  try {
    await client.connect();
    console.log('Connected correctly to server');

    const db = client.db(dbName);
    // Use the collection "people"
    const col = db.collection('saves');
    const testSave = {
      name: 'Jeremy',
      board: [1, 2, 3],
      date: new Date(Date.now()),
    };

    await col.insertOne(testSave);
    const findResults = await col.find().toArray();
    console.log(findResults);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

async function update() {
  const dbName = 'sudokuSaves';
  try {
    await client.connect();
    console.log('Connected correctly to server');

    const db = client.db(dbName);
    // Use the collection "people"
    const col = db.collection('saves');

    await col.updateOne(
      { _id: ObjectId('5f324e82d13e5007a4dbbf24') },
      { $set: { gems: 123 } }
    );
    const findResults = await col.find().toArray();
    console.log(findResults);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

//run().catch(console.dir);
//view().catch(console.dir);
//list().catch(console.dir);
//addDB().catch(console.dir);
update().catch(console.dir);
