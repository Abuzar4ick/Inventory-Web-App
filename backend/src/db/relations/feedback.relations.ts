import { relations } from "drizzle-orm";
import { feedbacks } from "../schema/feedback.schema";
import { users } from "../schema/user.schema";

export const feedbacksRelations = relations(feedbacks, ({ one }) => ({
  user: one(users, {
    fields: [feedbacks.userId],
    references: [users.id],
  }),
}));
