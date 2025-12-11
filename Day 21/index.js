var log = function (message, level) {
    if (level === void 0) { level = "info"; }
    console.log("".concat(level, ": ").concat(message));
};
//                      <------------ Task 11111 ------------>
var userId = "";
var isLoggedIn = false;
function printId(userId) {
    if (typeof userId === "string") {
        log("ID is string: ".concat(userId));
    }
    else {
        log("ID is number: ".concat(userId));
    }
    return "";
}
// printId(123);
// printId("Moataz");
//                      <------------ Task 22222 ------------>
var arr;
var httpResponse;
var products;
function printUser(x) {
    return x;
}
var add = function (x, y) { return x + y; };
var multiply = function (x, y) { return x * y; };
function operate(x, y, op) {
    return op(x, y);
}
// console.log(operate(5, 5, multiply));
//                      <------------ Task 55555 ------------>
var users = [
    { id: 1, name: "Moataz", location: { x: 10, y: 20 } },
    { id: 2, name: "Omar", location: { x: 30, y: 40 }, email: "omar@mail.com" },
    { id: 3, name: "Sara", location: { x: 50, y: 60 } },
];
function findUserById(id, arr) {
    return arr.find(function (x) { return x.id === Number(id); });
}
console.log(findUserById(2, users));
