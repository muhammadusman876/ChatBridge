const express = require("express");
const router = express.Router();
const {logout,login,signup} = require("../controllers/auth")

router.post("/signup", signup)

router.post("/login", login)

router.post("/logout", logout)

module.exports = router;