import { Router, Request, Response } from "express";
const router = Router();
import {
  signupUser,
  loginUser,
  logoutUser,
} from "../controllers/authController";
import { protectRoute } from "../middlewares/authMiddleware";

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Protected route to check if user is authenticated
router.post("/check", protectRoute, (req: Request, res: Response) =>
  res.status(200).json(req.user),
);

export default router;
