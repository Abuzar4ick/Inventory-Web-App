import { UserWithoutPassword } from "../src/types/userTypes";

declare global {
  namespace Express {
    interface Request {
      cookies?: { [key: string]: string };
      user?: UserWithoutPassword
    }
  }
}

export {};
