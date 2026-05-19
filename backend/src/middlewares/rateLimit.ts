import rateLimit from "express-rate-limit";
import { LimitExceededError } from "../errors";

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  handler: () => {
    throw new LimitExceededError("Soʻrovlar juda koʻp, keyinroq qayta urinib koʻring.");
  }
});

export default authLimiter;
