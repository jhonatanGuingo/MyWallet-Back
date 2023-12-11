import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { authRepositorie } from "../repositories/auth-repositorie";

async function signUp(name, email, senha) {
  const hash = bcrypt.hashSync(senha, 10);
  const emailExist = await authRepositorie.emailExist(email);
  if (emailExist) return res.status(409).send("E-mail já cadastrado");
  const newUser = await authRepositorie.signUp(name, email, hash);
  return newUser;
}

async function signIn(email, senha) {
  const emailExist = await authRepositorie.emailExist(email);
  if (!emailExist) return res.sendStatus(404);
  if (emailExist && bcrypt.compareSync(senha, emailExist.senha)) {
    const token = uuid();
    const newSession = authRepositorie.newSession(
      emailExist._id,
      emailExist.name,
      token
    );
    return newSession;
  }
  return res.sendStatus(401);
}

export const authService = {
    signUp,
    signIn
}