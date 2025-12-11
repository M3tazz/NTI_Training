const express = require("express");
const rateLimit = require("express-rate-limit");
const { body, validationResult } = require("express-validator");
const helmet = require("helmet");
const errorHandler = require("./middlewares/errorHandler");
const connectDB = require("./config/db");
const User = require("./models/user.model");
const bcrypt = require("bcrypt");
const app = express();
// connect database
connectDB();
require("dotenv").config();
app.use(express.json());
app.use(helmet());
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // 5 requests
  // error message
  message: {
    success: false,
    statusCode: 400,
    error: "Please try again after 1 minute.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
const registerValidation = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("age")
    .notEmpty()
    .withMessage("Age is required")
    .isInt({ min: 13 })
    .withMessage("Age must be at least 13"),
];
app.use(limiter);
app.post("/register", registerValidation, async (req, res, next) => {
  try {
    const { username, email, password, age } = req.body;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const error = new Error("Validation falied!");
      error.statusCode = 400;
      error.details = result.array().map((x) => ({
        fieldName: x.path,
        error: x.msg,
      }));
      throw error;
    }
    const hashedPass = await bcrypt.hash(password, 10);
    await User.create({
      username,
      email,
      password: hashedPass,
      age,
    });
    return res
      .status(200)
      .json({ success: true, username, email, password: hashedPass, age });
  } catch (error) {
    next(error);
  }
});
app.use(errorHandler);
app.listen(process.env.PORT, () => console.log(`Hello ${process.env.PORT}`));
