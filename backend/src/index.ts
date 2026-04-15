import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";

import { ENV } from "./config/env";

import userRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productsRoutes";
import debtorsRoutes from "./routes/debtorsRoutes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: ENV.FRONTEND_URL, credentials: true }));

app.use("/api/auth", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/debtors", debtorsRoutes);

if (ENV.NODE_ENV === "production") {
  const __dirname = path.resolve();

  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

export default app;
