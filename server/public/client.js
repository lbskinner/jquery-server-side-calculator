$(document).ready(init);

function init() {
  console.log("READY");
  // add event handler
  $(".js-btn-equal").on("click", submitNumbers);
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
