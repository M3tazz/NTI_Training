const express = require("express");
const router = express.Router();
const logoutController = require('../controllers/logout.controller')
router.post("/logout", logoutController);
module.exports = router;
