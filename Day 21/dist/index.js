"use strict";
const log = (message, level = "info") => {
    console.log(`${level}: ${message}`);
};
//                      <------------ Task 11111 ------------>
let userId = "";
let isLoggedIn = false;
function printId(userId) {
    if (typeof userId === "string") {
        log(`ID is string: ${userId}`);
    }
    else {
        log(`ID is number: ${userId}`);
    }
    return "";
}
// printId(123);
// printId("Moataz");
//                      <------------ Task 22222 ------------>
let arr;
let httpResponse;
let products;
function printUser(x) {
    return x;
}
const add = (x, y) => x + y;
const multiply = (x, y) => x * y;
function operate(x, y, op) {
    return op(x, y);
}
// console.log(operate(5, 5, multiply));
//                      <------------ Task 55555 ------------>
let users = [
    { id: 1, name: "Moataz", location: { x: 10, y: 20 } },
    { id: 2, name: "Omar", location: { x: 30, y: 40 }, email: "omar@mail.com" },
    { id: 3, name: "Sara", location: { x: 50, y: 60 } },
];
function findUserById(id, arr) {
    return arr.find((x) => x.id === Number(id));
}
console.log(findUserById(2, users));
