
import { authService } from "../services/auth-service.js";

export async function signUp(req, res) {
  const { name, email, senha } = req.body;
  const newUser = await authService.signUp(name, email, senha)
  return res.sendStatus(201)
}

export async function signIn(req, res) {
  const { email, senha } = req.body;
  const newSession = await authService.signIn(email, senha)
  return res.status(200).send(newSession)
}
