import type { Request, Response } from "express";
import { productsService } from "./products.service";

// Create a new product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as string;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { name, quantity, min_quantity } = req.body;
    const response = await productsService.create({
      name,
      quantity,
      min_quantity,
      userId,
    });

    res.status(response.status).json(response);
  } catch (error: any) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get products for the authenticated user
export const getMyProducts = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as string;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const response = await productsService.getAll(userId);
    res.status(response.status).json(response);
  } catch (error: any) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }
    console.error("Error getting products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a product by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const response = await productsService.getById(req.params.id as string);
    res.status(response.status).json(response);
  } catch (error: any) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }
    console.error("Error getting product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as string;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { name, quantity, min_quantity } = req.body;
    const response = await productsService.update(
      req.params.id as string,
      {
        name,
        quantity,
        min_quantity,
      },
      userId,
    );

    res.status(response.status).json(response);
  } catch (error: any) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as string;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const response = await productsService.delete(
      req.params.id as string,
      userId,
    );
    res.status(response.status).json(response);
  } catch (error: any) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get statistics of products (for dashboard page)
export const getStatsOfProducts = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as string;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const response = await productsService.getStats(userId);
    res.status(response.status).json(response);
  } catch (error: any) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }
    console.error("Error getting product stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Search products by name
export const searchProducts = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as string;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const response = await productsService.search(
      userId,
      req.query.q as string,
    );
    res.status(200).json(response);
  } catch (error: any) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }
    console.error("Error searching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
