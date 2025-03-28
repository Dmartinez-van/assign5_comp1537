const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 8001;

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../app/index.html"));
});

app.get("/pokemon-stats", (req, res) => {
  let formatOfResponse = req.query["format"];

  if (formatOfResponse === "json") {
    res.setHeader("Content-type", "application/json");
    let dataList = fs.readFileSync("../app/data/pokeStats-json.json", "utf8");

    let rN = Math.floor(Math.random() * 20);
    let prevRN = rN;

    while (rN === prevRN) {
      rN = Math.floor(Math.random() * 19);
    }

    let randomPokemon = JSON.parse(dataList)[rN];

    console.log("sending pokemon ", randomPokemon);

    res.send(JSON.stringify(randomPokemon));
  } else {
    res.send({ status: "fail", msg: "Invalid format" });
  }
});

app.get("/pokemon-character", (req, res) => {
  let formatOfResponse = req.query["format"];

  if (formatOfResponse === "html") {
    res.setHeader("Content-type", "application/json");
    res.send(fs.readFileSync("../app/data/pokeStats-html.html", "utf8"));
  } else {
    res.send({ status: "fail", msg: "Invalid format" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
