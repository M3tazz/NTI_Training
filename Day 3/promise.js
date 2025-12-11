export default function Fun(x) {
  return new Promise((resolve, reject) => {
    if (x === undefined) {
      reject("Error: no value ");
      return;
    } else if (x < 0) {
      reject("Error: invalid number");
      return;
    }
    setTimeout(() => {
      resolve("Data loaded!");
    }, 2000);
  });
}
