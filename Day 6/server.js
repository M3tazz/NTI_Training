const express = require("express");
const app = express();

const users = [
  { id: 1, name: "Moataz", age: 20 },
  { id: 2, name: "Ezz", age: 22 },
  { id: 3, name: "7amo", age: 21 },
];
// middlewaresssss
// read body
app.use(express.json());
// form urlencoded
app.use(express.urlencoded({ extended: true }));
//
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
//////////////////////////////////////
// route '/'
app.get("/", (req, res) => {
  res.send("Welcome to the User Info Server");
});
//////////////////////////////////////
// route "/users" GET
app.get("/users", (req, res) => {
  res.status(200).json(users);
});
//////////////////////////////////////
// route '/users/:id' params
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  const result = users.find((x) => {
    return x.id === Number(userId);
  });
  if (!result) {
    return res.status(404).send("User not found");
  }
  res.status(200).json(result);
});
//////////////////////////////////////
// route '/search?name=' query
app.get("/search", (req, res) => {
  const myUser = req.query.name;
  if (!myUser) {
    return res.json(users);
  }
  const result = users.filter((x) => {
    return x.name.toLowerCase().includes(myUser.toLowerCase());
  });
  res.json(result);
});
//////////////////////////////////////
// route '/users' POST
app.post("/users", (req, res) => {
  console.log(req.body);
  //   res.write("form recieved.");

  const NewName = req.body.name;
  const NewAge = req.body.age;
  const NewId = users.length + 1;
  // console.log(id);
  const NewUser = { id: NewId, name: NewName, age: NewAge };
  users.push({ ...NewUser });
  res.status(201).json(NewUser);
});
//////////////////////////////////////
// unknown routes
app.use((req, res) => {
  res.status(404).send("404: Page Not Found");
});

app.listen(5000, () => {
  console.log("you are in port 5000!");
});
