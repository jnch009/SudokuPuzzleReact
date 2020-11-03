require('dotenv').config();
const appConstants = {
  USER_FOUND: '12312312',
  USER_NO_SAVES: '123',
  USER_MAX_SAVES: '6969',
  CONNECTION: 'Username-Password-Authentication',
  MOCK_PASSWORD: "kTL&4e?R9'_dH3.q",
  MONGO_URL: `${process.env.MONGO_URI}`,
  JWKS_URI: 'https://jnch009.auth0.com/.well-known/jwks.json',
  AUDIENCE: 'https://jnch009/sudoku',
  ISSUER: 'https://jnch009.auth0.com/',
  TEST_GRID: [1, 2, 3, 4, 5],
  CURRENT_DATE: new Date(Date.now()),
};

const objConstants = {
  USER_SAVES_OBJ: {
    _id: appConstants.USER_FOUND, //technically the player's user id
    saves: [
      { name: 'jeremy1', grid: [2, 3, 5, 6], date: new Date(Date.now()) },
      { name: 'jeremy2', grid: [5, 6, 8, 9, 3], date: new Date(Date.now()) },
    ],
  },
  USER_NO_SAVES_OBJ: {
    _id: appConstants.USER_NO_SAVES, //technically the player's user id
    saves: [],
  },
  USER_MAX_SAVES_OBJ: {
    _id: appConstants.USER_MAX_SAVES,
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
  },
  EXCEEDED_NAME_POST_OBJ: {
    user_id: appConstants.USER_FOUND,
    saveGame: {
      name: process.env.EXCEEDED_NAME,
      grid: appConstants.TEST_GRID,
      date: appConstants.CURRENT_DATE,
    },
  },
  EXCEEDED_NAME_PUT_OBJ: {
    saveGame: {
      name: process.env.EXCEEDED_NAME,
      grid: appConstants.TEST_GRID,
      date: appConstants.CURRENT_DATE,
    },
  },
  INAPPROPRIATE_NAME_POST_OBJ: {
    user_id: appConstants.USER_FOUND,
    saveGame: {
      name: process.env.INAPPROPRIATE_NAME,
      grid: appConstants.TEST_GRID,
      date: appConstants.CURRENT_DATE,
    },
  },
  INAPPROPRIATE_NAME_PUT_OBJ: {
    saveGame: {
      name: process.env.INAPPROPRIATE_NAME,
      grid: appConstants.TEST_GRID,
      date: appConstants.CURRENT_DATE,
    },
  },
  MAX_SAVES_POST_OBJ: {
    user_id: appConstants.USER_MAX_SAVES,
    saveGame: {
      name: 'Max Saves',
      grid: appConstants.TEST_GRID,
      date: appConstants.CURRENT_DATE,
    },
  },
  SUCCESS_POST_OBJ: {
    user_id: appConstants.USER_NO_SAVES,
    saveGame: {
      name: 'Save success',
      grid: appConstants.TEST_GRID,
      date: appConstants.CURRENT_DATE,
    },
  },
  SUCCESS_PUT_OBJ: {
    saveGame: {
      name: 'Save success',
      grid: appConstants.TEST_GRID,
      date: appConstants.CURRENT_DATE,
    },
  },
};

const errorMessages = {
  NO_SAVES: 'No Saves Found',
  SAVE_GAME_NOT_FOUND: 'Save game not found',
  MAX_LENGTH: 'Maximum length is 100 characters',
  INAPPROPRIATE: 'Inappropriate words found, please be courteous',
  MAX_SAVES: 'Maximum saves is 9, please overwrite or delete a save file',
  USER_NON_EXISTENT: 'User does not exist',
  USER_ALREADY_REGISTERED: 'User has already been registered'
};

const testConstants = {
  USER_NON_EXISTENT: '234u29340923840923',
  GAME_TO_GET: 1,
  GAME_OUT_OF_BOUNDS: 23,
  TIMEOUT: 10000
};
const regex = new RegExp(process.env.REGEX_CURSE_WORDS);

module.exports = {
  errorMessages,
  appConstants,
  objConstants,
  testConstants,
  regex
};
