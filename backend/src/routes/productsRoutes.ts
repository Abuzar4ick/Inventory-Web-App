import { Router } from "express";
const router = Router();
import { protectRoute } from "../middlewares/authMiddleware";
import { createProduct, getMyProducts, getProductById, updateProduct, deleteProduct } from "../controllers/productsController";

router.post("/", protectRoute, createProduct);
router.get("/my", protectRoute, getMyProducts);
router.get("/:id", protectRoute, getProductById);
router.put("/:id", protectRoute, updateProduct);
router.delete("/:id", protectRoute, deleteProduct);

export default router;
