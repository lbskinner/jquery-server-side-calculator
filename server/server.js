const express = require("express");
const history = require("./modules/history.js");
const bodyParser = require("body-parser");

const addResult = require("./modules/addition.js");
const subResult = require("./modules/subtraction.js");
const multiplyResult = require("./modules/multiplication.js");
const dividedResult = require("./modules/division.js");

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
  //     num2: '5
  //     operator: ""
  // }
  num1 = numbers.num1;
  num2 = numbers.num2;
  operator = numbers.operator;
  console.log(
    `First Number: ${num1}, Second Number: ${num2}, Operator: ${operator}`
  );
  let historyValue = "";
  if (operator === "+") {
    result = { result: addResult(num1, num2) };
  } else if (operator === "-") {
    result = { result: subResult(num1, num2) };
  } else if (operator === "*") {
    result = { result: multiplyResult(num1, num2) };
  } else if (operator === "/") {
    result = { result: dividedResult(num1, num2) };
  }
  console.log(result);
  historyValue = `${num1} ${operator} ${num2} = ${result.result}`;
  history.push({ calculation: historyValue });
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
// get addition result
// app.get("/addition", (req, res) => {
//   let result = { result: addResult(num1, num2) };
//   res.send(result);
// });

// get subtraction result
// app.get("/subtraction", (req, res) => {
//   let result = { result: subResult(num1, num2) };
//   res.send(result);
// });

// get multiplication result
// app.get("/multiplication", (req, res) => {
//   let result = { result: multiplyResult(num1, num2) };
//   res.send(result);
// });

// // get division result
// app.get("/division", (req, res) => {
//   let result = { result: dividedResult(num1, num2) };
//   res.send(result);
// });

// runs server
app.listen(PORT, (req, res) => {
  console.log(`I'm listening on PORT: ${PORT}`);
});
