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
// validation schemas
import { validate } from "../../middlewares/validate";
import { createFeedbackSchema } from "../../db/validation/feedback.validation";

router.post("/", protectRoute, validate(createFeedbackSchema), createFeedback);
// TODO: Add admin middleware to protect the following routes
router.get("/", getFeedbacks);
router.get("/:id", getFeedbackById);
router.delete("/:id", deleteFeedback);
router.patch("/:id/reviewed", markFeedbackAsReviewed);

export default router;
