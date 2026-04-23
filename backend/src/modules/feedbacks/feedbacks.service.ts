import { feedbacksRepository } from "./feedbacks.repository";
import { NewFeedback } from "../../db/types";
import { NotFoundError } from "../../errors";

export const feedbacksService = {
  async create(newFeedback: NewFeedback) {
    const feedback = await feedbacksRepository.create(newFeedback);
    return { status: 201, data: feedback };
  },

  async getAll() {
    const feedbacks = await feedbacksRepository.getAll();
    return { status: 200, data: feedbacks };
  },

  async getById(id: string) {
    const feedback = await feedbacksRepository.getById(id);
    if (!feedback) throw new NotFoundError("Fikr-mulohaza topilmadi", "FEEDBACK");

    return { status: 200, data: feedback };
  },

  async delete(id: string) {
    const existing = await feedbacksRepository.delete(id);
    if (!existing) throw new NotFoundError("Fikr-mulohaza topilmadi", "FEEDBACK");

    return { status: 200, message: "Fikr-mulohaza muvaffaqiyatli o'chirildi" };
  },

  async markAsReviewed(id: string) {
    const existing = await feedbacksRepository.markAsReviewed(id);
    if (!existing) throw new NotFoundError("Fikr-mulohaza topilmadi", "FEEDBACK");

    return { status: 200, data: existing };
  },
};
