import { createInsertSchema } from "drizzle-zod";
import { feedbacks } from "../schema/feedback.schema";

export const createFeedbackSchema = createInsertSchema(feedbacks, {
  message: (s) =>
    s
      .min(5, "Feedback xabari kamida 5 ta belgidan iborat bo'lishi kerak")
      .max(1000, "Feedback xabari 1000 ta belgidan oshmasligi kerak"),
}).omit({ userId: true });;
