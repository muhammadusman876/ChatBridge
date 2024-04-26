const express = require("express");
const { sendMessage, getMessage } = require("../controllers/message");
const protectRoute = require("../middleware/protectRoute")

const router = express.Router()

router.get("/:id", protectRoute, getMessage);
//the userId will be the id to which we want to send our message to.
router.post("/send/:id",protectRoute ,sendMessage)

module.exports = router;