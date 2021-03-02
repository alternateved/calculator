const digits = document.querySelectorAll(".digits");
const actions = document.querySelectorAll(".actions");
const memory = document.querySelector("#memory");
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

function percentage(a) {
  return a / 100;
}

function changeSign(a) {
  return a - a * 2;
}

function operate(operator, a, b = a) {
  a = Number(a);
  b = Number(b);

  let result = "";
  switch (operator) {
    case "+":
      result = add(a, b);
      storedValue = result;
      displayHistory(result);
      displayOutput(result);
      break;
    case "-":
      result = subtract(a, b);
      storedValue = result;
      displayHistory(result);
      displayOutput(result);
      break;
    case "*":
      result = multiply(a, b);
      storedValue = result;
      displayHistory(result);
      displayOutput(result);
      break;
    case "/":
      result = divide(a, b);
      storedValue = result;
      displayHistory(result);
      displayOutput(result);
      break;
    case "%":
      result = percentage(a);
      break;
    case "+/-":
      result = changeSign(a);
      break;
  }
  return result;
}

function allClear() {
  output.textContent = "";
  memory.textContent = "";
  displayValue = "";
  storedOperation = "";
  lastAction = "";
  storedValue = "";
  result = "";
}

function displayOutput(string) {
  output.textContent = string;
}

function displayHistory(result) {
  memory.textContent =
    storedValue + storedOperation + displayValue + "=" + result;
}

function gatherInput() {
  digits.forEach((digit) =>
    digit.addEventListener("click", (event) => {
      if (
        event.target.textContent === "." &&
        displayValue.includes(event.target.textContent)
      ) {
        return;
      } else {
        displayValue += event.target.textContent;
        displayOutput(displayValue);
      }
    })
  );
}

function calculate() {
  actions.forEach((action) =>
    action.addEventListener("click", (event) => {
      displayOutput("");
      if (event.target.textContent === "AC") {
        allClear();
      } else if (
        event.target.textContent === "=" &&
        storedOperation.length > 0 &&
        storedOperation !== "="
      ) {
        operate(storedOperation, storedValue, displayValue);
      } else if (storedValue.length === 0 && displayValue.length > 0) {
        storedValue = displayValue;
        storedOperation = event.target.textContent;
      }
      displayValue = "";
    })
  );
}

let displayValue = "";
let storedOperation = "";
let storedValue = "";

gatherInput();
calculate();
