import { Router } from "express";
const router = Router();
import { protectRoute } from "../../middlewares/authMiddleware";

import {
  createDebt,
  getDebts,
  getDebtorById,
  updateDebt,
  deleteDebt,
  getStatsOfDebts,
  markAsPaid,
} from "./debts.controller";

router.post("/", protectRoute, createDebt);
router.get("/", protectRoute, getDebts);
router.get("/stats", protectRoute, getStatsOfDebts);
router.get("/:id", protectRoute, getDebtorById);
router.put("/:id", protectRoute, updateDebt);
router.delete("/:id", protectRoute, deleteDebt);
router.put("/:id/status", protectRoute, markAsPaid);

export default router;
