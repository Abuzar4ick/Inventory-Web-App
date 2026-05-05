import { Router, Request, Response } from "express";
const router = Router();
import {
  signupUser,
  loginUser,
  logoutUser,
  getProfile,
  changePassword,
  updateProfile,
} from "./auth.controller";
import { protectRoute } from "../../middlewares/authMiddleware";
// validation schemas
import { validate } from "../../middlewares/validate";
import {
  signupSchema,
  loginSchema,
  changePasswordSchema,
  updateProfileSchema,
} from "../../db/validation/user.validation";

router.post("/signup", validate(signupSchema), signupUser);
router.post("/login", validate(loginSchema), loginUser);
router.post("/logout", logoutUser);
router.get("/profile", protectRoute, getProfile);
router.put("/profile", protectRoute, validate(updateProfileSchema), updateProfile);
router.post("/change-password", protectRoute, validate(changePasswordSchema), changePassword);

// Protected route to check if user is authenticated
router.get("/check", protectRoute, (req: Request, res: Response) =>
  res.status(200).json(req.user),
);

export default router;
