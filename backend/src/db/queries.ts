import { db } from "./index";
import { count, eq, gt, lt, and, or } from "drizzle-orm";
import { users, products, type NewUser, type NewProduct } from "./schema";

// USER QUERIES
export const createUser = async (data: NewUser) => {
  const [user] = await db.insert(users).values(data).returning();
  return user;
};

export const getUserByUsername = async (username: string) => {
  return db.query.users.findFirst({ where: eq(users.username, username) });
};

export const getUserById = async (id: string) => {
  return db.query.users.findFirst({
    where: eq(users.id, id),
    columns: {
      id: true,
      name: true,
      username: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

// PRODUCT QUERIES
export const createProduct = async (data: NewProduct) => {
  const [product] = await db.insert(products).values(data).returning();
  return product;
};

export const getProductsByUserId = async (userId: string) => {
  return db.query.products.findMany({
    where: eq(products.userId, userId),
    orderBy: (products, { desc }) => [desc(products.createdAt)],
  });
};

export const getProductById = async (id: string) => {
  return db.query.products.findFirst({
    where: eq(products.id, id),
  });
};

export const updateProduct = async (id: string, data: Partial<NewProduct>) => {
  const existingProduct = await getProductById(id);
  if (!existingProduct) {
    throw new Error(`Product with id ${id} not found`);
  }

  const [product] = await db
    .update(products)
    .set(data)
    .where(eq(products.id, id))
    .returning();

  return product;
};

export const deleteProduct = async (id: string) => {
  const existingProduct = await getProductById(id);
  if (!existingProduct) {
    throw new Error(`Product with id ${id} not found`);
  }

  const [product] = await db
    .delete(products)
    .where(eq(products.id, id))
    .returning();

  return product;
};

// Get stats of products for a user
export const getStatsOfProducts = async (userId: string) => {
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
        gt(products.createdAt, new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)),
    );

  return {
    totalProducts: totalProducts[0].count,
    lowStockProducts: lowStockProducts[0].count,
    weeklyAddedProducts: weeklyAddedProducts[0].count,
  };
};
