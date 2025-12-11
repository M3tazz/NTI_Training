const User = require("../models/user.model");
const cookie = require("cookie-parser");
const isStrongPassword = require("../utils/passwordValidator");
const bcrypt = require("bcrypt");
const { createAccessToken, createRefreshToken } = require("../utils/token");
async function signupController(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "email and password are required!" });
    }
    const isExist = await User.findOne({ email });
    if (isExist) {
      return res
        .status(400)
        .json({ error: "email is existed ,please another email!" });
    }
    if (!isStrongPassword(password)) {
      return res.status(400).json({ error: "password invalid!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const accessToken = createAccessToken(newUser._id);
    const refreshToken = createRefreshToken(newUser._id);
    newUser.refreshToken = refreshToken;
    await newUser.save();
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.json({ message: "User created successfully", accessToken });
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

module.exports = signupController;
