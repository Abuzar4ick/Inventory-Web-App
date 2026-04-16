import { relations } from "drizzle-orm";
import { users } from "../schema/user.schema";
import { products } from "../schema/product.schema";
import { debts } from "../schema/debt.schema";

export const usersRelations = relations(users, ({ many }) => ({
  products: many(products),
  debts: many(debts),
}));