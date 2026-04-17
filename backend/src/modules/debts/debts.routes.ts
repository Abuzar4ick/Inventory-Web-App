import { Router } from "express";
const router = Router();
import { protectRoute } from "../../middlewares/authMiddleware";

import {
  createDebt,
  getDebts,
  getDebtById,
  updateDebt,
  deleteDebt,
  getStatsOfDebts,
  markAsPaid,
} from "./debts.controller";
// validation schemas
import { validate } from "../../middlewares/validate";
import { createDebtSchema, updateDebtSchema } from "../../db/validation/debt.validation";

router.post("/", protectRoute, validate(createDebtSchema), createDebt);
router.get("/", protectRoute, getDebts);
router.get("/stats", protectRoute, getStatsOfDebts);
router.get("/:id", protectRoute, getDebtById);
router.put("/:id", protectRoute, validate(updateDebtSchema), updateDebt);
router.delete("/:id", protectRoute, deleteDebt);
router.put("/:id/status", protectRoute, markAsPaid);

export default router;
