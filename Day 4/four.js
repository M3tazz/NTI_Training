class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  sayHello() {
    return `Hello i am ${this.name} , ${this.age} years old.`;
  }
  isAdult() {
    return this.age >= 18;
  }
  celebrateBirthday() {
    this.age++;
    return `${this.name}'s age now is ${this.age}`;
  }
}

let x = new Person("Omar", 25);
let y = new Person("Layla", 16);

console.log(x.sayHello());
console.log(x.isAdult() ? "Adult" : "Not Adult");
console.log(x.celebrateBirthday());
console.log("/////////////////////////");
console.log(y.sayHello());
console.log(y.isAdult() ? "Adult" : "Not Adult");
console.log(y.celebrateBirthday());
