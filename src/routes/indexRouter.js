import { Router } from "express";
import transactionRouter from "./transactionRouter.js"
import authRouter from "./authRouter.js"

const router = Router();
router.use(transactionRouter);
router.use(authRouter);

export default router;