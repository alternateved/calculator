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
}

function displayOutput(string) {
  output.textContent = string;
}

function displayHistory(string) {
  memory.textContent = string;
}

function gatherInput() {
  digits.forEach((digit) =>
    digit.addEventListener("click", (event) => {
      if(event.target.textContent === "." && displayValue.includes(event.target.textContent)) {
        return;
      } else {
        displayValue += event.target.textContent;
        displayOutput(displayValue);
      }
    })
  );
}

let displayValue = "";
let storedOperation = "";
let lastAction = "";
let storedValue = "";
let result = "";

gatherInput();

actions.forEach((action) =>
  action.addEventListener("click", (event) => {
    displayOutput("");
    if (
      event.target.textContent === "=" &&
      storedOperation.length > 0 &&
      storedOperation !== "="
    ) {
      result = operate(storedOperation, storedValue, displayValue);
      lastAction =
        storedValue +
        storedOperation +
        displayValue +
        event.target.textContent +
        result;
      storedValue = result;
      displayHistory(lastAction);
      displayOutput(result);
    } else if (storedValue.length === 0) {
      storedValue = displayValue;
      storedOperation = event.target.textContent;
    } else if (event.target.textContent === "ac") {
      allClear();
    }
    displayValue = "";
  })
);
