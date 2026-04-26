import { db } from "../../db/index";
import { eq } from "drizzle-orm";
import { NewUser } from "../../db/types";
import { users } from "../../db/schema";

export const authRepository = {
  createUser: async (data: NewUser) => {
    const [user] = await db.insert(users).values(data).returning();
    return user;
  },

  getUserByUsername: async (username: string) => {
    return db.query.users.findFirst({ where: eq(users.username, username) });
  },

  getUserById: async (id: string) => {
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
  },

  getPasswordByUserId: async (id: string) => {
    return db.query.users.findFirst({
      where: eq(users.id, id),
      columns: {
        password: true,
      }
    })
  },

  changePassword: async (id: string, newPassword: string) => {
    const [user] = await db
      .update(users)
      .set({ password: newPassword })
      .where(eq(users.id, id))
      .returning();
    return user;
  },
};
