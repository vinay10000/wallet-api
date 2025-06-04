import express from "express";
import rateLimiter from "../middleware/rateLimiter.js";
import { getTransactionsByUserId, createTransaction, deleteTransaction, getSummaryByUserId } from "../controllers/transactionsController.js";
const router = express.Router();

router.post("/", rateLimiter, createTransaction)
router.get("/:user_id", rateLimiter, getTransactionsByUserId)
router.delete("/:id", deleteTransaction)
router.get("/summary/:user_id", rateLimiter, getSummaryByUserId)
export default router;
