import { createInsertSchema } from "drizzle-zod";
import { debts } from "../schema/debt.schema";

export const createDebtSchema = createInsertSchema(debts, {
  debtor_name: (s) => s.min(1, "Qarzdor ismi kiritilishi shart"),
  product_name: (s) => s.min(1, "Mahsulot nomi kiritilishi shart"),
  quantity: (s) => s.min(1, "Miqdor kamida 1 bo‘lishi kerak"),
  money_amount: (s) => s.min(0, "Summa manfiy bo‘lishi mumkin emas"),
  date: (s) => s.min(1, "Sana kiritilishi shart"),
}).pick({
  debtor_name: true,
  product_name: true,
  quantity: true,
  money_amount: true,
  date: true,
  description: true,
  status: true,
});

export const updateDebtSchema = createDebtSchema.partial();

export const updateDebtStatusSchema = updateDebtSchema.pick({
  status: true,
});
