const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const User = require("../models/user.model");
const { createAccessToken, createRefreshToken } = require("../utils/token");
async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "email and password are required!" });
    }
    const myUser = await User.findOne({ email });
    if (!myUser) {
      return res.status(400).json({ error: "email not found!" });
    }
    const isMatch = await bcrypt.compare(password, myUser.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Email or Password is wrong!" });
    }
    const accessToken = createAccessToken(myUser._id);
    const refreshToken = createRefreshToken(myUser._id);
    myUser.refreshToken = refreshToken;
    await myUser.save();
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.json({ message: "Login successfully", accessToken });
  } catch (err) {
    res.status(400).json({ error: err });
  }
}
module.exports = login;
