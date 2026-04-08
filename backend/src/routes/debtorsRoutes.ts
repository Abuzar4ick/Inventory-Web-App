import { Router } from "express";
const router = Router();
import { protectRoute } from "../middlewares/authMiddleware";

import {
  createDebtor,
  getDebtors,
  getDebtorById,
  updateDebtor,
  deleteDebtor,
  getStatsOfDebtors,
  markAsPaid,
} from "../controllers/debtorsController";

router.post("/", protectRoute, createDebtor);
router.get("/", protectRoute, getDebtors);
router.get("/stats", protectRoute, getStatsOfDebtors);
router.get("/:id", protectRoute, getDebtorById);
router.put("/:id", protectRoute, updateDebtor);
router.delete("/:id", protectRoute, deleteDebtor);
router.put("/:id/status", protectRoute, markAsPaid);

export default router;
