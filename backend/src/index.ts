import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";

import { ENV } from "./config/env";

import { errorHandler } from "./middlewares/errorHandler";
import { NotFoundError } from "./errors";

import userRoutes from "./modules/auth/auth.routes";
import productRoutes from "./modules/products/products.routes";
import debtsRoutes from "./modules/debts/debts.routes";
import feedbacksRoutes from "./modules/feedbacks/feedbacks.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: ENV.FRONTEND_URL, credentials: true }));

app.use("/api/auth", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/debts", debtsRoutes);
app.use("/api/feedbacks", feedbacksRoutes);

// 404 handler
app.use((_req, _res, next) => {
  next(new NotFoundError("Route"));
});

if (ENV.NODE_ENV === "production") {
  const __dirname = path.resolve();

  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

app.use(errorHandler);

app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
});

export default app;
