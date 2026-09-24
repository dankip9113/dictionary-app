import axios from "https://esm.sh/axios";
//import axios from 'axios'
const DICTIONARY_URL = "https://freedictionaryapi.com/api/v1/entries/en/";

const RANDOM_URL = "https://random-word-api.herokuapp.com/word"

let word_url;
let RndWord
let word_data;
let Definitions;
let partsOfSpeech;

let senses;
let synonyms;

export const GetWordData = async (word) => {

  
  word_url = DICTIONARY_URL + word;
  console.log(word_url)
  try{
    return await axios.get(word_url)
      .then(response =>{
        console.log('im here')
        word_data = response.data;

        return GetWordElements(word_data.entries);
      })
    
  }
  catch(error){
    return null
  }
  

};

export const GetWordElements = (entries) => {
  console.log(entries)
  Definitions = GetElement(entries, (data) => {
    senses = entries.map((element) => element.senses);
    return senses.map((sense) => sense.map((element) => element.definition));
  });
  partsOfSpeech = GetElement(entries,(data) =>{
    return entries.map((element) => element.partOfSpeech)
  })
  synonyms = GetElement(entries,(data)=>{
    return entries.map((element) => element.synonyms)
  })
  console.log(Definitions)
  return {
    pof: partsOfSpeech,
    def:Definitions,
    syn:synonyms
  }
};
 const GetElement = (data, callback) => {
  return callback(data);
}


export const GetRandomWord = async () => {
  try{
    return await axios.get(RANDOM_URL)
      .then(response =>{
        RndWord = response.data[0]
        console.log(RndWord)
        return RndWord
      })
  }
  catch(error){
    return null
  }
}



