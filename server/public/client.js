$(document).ready(init);

let allOperations = [];
let operator = "";
let num1 = "";
let num2 = "";
let answer = "";

function init() {
  console.log("READY");
  // add event handler
  $(".js-equal-sign").on("click", submitNumbers);
  // add event handler for keys pressed
  $(".js-calculator-btn").on("click", checkKeys);
  // add event handler for clear button
  $(".js-btn-clear").on("click", clearInputs);
  //add event handler for clear history button
  $(".js-btn-clear-history").on("click", clearAllHistory);
  // add event handler for click on history list
  $(".js-display-history").on(
    "click",
    ".js-history-individual-calculation",
    reRunHistoryCalculation
  );
  // display history upon page load
  getHistory();
}

// event handler
function reRunHistoryCalculation(event) {
  const historyCalculationIndex = $(this).data("index");
  console.log("RE-RUN CALC; ", historyCalculationIndex);
  answer = allOperations[historyCalculationIndex].result;
  // format decimal places to 7 if there are more
  if (answer.toString().includes(".")) {
    // split the answer into an array with two items, the integer before the decimal and the numbers after the decimal
    let numAfterDecimal = answer.toString().split(".");
    // check for the length of the numbers after the decimal places
    if (numAfterDecimal[1].length > 7) {
      // if decimal places is more than 7 then sent decimal places to 7
      answer = answer.toFixed(7);
    }
  }
  renderDisplay(answer);
}

function clearInputs() {
  // reset calculator display, num1, num2 and operator
  $(".js-calculator-display").val("");
  operator = "";
  num1 = "";
  num2 = "";
  answer = "";
}

function submitNumbers() {
  console.log("EQUAL BUTTON CLICKED");
  // don't allow send data to server unless all necessary inputs
  if (!num1 || !operator || !num2) {
    alert("Please enter a complete operation!");
  } else {
    const newNumberInputs = {
      num1: num1,
      num2: num2,
      operator: operator
    };
    console.log(newNumberInputs);
    // send data to server
    sendNumbersToServer(newNumberInputs);
  }
}

// find the correct key clicked
function checkKeys(event) {
  const target = event.target;
  // if the event target clicked is not a button, exit the function
  if (target.matches("button") != true) {
    return;
  }
  // if event target clicked has class js-operator is true
  if (target.classList.contains("js-operator")) {
    console.log("OPERATOR: ", target.value);
    // assign and display operator sign to calculator display
    renderOperatorToDisplay(target.value);
    return;
  }
  // if event target clicked has class js-number is true
  if (target.classList.contains("js-number")) {
    console.log("NUMBER: ", target.value);
    // assign number values to num1 and num2 and display on calculator display
    renderNumbersToDisplay(target.value);
    return;
  }
  // if event target clicked has class js-decimal is true
  if (target.classList.contains("js-decimal")) {
    console.log("DECIMAL: ", target.value);
    // add decimal to num1 and num2
    renderDecimalToDisplay(target.value);
    return;
  }
}

// API interactions

// delete/clear all history
function clearAllHistory() {
  $.ajax({
    method: "DELETE",
    url: "/delete"
  })
    .then(response => {
      console.log(response);
      getHistory();
    })
    .catch(err => {
      console.log(err);
    });
}
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
      answer = response.result;
      // format display decimal places, see reRunHistoryCalculation() function for details
      if (answer.toString().includes(".")) {
        let numAfterDecimal = answer.toString().split(".");
        if (numAfterDecimal[1].length > 7) {
          answer = answer.toFixed(7);
        }
      }
      // display calculation result on DOM
      renderDisplay(answer);
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

// render result to DOM, used for basic mode, no longer used for stretch
// function renderResult(result) {
//   $(".js-calculator-result").text(result);
// }

//render numbers to display
function renderNumbersToDisplay(numValue) {
  // if num1 does not have a value
  if (!num1) {
    // num1 equals the value of the button clicked
    num1 = numValue;
    //else if num1 has a value and the operator does not have a value
  } else if (num1 && !operator) {
    // num1 equals to num1 concatenate value of button clicked
    num1 += numValue;
    // else if num1 and operator have values and num2 does not have a value
  } else if (num1 && operator && !num2) {
    // num2 equals to the value of the button clicked
    num2 = numValue;
    // else if num1, operator and num2 all have values
  } else if (num1 && operator && num2) {
    // num2 equals to num1 concatenate value of button clicked
    num2 += numValue;
  }
  // display num1, operator, and num2 on calculator display
  renderDisplay(num1 + operator + num2);
}
//render operator to display
function renderOperatorToDisplay(operatorValue) {
  operator = operatorValue;
  // if answer has a value and operator is being clicked,
  // the answer from previous became num1 and num2 reset
  if (answer && operator) {
    num1 = answer.toString();
    num2 = "";
  }
  // display num1 and variable on calculator display
  renderDisplay(num1 + operator);
}

//render decimal to display
function renderDecimalToDisplay(decimalValue) {
  // if num1 does not include a "." and operator has not been pressed
  if (!num1.includes(".") && !operator) {
    // concatenate the "." to num1
    num1 += decimalValue;
    renderDisplay(num1);
    // else if num2 does not include a "."
  } else if (!num2.includes(".")) {
    // concatenate the "." to num2
    num2 += decimalValue;
    renderDisplay(num1 + operator + num2);
  }
}
// display inputs on calculator display
function renderDisplay(num) {
  $(".js-calculator-display").val(num);
}

// render history to server
function renderHistory() {
  $(".js-display-history").empty();
  for (let i = 0; i < allOperations.length; i++) {
    const individualOperation = allOperations[i];
    $(".js-display-history").append(`
        <li class="js-history-individual-calculation" data-index="${i}">${individualOperation.num1} ${individualOperation.operator} ${individualOperation.num2}</li>
        `);
  }
}
