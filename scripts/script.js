const digits = document.querySelectorAll(".digits");
const actions = document.querySelectorAll(".actions");
const memory = document.querySelector("#memory");
const output = document.querySelector("#output");

let displayValue = "";
let storedOperation = "";
let storedValue = "";


// basic math functions
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
   return a / b;
}

function percentage(a) {
  return a / 100;
}

function changeSign(a) {
  return a - a * 2;
}

// functions responsible for display output
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

// helper functions
function checkForLongDecimals(result) {
  result = String(result);
  if (result.length - result.indexOf(".")-1 > 6) {
    result = roundLongDecimals(result, 4);
    return result;
  } else return result;
}

function roundLongDecimals(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

// keyboard support
function gatherKeyboardInput() {
  window.addEventListener('keydown', (event) => {
    const key = document.querySelector(`div[data-key='${event.keyCode}']`);
    if (key === null) {
      return;
    } else key.click();
  });
}

// function governing input of digits
function gatherMouseInput() {
  digits.forEach((digit) =>
    digit.addEventListener("click", (event) => {
      if (
        event.target.textContent === "." &&
        displayValue.includes(event.target.textContent)
      ) {
        return;
      } else if (memory.textContent.length > 0 && storedValue.length > 0 && storedOperation.length === 0) {
        allClear();
        displayValue += event.target.textContent;
        displayOutput(displayValue);
      } else {
        displayValue += event.target.textContent;
        displayOutput(displayValue);
      }
    })
  );
}

// function responsible for all calculations
function calculate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  let result = "";

  switch (operator) {
    case "+":
      result = add(a, b);
      result = checkForLongDecimals(result); 
      displayHistory(result);
      displayOutput(result);
      storedValue = String(result);
      break;
    case "-":
      result = subtract(a, b);
      result = checkForLongDecimals(result); 
      displayHistory(result);
      displayOutput(result);
      storedValue = String(result);
      break;
    case "*":
      result = multiply(a, b);
      result = checkForLongDecimals(result); 
      displayHistory(result);
      displayOutput(result);
      storedValue = String(result);
      break;
    case "/":
      if (a === 0 && b === 0) {
        result = "PORTAL TO ANOTHER DIMENSION";
        displayOutput(result);
        break;
      } else if (b === 0) {
        result = "YOU ARE KILLING ME";
        displayOutput(result);
        break;
      } else {
        result = divide(a, b);
        result = checkForLongDecimals(result); 
        displayHistory(result);
        displayOutput(result);
        storedValue = String(result);
        break;
      }

  }
}

// function governing main logic of calculator  
function operate() {
  gatherKeyboardInput();
  gatherMouseInput();

  actions.forEach((action) =>
    action.addEventListener("click", (event) => {

      if (event.target.textContent === "AC") {
        allClear();
      } else if(event.target.textContent === "DEL" && displayValue.length > 0) {
        displayValue = displayValue.slice(0,-1);
        displayOutput(displayValue);
        return;
      } else if(event.target.textContent === "DEL") {
        return;
      } else if(event.target.textContent === "=" && storedOperation.length > 0 && displayValue.length > 0) {
        calculate(storedOperation, storedValue, displayValue);
        storedOperation = "";
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

operate();
