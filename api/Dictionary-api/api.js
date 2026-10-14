const axios = require("axios");

const DICTIONARY_URL = "https://freedictionaryapi.com/api/v1/entries/en/";

let wordUrl;
let wordData;

const getWordData = async (word, callback) => {
  wordUrl = DICTIONARY_URL + word;

  try {
    await axios.get(wordUrl).then((response) => {
      if (response.error) {
        return callback("word undifined - response error", undefined);
      }
      wordData = response.data;

      return callback(null, {
        definition: wordData.entries[0].senses[0].definition,
        partOfSpeech: wordData.entries[0].partOfSpeech,
        synonyms: wordData.entries[0].synonyms,
      });
    });
  } catch (error) {
    return callback("word undifined - api error", undefined);
  }
};

exports.getWordData = getWordData;
