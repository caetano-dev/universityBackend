const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json({ limit: "1mb" }));

const getUniversities = async (req, res) => {
  country = req.body.msg;
  const url = `http://universities.hipolabs.com/search?country=${country}`;
  let response = await axios.get(url);
  res.send(response.data);
};

app.post("/api", async (req, res) => {
  getUniversities(req, res).catch((err) => {
    res.status(500).send(err);
  });
});

app.listen(8080, () => {
  console.log("server go brrr");
});
