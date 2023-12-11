import { Router } from "express";
import { newTransaction, searchTransaction } from "../controllers/transaction.controller.js";
import { validateSchema } from "../middlewares/validate-schema.js";
import { schemaTransaction } from "../schemas/schema.js";
import validateToken from "../middlewares/authorization.js";

const router = Router();
router.post("/nova-transacao/:tipo", validateToken, validateSchema(schemaTransaction), newTransaction);
router.get("/busca-transacao/:userId", validateToken, searchTransaction);
export default router;