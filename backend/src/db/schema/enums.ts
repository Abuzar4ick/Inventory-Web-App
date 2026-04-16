import { pgEnum } from "drizzle-orm/pg-core";

export const debtorStatusEnum = pgEnum("status", ["pending", "paid"]);