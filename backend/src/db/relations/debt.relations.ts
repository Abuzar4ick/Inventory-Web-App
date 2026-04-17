import { relations } from "drizzle-orm";
import { debts } from "../schema/debt.schema";
import { users } from "../schema/user.schema";

export const debtsRelations = relations(debts, ({ one }) => ({
  user: one(users, {
    fields: [debts.userId],
    references: [users.id],
  }),
}));
