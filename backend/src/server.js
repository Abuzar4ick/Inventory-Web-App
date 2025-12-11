import express from "express";
import "dotenv/config";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoute from "./routes/auth.route.js";
import productsRoute from "./routes/products.route.js";
import { ENV } from "./lib/env.js";

const __dirname = path.resolve();

const app = express();

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/products", productsRoute);

// Make ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

const PORT = ENV.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
