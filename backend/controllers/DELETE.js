const { errorMessages } = require('../constants/constants');

async function handleDeleteSavedGame(req, res, client, dbName) {
  try {
    const db = client.db(process.env['NODE_ENV'] === 'test' ? 'test' : dbName);
    const col = db.collection('saves');
    const getSaves = await col.findOne({ _id: req.params.userId });

    if (getSaves === null) {
      res.status(400).json(errorMessages.USER_NON_EXISTENT);
    } else {
      if (getSaves.saves[req.params.saveGame] === undefined) {
        res.status(400).json(errorMessages.SAVE_GAME_NOT_FOUND);
      } else {
        getSaves.saves.splice(req.params.saveGame, 1);

        await col.updateOne(
          { _id: req.params.userId },
          {
            $set: {
              saves: getSaves.saves,
            },
          }
        );
        res.json(await col.findOne({ _id: req.params.userId }));
      }
    }
  } catch (err) {
    res.status(400).json(err.stack);
  }
}

module.exports = {
  handleDeleteSavedGame,
};
