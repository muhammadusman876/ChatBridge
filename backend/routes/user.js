const express = require("express");
const protectRoute = require("../middleware/protectRoute");
const { getUserForSidebar } = require("../controllers/user");

const router = express.Router()

//it will be route which is server.js so this / doesn't change anything 
router.get("/all", protectRoute, getUserForSidebar)

module.exports = router;