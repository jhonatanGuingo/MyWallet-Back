import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validate-schema.js";
import { schema, schemaLogin } from "../schemas/schema.js";

const router = Router();
router.post("/cadastro", validateSchema(schema), signUp)
router.post("/signIn", validateSchema(schemaLogin), signIn)
export default router;