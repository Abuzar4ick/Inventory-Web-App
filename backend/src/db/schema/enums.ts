import { pgEnum } from "drizzle-orm/pg-core";

export const debtStatusEnum = pgEnum("status", ["pending", "paid"]);