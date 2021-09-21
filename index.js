const express = require("express");
const axios = require("axios");
var cors = require('cors');

const app = express();

app.use(express.json({ limit: "1mb" }));
/*app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});*/

app.use(cors());

const getUniversities = async (req, res) => {
  country = req.body.msg;
  const url = `http://universities.hipolabs.com/search?country=${country}`;
  let response = await axios.get(url);
  res.send(response.data);
};

app.get("/", (req, res, next) => {
  res.send("Server go brrr");
  res.status(200).json({ message: "Enable CORS in Node.js - Clue Mediator" });
});

app.post("/api", async (req, res) => {
  getUniversities(req, res).catch((err) => {
    res.status(500).send(err);
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("server go brrr. Port " + PORT);
});
