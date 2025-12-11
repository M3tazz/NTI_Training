const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// strength password
const isStrongPassword = require("../utils/passwordValidator");

async function postUser(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "empty" });
    }
    const exist = await User.findOne({ $or: [{ email }, { username }] });
    if (exist) {
      return res
        .status(400)
        .json({ error: "email or password is already exist!" });
    }
    if (!isStrongPassword(password)) {
      return res.status(400).json({ error: "password invalid!" });
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPass,
    });
    const payload = {
      userId: newUser._id,
      username,
    };
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(payload, secret, { expiresIn: "2h" });
    res.status(200).json({ message: "User added!", token });
  } catch (err) {
    res.status(400).json(err);
  }
}
module.exports = postUser;
