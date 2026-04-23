import { users } from "../schema/user.schema";
import { products } from "../schema/product.schema";
import { debts } from "../schema/debt.schema";
import { feedbacks } from "../schema/feedback.schema";

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export type Debt = typeof debts.$inferSelect;
export type NewDebt = typeof debts.$inferInsert;

export type Feedback = typeof feedbacks.$inferSelect;
export type NewFeedback = typeof feedbacks.$inferInsert;

export type UserWithoutPassword = Omit<User, "password">;