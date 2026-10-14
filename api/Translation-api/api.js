const deepL = require("deepl-node");
require("dotenv").config()
const AUTHKEY = process.env.AUTHKEY
const deepClient = new deepL.DeepLClient(AUTHKEY);

let data;

const translate = async (text, callback) => {
  data = text;
  deepClient
    .translateText(data.text, null, data.language)
    .then((result) => {
      return callback(undefined, createResponse(result));
    })
    .catch((error) => {
      return callback("Translate-api dont work", undefined);
    });
};

const createResponse = (data) => {
  let translatedData = data.map((element) => {
    return element.text;
  });
  return {
    word: translatedData[0],
    definition: translatedData[1],
    partOfSpeech: translatedData[2],
    synonyms: translatedData[3],
  };
};

exports.translate = translate;
