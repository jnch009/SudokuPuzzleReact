const { MongoClient } = require('mongodb');

// Replace the following with your Atlas connection string
const url = `mongodb+srv://jnch009:${process.env.MONGO_PASS}@sudokusavedgames.xaesp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true`;
const client = new MongoClient(url);
const run = async () => {
  try {
    await client.connect();
    console.log('Connected correctly to server');
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
};

exports.run = run;
