import { Router } from "express";
const router = Router();
import { protectRoute } from "../middlewares/authMiddleware";

import {
  createDebtor,
  getDebtors,
  getDebtorById,
  updateDebtor,
  deleteDebtor,
} from "../controllers/debtorsController";

router.post("/", protectRoute, createDebtor);
router.get("/", protectRoute, getDebtors);
router.get("/:id", protectRoute, getDebtorById);
router.put("/:id", protectRoute, updateDebtor);
router.delete("/:id", protectRoute, deleteDebtor);

export default router;
