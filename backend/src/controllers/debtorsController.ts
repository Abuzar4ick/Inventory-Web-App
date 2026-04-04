import type { Request, Response } from "express";
import * as queries from "../db/queries";

// Create a new debtor
export const createDebtor = async (req: Request, res: Response) => {
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

    const debtor = await queries.createDebtor({
      debtor_name,
      product_name,
      date,
      description,
      quantity,
      money_amount,
      userId: req.user?.id,
    });
    res.status(201).json(debtor);
  } catch (error) {
    console.error("Error creating debtor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all debtors for a user
export const getDebtors = async (req: Request, res: Response) => {
  try {
    const debtors = await queries.getDebtorsByUserId(req.user?.id);
    res.json(debtors);
  } catch (error) {
    console.error("Error fetching debtors:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a specific debtor by ID
export const getDebtorById = async (req: Request, res: Response) => {
  try {
    const debtor = await queries.getDebtorById(req.params.id as string);
    if (!debtor) {
      return res.status(404).json({ error: "Debtor not found" });
    }

    res.json(debtor);
  } catch (error) {
    console.error("Error fetching debtor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a debtor
export const updateDebtor = async (req: Request, res: Response) => {
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

    const existingDebtor = await queries.getDebtorById(req.params.id as string);

    if (!existingDebtor) {
      return res.status(404).json({ error: "Debtor not found" });
    }

    if (existingDebtor.userId !== req.user.id) {
      return res.status(403).json({ error: "Access denied" });
    }

    const debtor = await queries.updateDebtor(req.params.id as string, {
      debtor_name,
      product_name,
      date,
      description,
      quantity,
      money_amount,
    });

    res.json(debtor);
  } catch (error) {
    console.error("Error updating debtor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a debtor
export const deleteDebtor = async (req: Request, res: Response) => {
  try {
    const existingDebtor = await queries.getDebtorById(req.params.id as string);

    if (!existingDebtor) {
      return res.status(404).json({ error: "Debtor not found" });
    }

    if (existingDebtor.userId !== req.user.id) {
      return res.status(403).json({ error: "Access denied" });
    }

    await queries.deleteDebtor(req.params.id as string);
    res.json({ message: "Debtor deleted successfully" });
  } catch (error) {
    console.error("Error deleting debtor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get stats of debtors for a user
export const getStatsOfDebtors = async (req: Request, res: Response) => {
  try {
    const stats = await queries.getStatsOfDebtors(req.user?.id);
    res.json(stats);
  } catch (error) {
    console.error("Error fetching debtor stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
