$(document).ready(init);

let allOperations = [];
let operator = "";

function init() {
  console.log("READY");
  // add event handler
  $(".js-btn-equal").on("click", submitNumbers);
  // add event handler for operators
  $(".js-calculator-input").on("click", checkOperator);
  // add event handler for clear button
  $(".js-btn-clear").on("click", clearInputs);
}

// event handler

function clearInputs() {
  $(".js-input-num1").val("");
  $(".js-input-num2").val("");
  operator = "";
}

function submitNumbers() {
  console.log("EQUAL BUTTON CLICKED");
  if ($(".js-input-num1").val() && $(".js-input-num2").val()) {
    const newNumberInputs = {
      num1: $(".js-input-num1").val(),
      num2: $(".js-input-num2").val(),
      operator: operator
    };
    console.log(newNumberInputs);
    sendNumbersToServer(newNumberInputs);
  } else {
    alert("Please enter a number!");
  }
}

// find the correct operator key clicked
function checkOperator(event) {
  const target = event.target;
  if (target.matches("button") != true) {
    return;
  }
  if (target.classList.contains("js-operator")) {
    console.log("OPERATOR: ", target.value);
    operator = target.value;
    return operator;
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

// render result to DOM
function renderResult(result) {
  $(".js-calculator-result").text(result);
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
