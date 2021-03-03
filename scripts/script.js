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
    return "PORTAL TO ANOTHER DIMENSION";
  } else return a / b;
}

function percentage(a) {
  return a / 100;
}

function changeSign(a) {
  return a - a * 2;
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

function calculate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  let result = "";

  switch (operator) {
    case "+":
      result = add(a, b);
      displayHistory(result);
      displayOutput(result);
      storedValue = String(result);
      break;
    case "-":
      result = subtract(a, b);
      displayHistory(result);
      displayOutput(result);
      storedValue = String(result);
      break;
    case "*":
      result = multiply(a, b);
      displayHistory(result);
      displayOutput(result);
      storedValue = String(result);
      break;
    case "/":
      if (a === 0 && b === 0) {
        result = "PORTAL TO ANOTHER DIMENSION";
        displayOutput(result);
        break;
      } else {
        result = divide(a, b);
        displayHistory(result);
        displayOutput(result);
        storedValue = String(result);
        break;
      }

  }
}

//  12 + 7 - 5 * 3 = should yield 42. 

function operate() {
  actions.forEach((action) =>
    action.addEventListener("click", (event) => {

      if (event.target.textContent === "AC") {
        allClear();
      } else if(event.target.textContent === "=" && storedOperation.length > 0 && displayValue.length > 0) {
        calculate(storedOperation, storedValue, displayValue);
      } else if (event.target.textContent === "%") {
        if(displayValue.length === 0) {
          storedValue = Number(storedValue);
          storedValue = String(percentage(storedValue));
          displayOutput(storedValue);
        } else {
          storedValue = Number(displayValue);
          storedValue = String(percentage(storedValue));
          displayOutput(storedValue);
        }
      } else if (event.target.textContent === "+/-") {
        if(displayValue.length === 0) {
          storedValue = Number(storedValue);
          storedValue = String(changeSign(storedValue));
          displayOutput(storedValue);
        } else {
          storedValue = Number(displayValue);
          storedValue = String(changeSign(storedValue));
          displayOutput(storedValue);
        }
      } else if(storedValue.length > 0 && displayValue.length === 0 && event.target.textContent !== "=") {
        storedOperation = event.target.textContent;
      } else if (storedValue.length > 0 && displayValue.length > 0 && storedOperation.length > 0 && event.target.textContent !== "=") {
        calculate(storedOperation, storedValue, displayValue);
        storedOperation = event.target.textContent;
      } else if (storedValue.length === 0 && displayValue.length > 0 && event.target.textContent !== "=") {
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
operate();
