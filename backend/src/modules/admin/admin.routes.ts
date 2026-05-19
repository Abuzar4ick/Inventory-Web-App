import { Router } from "express";
const router = Router();
import { register } from "./admin.controller";

router.post("/register", register);

export default router;
