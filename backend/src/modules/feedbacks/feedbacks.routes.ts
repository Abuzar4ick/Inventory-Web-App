import { Router } from "express";
const router = Router();
import { protectRoute } from "../../middlewares/authMiddleware";

import {
  createFeedback,
  getFeedbacks,
  getFeedbackById,
  deleteFeedback,
  markFeedbackAsReviewed,
} from "./feedbacks.controller";

router.post("/", protectRoute, createFeedback);
// TODO: Add admin middleware to protect the following routes
// TODO: Add zod validation for request bodies and params
router.get("/", getFeedbacks);
router.get("/:id", getFeedbackById);
router.delete("/:id", deleteFeedback);
router.patch("/:id/reviewed", markFeedbackAsReviewed);

export default router;
