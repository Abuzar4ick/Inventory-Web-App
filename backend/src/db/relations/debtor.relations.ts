import { relations } from "drizzle-orm";
import { debtors } from "../schema/debt.schema";
import { users } from "../schema/user.schema";

export const debtorsRelations = relations(debtors, ({ one }) => ({
  user: one(users, {
    fields: [debtors.userId],
    references: [users.id],
  }),
}));