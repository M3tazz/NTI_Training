const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const postUser = require("../controllers/register.controller");
require("dotenv").config();

router.post("/register", postUser);

module.exports = router;
