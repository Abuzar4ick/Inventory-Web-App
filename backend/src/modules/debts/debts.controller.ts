import type { Request, Response } from "express";
import { debtsService } from "./debts.service";
import { asyncHandler } from "../../lib/utils";
import { UnauthorizedError } from "../../errors";

// Create a new debt
export const createDebt = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id as string;
  if (!userId) throw new UnauthorizedError("Unauthorized");

  const {
    debtor_name,
    product_name,
    date,
    description,
    quantity,
    money_amount,
  } = req.body;

  const response = await debtsService.create({
    userId,
    debtor_name,
    product_name,
    date,
    description,
    quantity,
    money_amount,
  });

  res.status(201).json(response);
});

// Get all debts for a user
export const getDebts = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id as string;
  if (!userId) throw new UnauthorizedError("Unauthorized");

  const response = await debtsService.getDebts(userId);
  res.status(response.status).json(response);
});

// Get a specific debt by ID
export const getDebtById = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id as string;
  if (!userId) throw new UnauthorizedError("Unauthorized");

  const response = await debtsService.getDebtById(
    req.params.id as string,
    userId,
  );
  res.status(response.status).json(response);
});

// Update a debt
export const updateDebt = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id as string;
  if (!userId) throw new UnauthorizedError("Unauthorized");

  const {
    debtor_name,
    product_name,
    date,
    description,
    quantity,
    money_amount,
  } = req.body;

  const response = await debtsService.updateDebt(
    req.params.id as string,
    {
      debtor_name,
      product_name,
      date,
      description,
      quantity,
      money_amount,
    },
    userId,
  );

  res.status(response.status).json(response);
});

// Delete a debt
export const deleteDebt = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id as string;
  if (!userId) throw new UnauthorizedError("Unauthorized");

  const response = await debtsService.deleteDebt(
    req.params.id as string,
    userId,
  );
  res.status(response.status).json(response);
});

// Get stats of debts for a user
export const getStatsOfDebts = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.id as string;
    if (!userId) throw new UnauthorizedError("Unauthorized");

    const response = await debtsService.getStats(userId);
    res.status(response.status).json(response);
  },
);

// Mark a debt as paid
export const markAsPaid = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id as string;
  if (!userId) throw new UnauthorizedError("Unauthorized");

  const response = await debtsService.markAsPaid(
    req.params.id as string,
    userId,
  );
  res.status(response.status).json(response);
});
