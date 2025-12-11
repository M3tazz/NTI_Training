const express = require("express");
const app = express();
const helmet = require("helmet");
const errorHandler = require("./middlewares/errorHandler");
const { body, validationResult } = require("express-validator");
app.use(express.json());
app.use(helmet());
// function capitalize(x) {
//   const firstLetter = x.slice(0, 1);
//   const word = x.slice(1);
//   return firstLetter.toUpperCase() + word;
// }
const registerValidator = [
  // username
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required!")
    .isAlphanumeric()
    .withMessage("Username must be alphanumeric")
    .isLength({ min: 3, max: 15 })
    .withMessage("Username's length must be between 3 and 15 char.")
    .customSanitizer((value) => {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }),
  // email
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("invalid email")
    // sanitizer email
    .normalizeEmail(),
  // password
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required!")
    .isLength({ min: 8 })
    .withMessage("Password at least be 8 char.")
    .custom((value) => {
      const regex = /[!@#$%^&*]/;
      if (!regex.test(value)) {
        throw new Error("invalid password");
      }
      return true;
    }),
  // age
  body("age")
    .optional()
    .isNumeric()
    .withMessage("Age must be a number")
    .isInt({ min: 13 })
    .withMessage("Age must be at least 13"),
];
app.post("/register", registerValidator, (req, res, next) => {
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const { username, email, password, age } = req.body;
      return res.json({
        message: "<-------- Success -------->",
        username,
        email,
        password,
        age,
      });
    }
    // console.log(result.array());

    const error = new Error("Validation failed!");
    error.details = result.array();
    error.statusCode = 402;
    throw error;
  } catch (error) {
    next(error);
  }
});
app.use(errorHandler);
module.exports = app;
