const { errorMessages, regex } = require('../constants/constants');

async function handleRegistration(req, res, client, dbName) {
  try {
    const db = client.db(process.env['NODE_ENV'] === 'test' ? 'test' : dbName);
    const col = db.collection('saves');

    if (await col.findOne({ _id: req.body.user_id }) !== null) {
      res.status(200).json(errorMessages.USER_ALREADY_REGISTERED);
    } else {
      const userDocument = {
        _id: req.body.user_id,
        saves: [],
      };

      await col.insertOne(userDocument);
      res.status(201).json(await col.findOne({ _id: req.body.user_id }));
    }
  } catch (err) {
    res.status(400).json(err.stack);
  }
}

async function handleAddSave(req, res, client, dbName) {
  try {
    if (req.body.saveGame.name.length > 100) {
      res.status(400).json(errorMessages.MAX_LENGTH);
    } else if (regex.test(req.body.saveGame.name)) {
      res.status(400).json(errorMessages.INAPPROPRIATE);
    } else {
      const db = client.db(
        process.env['NODE_ENV'] === 'test' ? 'test' : dbName
      );
      const col = db.collection('saves');
      const getSaves = await col.findOne({ _id: req.body.user_id });
      if (getSaves.saves.length >= 9) {
        res.status(400).json(errorMessages.MAX_SAVES);
      } else {
        await col.updateOne(
          { _id: req.body.user_id },
          {
            $push: {
              saves: req.body.saveGame,
            },
          }
        );
        res.json(await col.findOne({ _id: req.body.user_id }));
      }
    }
  } catch (err) {
    res.status(400).json(err.stack);
  }
}

module.exports = {
  handleRegistration,
  handleAddSave,
};
