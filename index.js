const express = require("express");
const axios = require("axios");
var cors = require("cors");
const app = express();

app.use(express.json({ limit: "1mb" }));
app.use(cors());

const setUrl = async (country) => {
  const url = `http://universities.hipolabs.com/search?country=${country}`;
  const response = await axios.get(url);
  return response.data;
};

const getUniversities = async (req, res) => {
  let country = req.body.msg;
  let response = await setUrl(country);
  if (response.length === 0) {
    country = "United States";
    response = await setUrl(country);
  }
  res.send(response);
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
