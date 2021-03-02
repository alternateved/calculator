const digits = document.querySelectorAll(".digits");
const actions = document.querySelectorAll(".actions");
const history = document.querySelector("#history");
const output = document.querySelector("#output");

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (a === 0 && b === 0) {
    return "NOPE";
  } else return a / b;
}

function percentage() {
  pass;
}

function changeSign(a) {
  return a - (a * 2);
}

function operate(a, b, operator) {
  let result = 0;
  switch (operator) {
    case "+":
      result = add(a, b);
      break;
    case "-":
      result = subtract(a, b);
      break;
    case "*":
      result = multiply(a, b);
      break;
    case "/":
      result = divide(a, b);
      break;
    case "=":
      break;
    case "%":
      percentage();
      break;
    case "+/-":
      changeSign();
      break;
    case "ac":
      allClear();
      break;
  }
  return result;
}

function allClear() {
  output.textContent = "";
}

function displayOutput(string) {
  output.textContent = string;
}

