const inputBtn = document.getElementById("my_input");
const entries = document.getElementById("entries");
const enterButton = document.getElementById("my_enter");
const randomBtn = document.getElementById("my_random");
const translateBtn = document.getElementById("my_translate");

const errorElement = document.getElementById("error");
const wordElement = document.getElementById("word");
const definitionElement = document.getElementById("definition");
const partOfSpeechElement = document.getElementById("part_of_speech");
const synonymsElement = document.getElementById("synonyms");

const MY_TRANSLATE_URL = "http://localhost:3000/translate";
const MY_DICTIONARY_URL = "http://localhost:3000/search?word=";
const MY_RANDOM_URL = "http://localhost:3000/random";

let word;
let dataToTranslate;

const getWordFromInput = () => {
  word = inputBtn.value;

  getWordDataFromServer(word);
};
const getDataFromHTML = () => {
  text = [
    wordElement.textContent,
    definitionElement.textContent,
    partOfSpeechElement.textContent,
    synonymsElement.textContent,
  ];

  dataToTranslate = {
    text: text.filter((element) => element !== ""),
    language: "he",
  };

  if (dataToTranslate.text.length != 0) {
    getTranslateDataFromServer(dataToTranslate);
  }
};
const getRandomWordFromServer = async () => {
  fetch(MY_RANDOM_URL).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        return setErrorToHTML(data.error);
      }
      getWordDataFromServer(data.word);
    });
  });
};
const getWordDataFromServer = async (word) => {
  fetch(MY_DICTIONARY_URL + word).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        return setErrorToHTML(data.error);
      }
      setDataToHTML(data);
    });
  });
};
const getTranslateDataFromServer = async (data) => {
  fetch(MY_TRANSLATE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        return setErrorToHTML(data.error);
      }
      setDataToHTML(data);
    });
  });
};
const setDataToHTML = (word_data) => {
  errorElement.textContent = "";
  wordElement.textContent = word_data.word;
  definitionElement.textContent = word_data.defition;
  partOfSpeechElement.textContent = word_data.partOfSpeech;
  synonymsElement.textContent = word_data.synonyms;
};

const setErrorToHTML = (error) => {
  errorElement.innerHTML = "ERROR -- " + error;
};

const clearTextInHTML = () => {
  errorElement.textContent = "";
  wordElement.textContent = "";
  definitionElement.textContent = "";
  partOfSpeechElement.textContent = "";
  synonymsElement.textContent = "";
};

enterButton.addEventListener("click", getWordFromInput);
randomBtn.addEventListener("click", getRandomWordFromServer);
translateBtn.addEventListener("click", getDataFromHTML);
