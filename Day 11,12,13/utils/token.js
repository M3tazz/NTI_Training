const jwt = require("jsonwebtoken");
function createAccessToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15m" });
}
function createRefreshToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
}
function createResetToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "10m" });
}
module.exports = { createAccessToken, createRefreshToken, createResetToken };
