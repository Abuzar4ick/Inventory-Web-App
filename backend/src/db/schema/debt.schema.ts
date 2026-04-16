import { pgTable, text, timestamp, uuid, integer } from "drizzle-orm/pg-core";
import { users } from "./user.schema";
import { debtorStatusEnum } from "./enums";

export const debts = pgTable("debts", {
  id: uuid("id").primaryKey().defaultRandom(),
  debtor_name: text("debtor_name").notNull(),
  product_name: text("product_name").notNull(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  date: text("date").notNull(),
  description: text("description"),
  quantity: integer("quantity").notNull().default(1),
  money_amount: integer("money_amount").notNull().default(0),

  status: debtorStatusEnum("status").notNull().default("pending"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});