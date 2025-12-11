const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
router.get("/dashboard", authMiddleware);

module.exports = router;
