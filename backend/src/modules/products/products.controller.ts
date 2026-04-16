import type { Request, Response } from "express";
import { productsRepository } from "./products.repository";

// Create a new product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, quantity, min_quantity } = req.body;
    if (!name || quantity == null || min_quantity == null) {
      return res
        .status(400)
        .json({ error: "Barcha maydonlar to'ldirilishi kerak" });
    }

    const newProduct = await productsRepository.createProduct({
      name,
      quantity,
      min_quantity,
      userId: req.user?.id as string,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get products for the authenticated user
export const getMyProducts = async (req: Request, res: Response) => {
  try {
    const products = await productsRepository.getProductsByUserId(req.user?.id as string);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a product by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await productsRepository.getProductById(req.params.id as string);
    if (!product) return res.status(404).json({ error: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    console.error("Error getting product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { name, quantity, min_quantity } = req.body;
    if (!name || quantity == null || min_quantity == null) {
      return res
        .status(400)
        .json({ error: "Barcha maydonlar to'ldirilishi kerak" });
    }

    const existingProduct = await productsRepository.getProductById(
      req.params.id as string,
    );
    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (existingProduct.userId !== req.user?.id) {
      return res.status(403).json({ error: "Access denied" });
    }

    const updatedProduct = await productsRepository.updateProduct(
      req.params.id as string,
      {
        name,
        quantity,
        min_quantity,
      },
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const existingProduct = await productsRepository.getProductById(
      req.params.id as string,
    );
    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (existingProduct.userId !== req.user?.id) {
      return res.status(403).json({ error: "Access denied" });
    }

    await productsRepository.deleteProduct(req.params.id as string);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get statistics of products (for dashboard page)
export const getStatsOfProducts = async (req: Request, res: Response) => {
  try {
    const stats = await productsRepository.getStatsOfProducts(req.user?.id as string);
    res.status(200).json(stats);
  } catch (error) {
    console.error("Error getting product stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Search products by name
export const searchProducts = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;

    if (!q) return res.status(400).json({ error: "Search query is required" });

    const products = await productsRepository.searchProductsByName(
      req.user?.id as string,
      q as string,
    );
    res.status(200).json(products);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
