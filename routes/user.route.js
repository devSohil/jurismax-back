const express = require("express");
const { loginUser, registerUser } = require("../controllers/user.controller");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

module.exports = router;
