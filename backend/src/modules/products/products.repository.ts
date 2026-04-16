import { and, count, eq, gt, lt, sql } from "drizzle-orm";
import { db } from "../../db";
import { products } from "../../db/schema";
import { NewProduct } from "../../db/types";

export const productsRepository = {
  createProduct: async (data: NewProduct) => {
    const [product] = await db.insert(products).values(data).returning();
    return product;
  },
  
  getProductsByUserId: async (userId: string) => {
    return db.query.products.findMany({
      where: eq(products.userId, userId),
      orderBy: (products, { desc }) => [desc(products.createdAt)],
    });
  },

  getProductById: async (id: string) => {
    return db.query.products.findFirst({
      where: eq(products.id, id),
    });
  },

  updateProduct: async (id: string, data: Partial<NewProduct>) => {
    const existingProduct = await productsRepository.getProductById(id);
    if (!existingProduct) {
      throw new Error(`Product with id ${id} not found`);
    }

    const [product] = await db
      .update(products)
      .set(data)
      .where(eq(products.id, id))
      .returning();

    return product;
  },

  deleteProduct: async (id: string) => {
    const existingProduct = await productsRepository.getProductById(id);
    if (!existingProduct) {
      throw new Error(`Product with id ${id} not found`);
    }

    const [product] = await db
      .delete(products)
      .where(eq(products.id, id))
      .returning();

    return product;
  },

  // Get stats of products for a user
  getStatsOfProducts: async (userId: string) => {
    const totalProducts = await db
      .select({ count: count() })
      .from(products)
      .where(eq(products.userId, userId));

    const lowStockProducts = await db
      .select({ count: count() })
      .from(products)
      .where(
        (eq(products.userId, userId) &&
          lt(products.quantity, products.min_quantity)) ||
          eq(products.quantity, products.min_quantity),
      );

    const weeklyAddedProducts = await db
      .select({ count: count() })
      .from(products)
      .where(
        eq(products.userId, userId) &&
          gt(
            products.createdAt,
            new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          ),
      );

    return {
      totalProducts: totalProducts[0].count,
      lowStockProducts: lowStockProducts[0].count,
      weeklyAddedProducts: weeklyAddedProducts[0].count,
    };
  },

  // Search products by name for a user
  searchProductsByName: async (userId: string, name: string) => {
    return db.query.products.findMany({
      where: and(
        eq(products.userId, userId),
        sql`replace(lower(${products.name}), ' ', '') like ${`%${name.toLowerCase().replace(/\s/g, "")}%`}`,
      ),
      orderBy: (products, { desc }) => [desc(products.createdAt)],
    });
  },
};
