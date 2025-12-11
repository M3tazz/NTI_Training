const express = require("express");
const router = express.Router();
const {
  forgetPassword,
  getResetForm,
  resetPassword
} = require("../controllers/forgetPassword.controller");

router.post("/forget-password", forgetPassword);
router.get("/reset-password/:token", getResetForm);
router.post("/reset-password/:token", resetPassword);
module.exports = router;
