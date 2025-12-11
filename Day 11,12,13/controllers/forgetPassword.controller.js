const User = require("../models/user.model");
const sendEmail = require("../utils/sendEmail");
const { createResetToken } = require("../utils/token");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// forget password
async function forgetPassword(req, res) {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "email is required!" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(200)
      .json({ message: "reset link sent (if email exists)" });
  }
  const resetToken = createResetToken(user._id);
  const resetLink = `http://localhost:3000/auth/reset-password/${resetToken}`;
  const subject = "Reset your Password";
  const html = `
    <p>Hello,</p>
    <p>You requested to reset your password.</p>
    <p>Click the link below to reset it (valid for 10 minutes):</p>
    <a href="${resetLink}" target="_blank">${resetLink}</a>
    <p>If you didn’t request this, please ignore this email.</p>
  `;
  await sendEmail(email, subject, html);
  res.json({ message: "✅ Email sent" });
}
// get reset form
async function getResetForm(req, res) {
  const token = req.params.token;
  const html = `
    <html>
        <body>
            <h2>Reset Your Password</h2>
            <form action="http://localhost:3000/auth/reset-password/${token}" method="POST">
            <label>New Password:</label><br/>
            <input type="password" name="newPassword" required /><br/><br/>
            <button type="submit">Reset Password</button>
            </form>
        </body>
    </html>
  `;
  res.send(html);
}
// reset password
async function resetPassword(req, res) {
  const token = req.params.token;
  const { newPassword } = req.body;
  if (!token) {
    return res.status(400).json({ message: "token is missed!" });
  }
  if (!newPassword) {
    return res.status(400).json({ message: "new password is required!" });
  }
  try {
    const isMatch = jwt.verify(token, process.env.JWT_SECRET);
    console.log(isMatch);

    const user = await User.findById(isMatch.userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const hashedPass = await bcrypt.hash(newPassword, 10);
    user.password = hashedPass;
    await user.save();
    res.json({ message: "updated successfully" });
  } catch (error) {
    res.status(403).send("<h3>Invalid or expired token</h3>");
  }
}

module.exports = { forgetPassword, getResetForm, resetPassword };
