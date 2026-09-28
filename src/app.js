const express = require("express");
const path = require("path");
const dictionary = require("../api/Dictionary-api/api");
const random = require("../api/RandomWord-api/api");
const deepL = require("../api/Translation-api/api");

const app = express();

const PORT = 3000;
const PUBLIC_DIRECTORY_PATH = path.join(__dirname, "../public");

app.set("view engine", "hbs");
app.use(express.static(PUBLIC_DIRECTORY_PATH));
app.use(express.json());

app.get("", (req, res) => {
  res.render("index");
});

app.get("/search", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "word not defined",
    });
  }
  dictionary.GetWordData(req.query.address, (error, response) => {
    if (error) {
      return res.send({ error });
    }
    res.send({
      word: req.query.address,
      def: response.def,
      pos: response.pos,
      syn: response.syn,
    });
  });
});

app.get("/random", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "random-api dont work",
    });
  }
  random.GetRandomWord((error, response) => {
    if (error) {
      return res.send({ error });
    }
    return res.send({
      word: response,
    });
  });
});

app.post("/translate", (req, res) => {
  if (!req.body) {
    return res.send({
      error: "text empty",
    });
  }
  deepL.translate(req.body, (error, response) => {
    if (error) {
      return res.send({ error });
    }
    return res.send({
      word: response.word,
      def: response.def,
      pos: response.pos,
      syn: response.syn,
    });
  });
});

app.listen(PORT, () => {
  console.log("server started");
});
