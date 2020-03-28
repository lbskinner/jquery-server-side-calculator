$(document).ready(init);

let operator = "";

function init() {
  console.log("READY");
  // add event handler
  $(".js-btn-equal").on("click", submitNumbers);
  // add event handler for operators
  $(".js-calculator-input").on("click", checkOperator);
}

// event handler
function submitNumbers() {
  console.log("EQUAL BUTTON CLICKED");
  const newNumberInputs = {
    num1: $(".js-input-num1").val(),
    num2: $(".js-input-num2").val(),
    operator: operator
  };
  console.log(newNumberInputs);
  sendNumbersToServer(newNumberInputs);
}

// find the correct operator key clicked
function checkOperator(event) {
  const target = event.target;
  if (target.matches("button") != true) {
    console.log("DID NOT CLICK ON AN OPERATOR BUTTON");

    return;
  }
  if (target.classList.contains("js-operator")) {
    console.log("OPERATOR: ", target.value);
    operator = target.value;
    return operator;
  }
}

// API interactions
function sendNumbersToServer(dataObject) {
  $.ajax({
    method: "POST",
    url: "/numbers",
    data: dataObject
  })
    .then(response => {
      console.log(response);
      //TODO get answer and get history
    })
    .catch(err => {
      console.log(err);
    });
}
