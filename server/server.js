const express = require("express");
const history = require("./modules/history.js");
const bodyParser = require("boda-parser");

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("server/public"));

// runs server
app.listen(PORT, (req, res) => {
  console.log(`I'm listening on PORT: ${PORT}`);
});
