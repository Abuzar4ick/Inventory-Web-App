import { relations } from "drizzle-orm";
import { products } from "../schema/product.schema";
import { users } from "../schema/user.schema";

export const productsRelations = relations(products, ({ one }) => ({
  user: one(users, {
    fields: [products.userId],
    references: [users.id],
  }),
}));