import type { Request, Response } from "express";
import { feedbacksService } from "./feedbacks.service";
import { asyncHandler } from "../../lib/utils";
import { UnauthorizedError } from "../../errors";

// Create new feedback
export const createFeedback = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) throw new UnauthorizedError("Unauthorized");

    const { type, message } = req.body;

    const response = await feedbacksService.create({
      userId,
      type,
      message,
    });

    return res.status(201).json(response);
  },
);

// Get all feedbacks (admin only)
export const getFeedbacks = asyncHandler(async (_: Request, res: Response) => {
  const response = await feedbacksService.getAll();
  return res.status(response.status).json(response);
});

// Get feedback by ID (admin only)
export const getFeedbackById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await feedbacksService.getById(id as string);

    return res.status(response.status).json(response);
  },
);

// Delete feedback by ID (admin only)
export const deleteFeedback = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await feedbacksService.delete(id as string);

    return res.status(response.status).json(response);
  },
);

// Mark feedback as reviewed (admin only)
export const markFeedbackAsReviewed = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await feedbacksService.markAsReviewed(id as string);

    return res.status(response.status).json(response);
  },
);
