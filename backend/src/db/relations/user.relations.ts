import { relations } from "drizzle-orm";
import { users } from "../schema/user.schema";
import { products } from "../schema/product.schema";
import { debtors } from "../schema/debt.schema";

export const usersRelations = relations(users, ({ many }) => ({
  products: many(products),
  debtors: many(debtors),
}));