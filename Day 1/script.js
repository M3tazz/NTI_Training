// Assignment 1
console.log("\n                             <---Assignment 1--->\n\n");
let Student_name = "Fatima",
  score = 82,
  grade;
if (score >= 90) grade = "A";
else if (score >= 80 && score <= 89) grade = "B";
else if (score >= 70 && score <= 79) grade = "C";
else if (score >= 60 && score <= 69) grade = "D";
else grade = "F";
console.log(` Student name is: ${Student_name}\n Grade is: ${grade}`);

// Assignment 2
console.log("\n                             <---Assignment 2--->\n\n");
let x = 5;
for (let i = 1; i <= 10; i++) {
  console.log(x + " x " + i + " = " + x * i + "\n");
}

// Assignment 3
console.log("\n                             <---Assignment 3--->\n\n");
function checkDrivingAge() {
  let age = 21;
  if (age >= 18) console.log("You can drive.");
  else console.log("You are too young to drive.");
}
checkDrivingAge();
