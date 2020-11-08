//validating the save game name on the frontend
const regex = new RegExp(process.env.REACT_APP_REGEX_CURSE_WORDS);
const validateSaveName = (name) => {
  if (name.length === 0 || name.length > 100 || regex.test(name.toLowerCase())) {
    return false;
  }

  return true;
};

export default validateSaveName;
