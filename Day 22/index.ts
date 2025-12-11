// <------ Task 11111 ------>
let data: unknown = "TypeScript";
console.log((data as string).length);
// <------ Task 22222 ------>
class Car {
  constructor(public brand: string, public year: number) {}
  printInfo(): void {
    console.log(this.brand, this.year);
  }
}
let myCar = new Car("bmw", 2000);
myCar.printInfo();
// <------ Task 33333 ------>
interface Drivable {
  drive(): void;
}
class Truck implements Drivable {
  constructor(public model: string) {}
  drive(): void {
    console.log(`Driving ${this.model}`);
  }
}
let myTruck = new Truck("bmw");
myTruck.drive();
// <------ Task 44444 ------>
function printId(x: string | number): void {
  if (typeof x === "string") console.log(`ID is string ${x}`);
  else console.log(`ID is number ${x}`);
}
printId(1);
printId("Moataz");
// <------ Task 55555 ------>
type Admin = { username: string; isAdmin: boolean; permissions: string[] };
type Editor = { username: string; canEdit: boolean; sections: string[] };
type Viewer = { username: string };
function printRole(user: Admin | Editor | Viewer): void {
  if ("isAdmin" in user) {
    console.log(`Admin ${user.username} has permissions: ${user.permissions}`);
  } else if ("canEdit" in user) {
    if (!user.sections.length) {
      console.log(`Editor ${user.username} has no sections assigned`);
      return;
    }
    console.log(`Editor ${user.username} can edit sections: ${user.sections}`);
  } else console.log(`Viewer ${user.username}`);
}
// <------ Task 66666 ------>
function wrapInArray<T>(x: T): T[] {
  return [x];
}
const result = wrapInArray(5);
console.log(result);
