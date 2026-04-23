import { pgEnum } from "drizzle-orm/pg-core";

export const debtStatusEnum = pgEnum("status", ["pending", "paid"]);
export const feedbackTypeEnum = pgEnum("feedback_type", ["bug_report", "feature_request"]);
