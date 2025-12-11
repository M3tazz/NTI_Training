const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const registerRouter = require("./routes/post.route");
const dashboardRouter = require("./routes/dashboard.route");
const signupRouter = require("./routes/signup.route");
const loginRouter = require("./routes/login.route");
const logoutRouter = require("./routes/logout.route");
const authRouter = require("./routes/auth.route");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
// app.use("/users", registerRouter);
// app.use("/", dashboardRouter);
// app.use("/", signupRouter);
// app.use("/", loginRouter);
// app.use("/", logoutRouter);
// app.use("/auth", authRouter);
// express-validator
const {
  body,
  query,
  validationResult,
  matchedData,
} = require("express-validator");
app.get("/hello", body("bio").optional({ values: "falsy" }), (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);
    return res.send(`Hello, ${req.body.bio}!`);
  }
  return res.status(400).json({ errors: result.array() });
});
module.exports = app;
