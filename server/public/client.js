$(document).ready(init);

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
    operator: ""
  };
}

// find the correct operator key clicked
function checkOperator(event) {
  const target = event.target;
  if (target.matches("button") != true) {
    return;
  }
  if (target.classList.contains("js-operator")) {
    console.log("OPERATOR: ", target.value);
    return;
  }
}
