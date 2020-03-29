$(document).ready(init);

let allOperations = [];
let operator = "";
let num1 = 0;
let num2 = 0;

function init() {
  console.log("READY");
  // add event handler
  $(".js-btn-equal").on("click", submitNumbers);
  // add event handler for keys pressed
  $(".js-calculator-btn").on("click", checkKeys);
  // add event handler for clear button
  $(".js-btn-clear").on("click", clearInputs);
  // display history upon page load
  getHistory();
}

// event handler

function clearInputs() {
  $(".js-calculation-display").val("");
  operator = "";
  num1 = 0;
  num2 = 0;
}

function submitNumbers() {
  console.log("EQUAL BUTTON CLICKED");
  if ($(".js-calculator-display").val() != 0) {
    const newNumberInputs = {
      num1: num1,
      num2: num2,
      operator: operator
    };
    console.log(newNumberInputs);
    sendNumbersToServer(newNumberInputs);
  } else {
    alert("Please enter a number!");
  }
}

// find the correct key clicked
function checkKeys(event) {
  const target = event.target;
  if (target.matches("button") != true) {
    return;
  }
  if (target.classList.contains("js-operator")) {
    console.log("OPERATOR: ", target.value);
    operator = target.value;
    renderDisplay(num1 + operator);
    return;
  }
  if (target.classList.contains("js-number")) {
    console.log("NUMBER: ", target.value);
    if (num1 != 0) {
      num1 += target.value;
    } else {
      num1 = target.value;
    }
    renderDisplay(num1);
    return;
  }
  if (target.classList.contains("js-decimal")) {
    console.log("DECIMAL: ", target.value);
    if (!num1.includes(".")) {
      num1 += target.value;
      renderDisplay(num1);
    }
    return;
  }
}

// API interactions

// post numbers and operator input to server for calculation
function sendNumbersToServer(dataObject) {
  $.ajax({
    method: "POST",
    url: "/numbers",
    data: dataObject
  })
    .then(response => {
      console.log(response);
      // get the calculation result from server
      getResult();
    })
    .catch(err => {
      console.log(err);
    });
}

// get result from server
function getResult() {
  $.ajax({
    method: "GET",
    url: "/result"
  })
    .then(response => {
      console.log(response);
      // display calculation result on DOM
      renderResult(response.result);
      //get history from server to display on DOM
      getHistory();
    })
    .catch(err => {
      console.log(err);
    });
}

// get history from server
function getHistory() {
  $.ajax({
    method: "GET",
    url: "/history"
  })
    .then(response => {
      console.log(response);
      allOperations = response;
      // display all history on DOM
      renderHistory();
    })
    .catch(err => {
      console.log(err);
    });
}

// render to the DOM

// render keys clicked to DOM
// function renderResult(result) {
//   $(".js-calculator-result").text(result);
// }
function renderDisplay(num) {
  $(".js-calculator-display").val(num);
}

// render history to server
function renderHistory() {
  $(".js-display-history").empty();
  for (let individualOperation of allOperations) {
    $(".js-display-history").append(`
        <li>${individualOperation.num1} ${individualOperation.operator} ${individualOperation.num2} = ${individualOperation.result}</li>
        `);
  }
}
