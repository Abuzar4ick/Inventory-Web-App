import { pgTable, text, timestamp, uuid, integer, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Enum for debtor status
export const debtorStatusEnum = pgEnum("status", ["pending", "paid"]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(), // clerkId
  name: text("name").notNull(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  quantity: integer("quantity").notNull().default(0),
  min_quantity: integer("min_quantity").notNull().default(0),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const debtors = pgTable("debtors", {
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

export const usersRelations = relations(users, ({ many }) => ({
  products: many(products),
  debtors: many(debtors),
}));

export const productsRelations = relations(products, ({ one }) => ({
  user: one(users, { fields: [products.userId], references: [users.id] }), // one product → one user
}));

export const debtorsRelations = relations(debtors, ({ one }) => ({
  user: one(users, { fields: [debtors.userId], references: [users.id] }), // one debtor → one user
}));

// Type inference for relations
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type UserWithoutPassword = Omit<User, "password">;

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export type Debtor = typeof debtors.$inferSelect;
export type NewDebtor = typeof debtors.$inferInsert;
