const digits = document.querySelectorAll(".digits");
const actions = document.querySelectorAll(".actions");

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
