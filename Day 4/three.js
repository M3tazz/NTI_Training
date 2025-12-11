function division(a, b) {
  if (b == 0) {
    throw new Error("Cannot divide by zero");
  }
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Inputs must be numbers");
  }
  return a / b;
}

try {
  console.log(division(100, 20));
  console.log(division(5, 0));
  // console.log(division(5, "0"));
} catch (err) {
  console.error("Error name :" + err.name);
  console.error("Error message :" + err.message);
}
