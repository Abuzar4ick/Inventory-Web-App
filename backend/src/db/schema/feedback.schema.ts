import { pgTable, text, timestamp, uuid, boolean } from "drizzle-orm/pg-core";
import { users } from "./user.schema";
import { feedbackTypeEnum } from "./enums";

export const feedbacks = pgTable("feedbacks", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: feedbackTypeEnum("type").notNull(),
  message: text("message").notNull(),
  isReviewed: boolean("is_reviewed").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
