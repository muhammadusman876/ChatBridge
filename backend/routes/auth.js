import express from "express";
const router = express.Router();
import { logout, login, signup } from "../controllers/auth.js";

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

export default router;
