import { Router } from "express";
const router = Router();
import { register } from "./admin.controller";
// validation
import { validate } from "../../middlewares/validate";
import { adminAuthSchema } from "../../db/validation/admin.validation";

router.post("/register", validate(adminAuthSchema), register);

export default router;
