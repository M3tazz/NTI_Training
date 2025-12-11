const User = require("../models/user.model");

async function logout(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(400).json({ message: "no refresh token " });
    }
    const user = await User.findOne({ refreshToken });
    if (!user) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
      });
      return res.json({ message: "logout successfully!" });
    }
    // clear refresh token from database
    user.refreshToken = null;
    await user.save();
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    res.json({ message: "logout successfully!" });
  } catch (err) {
    res.status(400).json({ error: err });
  }
}
module.exports = logout;
