import type { Request, Response } from "express";
import { productsService } from "./products.service";
import { asyncHandler } from "../../lib/utils";
import { UnauthorizedError } from "../../errors";

// Create a new product
export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.id as string;
    if (!userId) throw new UnauthorizedError("Unauthorized");

    const { name, quantity, min_quantity } = req.body;
    const response = await productsService.create({
      name,
      quantity,
      min_quantity,
      userId,
    });

    res.status(response.status).json(response);
  },
);

// Get products for the authenticated user
export const getMyProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.id as string;
    if (!userId) throw new UnauthorizedError("Unauthorized");

    const response = await productsService.getAll(userId);
    res.status(response.status).json(response);
  },
);

// Get a product by ID
export const getProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const response = await productsService.getById(req.params.id as string);
    res.status(response.status).json(response);
  },
);

// Update a product
export const updateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.id as string;
    if (!userId) throw new UnauthorizedError("Unauthorized");

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
  },
);

// Delete a product
export const deleteProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.id as string;
    if (!userId) throw new UnauthorizedError("Unauthorized");

    const response = await productsService.delete(
      req.params.id as string,
      userId,
    );
    res.status(response.status).json(response);
  },
);

// Get statistics of products (for dashboard page)
export const getStatsOfProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.id as string;
    if (!userId) throw new UnauthorizedError("Unauthorized");

    const response = await productsService.getStats(userId);
    res.status(response.status).json(response);
  },
);

// Search products by name
export const searchProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.id as string;
    if (!userId) throw new UnauthorizedError("Unauthorized");

    const response = await productsService.search(
      userId,
      req.query.q as string,
    );
    res.status(200).json(response);
  },
);
