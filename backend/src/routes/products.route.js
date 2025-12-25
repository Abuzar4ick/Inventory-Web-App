import { Router } from "express";
const router = Router();
import {
  createNewProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  getAllLowStockProducts,
} from "../controllers/products.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

router.use(protectRoute);

router.get("/low-stock", getAllLowStockProducts);
router.post("/", createNewProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProductById);
router.delete("/:id", deleteProductById);

export default router;
