import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";

const router = Router();
router.post("/cadastro", signUp)
router.post("/signIn", signIn)
export default router;