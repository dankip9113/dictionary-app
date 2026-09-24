import { GetWordData, GetRandomWord} from "./my_api.js";

const MY_INPUT = document.getElementById("my_input");
const MY_ENTRIES = document.getElementById("entries");
const MY_ENTER = document.getElementById("my_enter");
const MY_RANDOM = document.getElementById("my_random")


let word;

let wordData;
let partsOfSpeech;
let definitions;
let synonyms;

const GetWordFromInput = () => {
    MY_ENTRIES.innerHTML = ''
  word = MY_INPUT.value;
  console.log(word);
  GetDataFromAPI(word);
};
const GetWordFromRandom = async() =>{
  MY_ENTRIES.innerHTML = ''
  word = await GetRandomWord()
  MY_INPUT.value = word
  GetDataFromAPI(word)
}
const GetDataFromAPI = async (word) => {
  let i = 0;

  wordData = await GetWordData(word);
  partsOfSpeech = wordData.pof;
  definitions = wordData.def;
  synonyms = wordData.syn;
  console.log(partsOfSpeech, definitions, synonyms);

  partsOfSpeech.forEach((element) => {
    SetDataToHTML(element, definitions[i], synonyms[i]);
    i++
  });
};
const SetDataToHTML = (partofspeech, definition, synonyms) => {
  const PARTS_OF_SPEECH_TITLE = document.createElement("h2");
  PARTS_OF_SPEECH_TITLE.style.fontSize = "30px";
  PARTS_OF_SPEECH_TITLE.innerText = "PART OF SPEECH";
  PARTS_OF_SPEECH_TITLE.style.borderTopStyle = 'groove'

  const PART_OF_SPEECH_TEXT = document.createElement("span");
  PART_OF_SPEECH_TEXT.style.fontSize = "10px";

  const DEFINITIONS_TITLE = document.createElement("h2");
  DEFINITIONS_TITLE.style.fontSize = "30px";
  DEFINITIONS_TITLE.innerText = "DEFINITIONS";

  const DEFINITIONS_TEXT = document.createElement("span");
  DEFINITIONS_TEXT.style.fontSize = "10px";

  const SYNONYMS_TITLE = document.createElement("h2");
  SYNONYMS_TITLE.style.fontSize = "30px";
  SYNONYMS_TITLE.innerText = "SYNONYMS";

  const SYNONYMS_TEXT = document.createElement("span");
  SYNONYMS_TEXT.style.fontSize = "10px";

  PART_OF_SPEECH_TEXT.innerHTML = partofspeech;
  DEFINITIONS_TEXT.innerHTML = definition;
  SYNONYMS_TEXT.innerHTML = synonyms;
  MY_ENTRIES.append(
    PARTS_OF_SPEECH_TITLE,
    PART_OF_SPEECH_TEXT,
    DEFINITIONS_TITLE,
    DEFINITIONS_TEXT,
    SYNONYMS_TITLE,
    SYNONYMS_TEXT,
  );
};

console.log(MY_ENTER);

MY_ENTER.addEventListener("click", GetWordFromInput);
MY_RANDOM.addEventListener("click",GetWordFromRandom)

