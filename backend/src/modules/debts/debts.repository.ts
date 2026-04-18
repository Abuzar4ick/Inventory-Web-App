import { db } from "../../db/index";
import { count, eq, and, sql } from "drizzle-orm";
import { debts } from "../../db/schema";
import { NewDebt } from "../../db/types";

export const debtsRepository = {
  createDebt: async (data: NewDebt) => {
    const [debt] = await db.insert(debts).values(data).returning();
    return debt;
  },

  getDebtByUserId: async (userId: string) => {
    return db.query.debts.findMany({
      where: eq(debts.userId, userId),
      orderBy: (debts, { desc }) => [desc(debts.createdAt)],
    });
  },

  getDebtById: async (id: string) => {
    return db.query.debts.findFirst({
      where: eq(debts.id, id),
    });
  },

  updateDebt: async (id: string, data: Partial<NewDebt>) => {
    const [debt] = await db
      .update(debts)
      .set(data)
      .where(eq(debts.id, id))
      .returning();

    return debt;
  },

  deleteDebt: async (id: string) => {
    const [debt] = await db.delete(debts).where(eq(debts.id, id)).returning();

    return debt;
  },

  // Get stats of debts for a user
  getStatsOfDebts: async (userId: string) => {
    // get all amount of money owed by debts (not paid yet)
    const totalAmountOwed = await db
      .select({ total: sql`sum(${debts.money_amount})` })
      .from(debts)
      .where(and(eq(debts.userId, userId), eq(debts.status, "pending")));

    const totalDebtors = await db
      .select({ count: count() })
      .from(debts)
      .where(and(eq(debts.userId, userId), eq(debts.status, "pending")));

    return {
      totalAmountOwed: totalAmountOwed[0].total,
      totalDebtors: totalDebtors[0].count,
    };
  },

  // Mark a debt as paid
  markAsPaid: async (id: string) => {
    const [debt] = await db
      .update(debts)
      .set({ status: "paid" })
      .where(eq(debts.id, id))
      .returning();

    return debt;
  },
};
