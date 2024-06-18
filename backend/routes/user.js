import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUserForSidebar } from "../controllers/user.js";

const router = express.Router();

//it will be route which is server.js so this / doesn't change anything
router.get("/all", protectRoute, getUserForSidebar);

export default router;
