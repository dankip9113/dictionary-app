const axios = require("axios");
const RANDOM_URL = "https://random-word-api.herokuapp.com/word";

let rndWord;

const getRandomWord = async (callback) => {
  try {
    return await axios.get(RANDOM_URL).then((response) => {
      rndWord = response.data[0];
      if (response.data.error) {
        return callback("please try again", undefined);
      }
      return callback(undefined, rndWord);
    });
  } catch (error) {
    return callback("random-api dont work", undefined);
  }
};
exports.getRandomWord = getRandomWord;
