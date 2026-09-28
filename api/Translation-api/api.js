const deepL = require("deepl-node");

const AUTHKEY = "10379b6a-d1e0-4d70-a145-9c9e32569d8c:fx";
const deepClient = new deepL.DeepLClient(AUTHKEY);

let myData;

const translate = async (data, callback) => {
  myData = data;
  await deepClient
    .translateText(myData.text, null, myData.language)
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
    def: translatedData[1],
    pos: translatedData[2],
    syn: translatedData[3],
  };
};

exports.translate = translate;
