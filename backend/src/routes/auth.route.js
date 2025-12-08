import { Router } from "express";
const router = Router();
import { signup, login, logout, profile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", protectRoute, profile);

export default router;
