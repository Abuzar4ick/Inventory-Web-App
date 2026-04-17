import { createInsertSchema } from "drizzle-zod";
import { products } from "../schema/product.schema";

// For creating a product
export const createProductSchema = createInsertSchema(products, {
  name: (s) => s.min(1, "Mahsulot nomi kiritilishi shart"),
  quantity: (s) => s.min(0, "Miqdor manfiy bo‘lishi mumkin emas"),
  min_quantity: (s) => s.min(0, "Minimal miqdor manfiy bo‘lishi mumkin emas"),
}).pick({ name: true, quantity: true, min_quantity: true });

// For updating a product — same fields, all still required
export const updateProductSchema = createProductSchema;
