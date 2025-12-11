const { text } = require("express");
const nodemailer = require("nodemailer");

require("dotenv").config();
async function sendEmail(to, subject, html) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent to: ", to);
  } catch (error) {
    console.log("❌ Email sending failed : ", error);
  }
}

module.exports = sendEmail;
