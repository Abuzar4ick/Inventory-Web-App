import { db } from "../../db";
import { eq } from "drizzle-orm";
import { feedbacks } from "../../db/schema";
import { NewFeedback } from "../../db/types";

export const feedbacksRepository = {
  // For users to create feedbacks
  create: async (data: NewFeedback) => {
    const [feedback] = await db.insert(feedbacks).values(data).returning();
    return feedback;
  },

  // Only admin can get all feedbacks, so we don't need to filter by userId
  getAll: async () => {
    const bugs_reports = await db.query.feedbacks.findMany({
      where: eq(feedbacks.type, "bug_report"),
      orderBy: (feedbacks, { desc }) => [desc(feedbacks.createdAt)],
    });

    const feature_requests = await db.query.feedbacks.findMany({
      where: eq(feedbacks.type, "feature_request"),
      orderBy: (feedbacks, { desc }) => [desc(feedbacks.createdAt)],
    });

    return { bugs_reports, feature_requests };
  },

  getById: async (id: string) => {
    return db.query.feedbacks.findFirst({
      where: eq(feedbacks.id, id),
    });
  },

  delete: async (id: string) => {
    const [feedback] = await db
      .delete(feedbacks)
      .where(eq(feedbacks.id, id))
      .returning();

    return feedback;
  },

  markAsReviewed: async (id: string) => {
    const [feedback] = await db
      .update(feedbacks)
      .set({ isReviewed: true })
      .where(eq(feedbacks.id, id))
      .returning();

    return feedback;
  },
};
