import express from "express";
import { getMessage, sendMessage } from "../controllers/message.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessage);
//the userId will be the id to which we want to send our message to.
router.post("/send/:id", protectRoute, sendMessage);

export default router;
