import calculator, { square } from "./calculator.js";
import Fun from "./promise.js";

console.log("Addition : ", calculator.add(5, 5));
console.log("Subtraction : ", calculator.sub(5, 5));
console.log("Multiplication : ", calculator.multi(5, 5));
console.log("Division : ", calculator.div(5, 5));
console.log("Division by zero : ", calculator.div(5, 0));
console.log("Square : ", square(10));


const result = document.getElementById("result");

function showOnPage(message, Error = false) {
  result.textContent = message;
  result.style.color = Error ? "red" : "green";
}

Fun(5)
  .then((result) => {
    console.log(result);
    showOnPage(result);
  })
  .catch((error) => {
    console.log(error);
    showOnPage(error, true);
  });
