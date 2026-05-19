import { Router } from "express";
const router = Router();
import { register } from "./admin.controller";
// validation
import { validate } from "../../middlewares/validate";
import { adminAuthSchema } from "../../db/validation/admin.validation";
// limiter
import authLimiter from "../../middlewares/rateLimit";

router.post("/register", authLimiter, validate(adminAuthSchema), register);

export default router;
