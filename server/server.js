const express = require("express");
const history = require("./modules/history.js");
const bodyParser = require("body-parser");

const calculateResult = require("./modules/calculate.js");

const app = express();
const PORT = 5000;
// set default value for test
let num1 = 0;
let num2 = 0;
let result = {};
let operator = "";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("server/public"));

// post numbers from client side
app.post("/numbers", (req, res) => {
  const numbers = req.body;
  //below is the format the numbers will be send to the server
  //{
  //     num1: 20,
  //     num2: 5,
  //     operator: "+"
  // }
  num1 = parseFloat(numbers.num1);
  num2 = parseFloat(numbers.num2);
  operator = numbers.operator;
  console.log(
    `First Number: ${num1}, Second Number: ${num2}, Operator: ${operator}`
  );
  // calculate the result
  result = { result: calculateResult(num1, operator, num2) };
  console.log(result);
  // create empty object variable
  let historyObject = {};
  // set input values to history object and store it in history array
  historyObject = {
    num1,
    num2,
    operator,
    result: result.result
  };
  history.push(historyObject);
  res.sendStatus(201);
});

// get result
app.get("/result", (req, res) => {
  res.send(result);
});

//get history
app.get("/history", (req, res) => {
  res.send(history);
});

// delete/clear all history
app.delete("/delete", (req, res) => {
  history.length = 0;
  console.log(history);

  res.sendStatus(204);
});

// runs server
app.listen(PORT, (req, res) => {
  console.log(`I'm listening on PORT: ${PORT}`);
});
