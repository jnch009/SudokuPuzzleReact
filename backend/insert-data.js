require('dotenv').config();
const { MongoClient } = require('mongodb');

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

//run().catch(console.dir);
view().catch(console.dir);
