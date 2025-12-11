let studentsList = [
  {
    name: "omar",
    marks: [90, 80, 70],
    address: {
      city: "cairo",
    },
  },
  {
    name: "moataz",
    marks: [70, 100, 70],
    address: {
      city: "giza",
    },
  },
  {
    name: "ali",
    marks: [85, 90, 67],
  },
];

try {
  function Take(student = { name: "", marks: [] }) {
    const { name, marks } = student;

    let total = 0;
    for (let mark of marks) {
      total += mark;
    }
    let average = total / marks.length;
    console.log(`\nStudent Report:
        Name: ${name}
        City: ${student.address?.city || "Not Available"}
        Total Marks: ${total}
        Average Marks: ${average.toFixed(2)}
        `);
  }

  for (let student of studentsList) {
    Take(student);
  }
} catch (err) {
  console.log("error");
} finally {
  console.log("\n------ End of Report ------\n");
}
// add new student
let NewStudent = {
  name: "ahmed",
  marks: [80, 90, 85],
  address: { city: "cairo" },
};

studentsList.push({ ...NewStudent, isGraduated: true });

// print all students
for (let student of studentsList) {
  Take(student);
}

