import { Router } from "express";
import { newTransaction, searchTransaction } from "../controllers/transaction.controller.js";

const router = Router();
router.post("/nova-transacao/:tipo", newTransaction);
router.get("/busca-transacao/:userId", searchTransaction);
export default router;