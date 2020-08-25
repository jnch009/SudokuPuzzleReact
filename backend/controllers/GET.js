const { errorMessages } = require('../constants/constants');

async function handleGetSaves(req, res, client, dbName) {
  try {
    const db = client.db(process.env['NODE_ENV'] === 'test' ? 'test' : dbName);
    const col = db.collection('saves');
    const toGet = req.query.saveGame;

    const getSaves = await col.findOne({ _id: req.params.userId });
    if (getSaves === null || getSaves.saves.length === 0) {
      res.status(404).json(errorMessages.NO_SAVES);
    } else if (toGet > getSaves.saves.length) {
      res.status(404).json(errorMessages.SAVE_GAME_NOT_FOUND);
    } else {
      toGet === undefined
        ? res.json(getSaves.saves)
        : res.json(getSaves.saves[toGet]);
    }
  } catch (err) {
    res.status(400).json(err.stack);
  }
}

module.exports = {
    handleGetSaves
}
