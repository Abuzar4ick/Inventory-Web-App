import type { Request, Response } from "express";
import { debtsRepository } from "./debts.repository";

// Create a new debt
export const createDebt = async (req: Request, res: Response) => {
  try {
    const {
      debtor_name,
      product_name,
      date,
      description,
      quantity,
      money_amount,
    } = req.body;

    if (!debtor_name || !product_name || !date || !quantity || !money_amount) {
      return res
        .status(400)
        .json({ error: "Barcha maydonlar to'ldirilishi kerak" });
    }

    const debt = await debtsRepository.createDebt({
      debtor_name,
      product_name,
      date,
      description,
      quantity,
      money_amount,
      userId: req.user?.id,
    });
    res.status(201).json(debt);
  } catch (error) {
    console.error("Error creating debt:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all debts for a user
export const getDebts = async (req: Request, res: Response) => {
  try {
    const debts = await debtsRepository.getDebtByUserId(req.user?.id);
    res.json(debts);
  } catch (error) {
    console.error("Error fetching debts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a specific debtor by ID
export const getDebtorById = async (req: Request, res: Response) => {
  try {
    const debtor = await debtsRepository.getDebtById(req.params.id as string);
    if (!debtor) {
      return res.status(404).json({ error: "Debtor not found" });
    }

    res.json(debtor);
  } catch (error) {
    console.error("Error fetching debtor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a debt
export const updateDebt = async (req: Request, res: Response) => {
  try {
    const {
      debtor_name,
      product_name,
      date,
      description,
      quantity,
      money_amount,
    } = req.body;

    if (!debtor_name || !product_name || !date || !quantity || !money_amount) {
      return res
        .status(400)
        .json({ error: "Barcha maydonlar to'ldirilishi kerak" });
    }

    const existingDebt = await debtsRepository.getDebtById(req.params.id as string);

    if (!existingDebt) {
      return res.status(404).json({ error: "Debt not found" });
    }

    if (existingDebt.userId !== req.user.id) {
      return res.status(403).json({ error: "Access denied" });
    }

    const debt = await debtsRepository.updateDebt(req.params.id as string, {
      debtor_name,
      product_name,
      date,
      description,
      quantity,
      money_amount,
    });

    res.json(debt);
  } catch (error) {
    console.error("Error updating debt:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a debt
export const deleteDebt = async (req: Request, res: Response) => {
  try {
    const existingDebt = await debtsRepository.getDebtById(req.params.id as string);

    if (!existingDebt) {
      return res.status(404).json({ error: "Debt not found" });
    }

    if (existingDebt.userId !== req.user.id) {
      return res.status(403).json({ error: "Access denied" });
    }

    await debtsRepository.deleteDebt(req.params.id as string);
    res.json({ message: "Debt deleted successfully" });
  } catch (error) {
    console.error("Error deleting debt:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get stats of debts for a user
export const getStatsOfDebts = async (req: Request, res: Response) => {
  try {
    const stats = await debtsRepository.getStatsOfDebts(req.user?.id);
    res.json(stats);
  } catch (error) {
    console.error("Error fetching debt stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Mark a debt as paid
export const markAsPaid = async (req: Request, res: Response) => {
  try {
    const existingDebt = await debtsRepository.getDebtById(req.params.id as string);
    if (!existingDebt) {
      return res.status(404).json({ error: "Debt not found" });
    }

    if (existingDebt.userId !== req.user.id) {
      return res.status(403).json({ error: "Access denied" });
    }

    const debt = await debtsRepository.markAsPaid(req.params.id as string);
    res.json(debt);
  } catch (error) {
    console.error("Error marking debt as paid:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
