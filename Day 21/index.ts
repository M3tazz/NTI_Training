type logger = {
  (message: string, level?: "info" | "error"): void;
};
const log: logger = (message, level = "info") => {
  console.log(`${level}: ${message}`);
};
//                      <------------ Task 11111 ------------>

let userId: number | string = "";
let isLoggedIn: boolean = false;
function printId(userId: number | string): string {
  if (typeof userId === "string") {
    log(`ID is string: ${userId}`);
  } else {
    log(`ID is number: ${userId}`);
  }
  return "";
}
// printId(123);
// printId("Moataz");

//                      <------------ Task 22222 ------------>

let arr: string[];
let httpResponse: [number, string, boolean];
type product = {
  id: number;
  name: string;
  price: number;
  tags: string[];
};
let products: product[];

//                      <------------ Task 33333 ------------>

type Coordinates = {
  x: number;
  y: number;
};
interface User {
  id: number;
  name: string;
  location: Coordinates;
  email?: string;
}
function printUser(x: User): User {
  return x;
}

//                      <------------ Task 44444 ------------>

type MathOp = (x: number, y: number) => number;
const add: MathOp = (x, y) => x + y;
const multiply: MathOp = (x, y) => x * y;
function operate(x: number, y: number, op: MathOp) {
  return op(x, y);
}
// console.log(operate(5, 5, multiply));

//                      <------------ Task 55555 ------------>

let users: User[] = [
  { id: 1, name: "Moataz", location: { x: 10, y: 20 } },
  { id: 2, name: "Omar", location: { x: 30, y: 40 }, email: "omar@mail.com" },
  { id: 3, name: "Sara", location: { x: 50, y: 60 } },
];
function findUserById(id: number | string, arr: User[]): User | undefined {
  return arr.find((x) => x.id === Number(id));
}
console.log(findUserById(2,users));
