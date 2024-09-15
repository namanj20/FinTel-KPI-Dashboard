// routes/transaction.js
import express from "express";
import Transaction from "../models/Transaction.js";

const router = express.Router();

router.get("/transactions", async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    
    console.log(`Fetching transactions: page=${page}, limit=${limit}`); // Log query parameters
    
    const transactions = await Transaction.find()
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort({ createdAt: -1 });

    console.log(`Fetched ${transactions.length} transactions`); // Log number of transactions

    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error); // Log error
    res.status(500).json({ message: error.message });
  }
});

export default router;
