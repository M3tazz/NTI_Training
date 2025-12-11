"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// <------ Task 11111 ------>
let data = "TypeScript";
console.log(data.length);
// <------ Task 22222 ------>
class Car {
    brand;
    year;
    constructor(brand, year) {
        this.brand = brand;
        this.year = year;
    }
    printInfo() {
        console.log(this.brand, this.year);
    }
}
let myCar = new Car("bmw", 2000);
myCar.printInfo();
class Truck {
    model;
    constructor(model) {
        this.model = model;
    }
    drive() {
        console.log(`Driving ${this.model}`);
    }
}
let myTruck = new Truck("bmw");
myTruck.drive();
// <------ Task 44444 ------>
function printId(x) {
    if (typeof x === "string")
        console.log(`ID is string ${x}`);
    else
        console.log(`ID is number ${x}`);
}
printId(1);
printId("Moataz");
function printRole(user) {
    if ("isAdmin" in user) {
        console.log(`Admin ${user.username} has permissions: ${user.permissions}`);
    }
    else if ("canEdit" in user) {
        if (!user.sections.length) {
            console.log(`Editor ${user.username} has no sections assigned`);
            return;
        }
        console.log(`Editor ${user.username} can edit sections: ${user.sections}`);
    }
    else
        console.log(`Viewer ${user.username}`);
}
// <------ Task 66666 ------>
function wrapInArray(x) {
    return [x];
}
const result = wrapInArray(5);
console.log(result);
//# sourceMappingURL=index.js.map