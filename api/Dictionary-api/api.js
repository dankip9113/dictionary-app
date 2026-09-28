const axios = require("axios");

const DICTIONARY_URL = "https://freedictionaryapi.com/api/v1/entries/en/";

let wordUrl;
let wordData;
let definition;
let partOfSpeech;
let synonyms;

const GetWordData = async (word, callback) => {
  wordUrl = DICTIONARY_URL + word;

  try {
    return await axios.get(wordUrl).then((response) => {
      if (response.error) {
        return callback("word undifined - response error", undefined);
      }
      wordData = response.data;

      return callback(null, GetWordElements(wordData.entries));
    });
  } catch (error) {
    return callback("word undifined - api error", undefined);
  }
};

const GetWordElements = (entries) => {
  definition = GetElement(entries, (data) => {
    return entries[0].senses[0].definition;
  });
  partOfSpeech = GetElement(entries, (data) => {
    return entries[0].partOfSpeech;
  });
  synonyms = GetElement(entries, (data) => {
    return entries[0].synonyms;
  });
  return {
    pos: partOfSpeech,
    def: definition,
    syn: synonyms,
  };
};

const GetElement = (data, callback) => {
  return callback(data);
};

exports.GetWordData = GetWordData;
