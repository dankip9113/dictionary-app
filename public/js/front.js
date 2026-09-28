const MY_INPUT = document.getElementById("my_input");
const MY_ENTRIES = document.getElementById("entries");
const MY_ENTER = document.getElementById("my_enter");
const MY_RANDOM = document.getElementById("my_random");
const MY_TRANSLATE = document.getElementById("my_translate");

const ERROR = document.getElementById("error");
const WORD = document.getElementById("word");
const DEFINITION = document.getElementById("definition");
const PART_OF_SPEECH = document.getElementById("part_of_speech");
const SYNONYMS = document.getElementById("synonyms");

let word;
let dataToTranslate;

const GetWordFromInput = () => {
  word = MY_INPUT.value;

  GetWordDataFromServer(word);
};
const GetDataFromHTML = () => {
  dataToTranslate = {
    text: [
      WORD.textContent,
      DEFINITION.textContent,
      PART_OF_SPEECH.textContent,
      SYNONYMS.textContent,
    ],
    language: "he",
  };
  let temp = dataToTranslate.text.filter((element) => element !== "");
  dataToTranslate.text = temp;

  if (dataToTranslate.text.length != 0) {
    GetTranslateDataFromServer(dataToTranslate);
  }
};
const GetRandomWordFromServer = async () => {
  fetch("http://localhost:3000/random?address=!").then((response) => {
    response.json().then((data) => {
      if (data.error) {
        return SetErrorToHTML(data.error);
      } else {
        GetWordDataFromServer(data.word);
      }
    });
  });
};
const GetWordDataFromServer = async (word) => {
  fetch("http://localhost:3000/search?address=" + word).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        return SetErrorToHTML(data.error);
      } else {
        SetDataToHTML(data);
      }
    });
  });
};
const GetTranslateDataFromServer = async (data) => {
  fetch("http://localhost:3000/translate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        return SetErrorToHTML(data.error);
      } else {
        SetTranslatedDataToHTML(data);
      }
    });
  });
};
const SetDataToHTML = (word_data) => {
  ClearTextInHTML();
  WORD.textContent = word_data.word;
  DEFINITION.textContent = "Definition -- " + word_data.def;
  PART_OF_SPEECH.textContent = "Part of speech -- " + word_data.pos;
  SYNONYMS.textContent = "Synonyms -- " + word_data.syn;
};
const SetTranslatedDataToHTML = (data) => {
  ClearTextInHTML();
  WORD.textContent = data.word;
  DEFINITION.textContent = data.def;
  PART_OF_SPEECH.textContent = data.pos;
  SYNONYMS.textContent = data.syn;
};

const SetErrorToHTML = (error) => {
  ClearTextInHTML();
  ERROR.innerHTML = "ERROR -- " + error;
};

const ClearTextInHTML = () => {
  ERROR.textContent = "";
  WORD.textContent = "";
  DEFINITION.textContent = "";
  PART_OF_SPEECH.textContent = "";
  SYNONYMS.textContent = "";
};

MY_ENTER.addEventListener("click", GetWordFromInput);
MY_RANDOM.addEventListener("click", GetRandomWordFromServer);
MY_TRANSLATE.addEventListener("click", GetDataFromHTML);
