const calculator = {
  add(a, b) {
    return a + b;
  },
  sub(a, b) {
    return a - b;
  },
  multi(a, b) {
    return a * b;
  },
  div(a, b) {
    return b ? a / b : "Not available";
  },
};

export function square(a) {
  return a ** 2;
}

export default calculator;
