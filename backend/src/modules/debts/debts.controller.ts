import type { Request, Response } from "express";
import { debtsService } from "./debts.service";

// Create a new debt
export const createDebt = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as string;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

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
  } catch (error: any) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }
    console.error("Error creating debt:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all debts for a user
export const getDebts = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as string;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const response = await debtsService.getDebts(userId);
    res.status(response.status).json(response);
  } catch (error: any) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }
    console.error("Error fetching debts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a specific debt by ID
export const getDebtById = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as string;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const response = await debtsService.getDebtById(
      req.params.id as string,
      userId,
    );
    res.status(response.status).json(response);
  } catch (error: any) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }
    console.error("Error fetching debt:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a debt
export const updateDebt = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as string;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

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
  } catch (error: any) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }
    console.error("Error updating debt:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a debt
export const deleteDebt = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as string;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const response = await debtsService.deleteDebt(
      req.params.id as string,
      userId,
    );
    res.status(response.status).json(response);
  } catch (error: any) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }
    console.error("Error deleting debt:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get stats of debts for a user
export const getStatsOfDebts = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as string;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const response = await debtsService.getStats(userId);
    res.status(response.status).json(response);
  } catch (error) {
    console.error("Error fetching debt stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Mark a debt as paid
export const markAsPaid = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as string;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const response = await debtsService.markAsPaid(
      req.params.id as string,
      userId,
    );
    res.status(response.status).json(response);
  } catch (error: any) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }
    console.error("Error marking debt as paid:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
